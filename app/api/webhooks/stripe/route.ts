import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import {
  checkDomain,
  createCustomer,
  createEmailAccount,
  ensureEmailDomain,
  findDomainByName,
  registerDomain,
} from "@/lib/openprovider";

import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type DomainOrderStatus =
  | "active"
  | "failed"
  | "pending"
  | "processing"
  | "unavailable";

type SavedOrder = {
  status: DomainOrderStatus;
  user_id?: string | null;
};

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY manquante.");
  }

  return new Stripe(secretKey);
}

export async function POST(request: NextRequest) {
  const body = await request.text();

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      {
        error: "Signature Stripe manquante.",
      },
      { status: 400 },
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET manquante.");

    return NextResponse.json(
      {
        error: "Configuration Stripe manquante.",
      },
      { status: 500 },
    );
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      webhookSecret,
    );
  } catch (error) {
    console.error(
      "STRIPE WEBHOOK SIGNATURE ERROR:",
      error,
    );

    return NextResponse.json(
      {
        error: "Signature Stripe invalide.",
      },
      { status: 400 },
    );
  }

  /*
   * ==========================================================
   * EVENEMENT
   * ==========================================================
   */

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({
      received: true,
    });
  }

  try {
    const session = event.data.object as Stripe.Checkout.Session;
    const type = session.metadata?.type;

    if (type === "professional_email") {
      await processEmailOrder(session);
    } else {
      await processDomainOrder(session);
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    const message = getErrorMessage(error);

    console.error(
      "PROVISIONING ERROR:",
      {
        eventId: event.id,
        message,
      },
    );

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 },
    );
  }
}

/*
 * ============================================================
 * TRAITEMENT DE LA COMMANDE
 * ============================================================
 */

async function processDomainOrder(
  session: Stripe.Checkout.Session,
) {
  if (session.payment_status !== "paid") {
    throw new Error(
      "Le paiement Stripe n'est pas confirmé.",
    );
  }

  if (
    session.metadata?.product !==
    "domain_registration"
  ) {
    return;
  }

  /*
   * ==========================================================
   * DONNEES STRIPE
   * ==========================================================
   */

  const domain = session.metadata.domain
    ?.trim()
    .toLowerCase();

  const metadataUserId =
    session.metadata.user_id?.trim();

  const email = session.customer_details?.email
    ?.trim()
    .toLowerCase();

  const name = session.customer_details?.name
    ?.trim();

  const phone = session.customer_details?.phone
    ?.trim();

  const address =
    session.customer_details?.address;

  if (!domain) {
    throw new Error(
      "Domaine absent des metadata Stripe.",
    );
  }

  if (!email) {
    throw new Error(
      "E-mail client absent de la session Stripe.",
    );
  }

  /*
   * ==========================================================
   * PROPRIETAIRE NOVA
   * ==========================================================
   *
   * Nouvelle commande :
   * Stripe contient directement user_id.
   *
   * Ancienne commande :
   * Stripe ne contient pas user_id.
   * On retrouve alors le compte Supabase
   * correspondant exactement à l'e-mail Stripe.
   */

  const userId = metadataUserId
    ? metadataUserId
    : await findUserIdByEmail(email);

  if (!userId) {
    throw new Error(
      `Aucun compte NOVA correspondant à l'e-mail ${email}.`,
    );
  }

  /*
   * ==========================================================
   * INFORMATIONS CLIENT
   * ==========================================================
   */

  if (
    !name ||
    !phone ||
    !address
  ) {
    throw new Error(
      "Informations client Stripe insuffisantes pour enregistrer le domaine.",
    );
  }

  /*
   * ==========================================================
   * VERIFICATION COMMANDE EXISTANTE
   * ==========================================================
   */

  const existingOrder =
    await getOrder(session.id);

  if (
    [
      "active",
      "pending",
      "unavailable",
    ].includes(
      existingOrder?.status || "",
    )
  ) {
    console.log(
      "DOMAIN ORDER ALREADY FINALIZED:",
      session.id,
    );

    /*
     * Si l'ancienne commande existe déjà mais
     * n'avait pas encore de user_id, on la rattache
     * maintenant au compte retrouvé.
     */

    await attachUserToOrder(
      session.id,
      userId,
    );

    return;
  }

  /*
   * ==========================================================
   * ENREGISTREMENT INITIAL
   * ==========================================================
   */

  await saveOrder({
    domain,
    email,
    userId,
    status: "processing",
    stripeSessionId: session.id,
  });

  try {
    /*
     * ========================================================
     * VERIFICATION PORTFOLIO OPENPROVIDER
     * ========================================================
     */

    const ownedDomain =
      await findDomainByName(domain);

    if (ownedDomain) {
      await saveRegisteredOrder({
        domain,
        email,
        userId,
        registration: ownedDomain,
        stripeSessionId: session.id,
      });

      return;
    }

    /*
     * ========================================================
     * DISPONIBILITE
     * ========================================================
     */

    const availability =
      await checkDomain(domain);

    if (!availability.available) {
      throw new Error(
        `Le domaine ${domain} n'est plus disponible.`,
      );
    }

    /*
     * ========================================================
     * CONTACT OPENPROVIDER
     * ========================================================
     */

    const handle =
      await createCustomer(
        makeContact({
          address,
          email,
          name,
          phone,
        }),
      );

    /*
     * ========================================================
     * ENREGISTREMENT DOMAINE
     * ========================================================
     */

    const registration =
      await registerDomain(
        domain,
        handle,
        1,
      );

    console.log(
      "DOMAIN REGISTERED:",
      {
        domain,
        handle,
        registrationId:
          extractOpenproviderId(
            registration,
          ),
        stripeSessionId:
          session.id,
        userId,
      },
    );

    /*
     * ========================================================
     * SAUVEGARDE FINALE
     * ========================================================
     */

    await saveRegisteredOrder({
      domain,
      email,
      userId,
      registration,
      stripeSessionId: session.id,
    });
  } catch (error) {
    /*
     * IMPORTANT :
     * on conserve l'erreur afin que Stripe
     * puisse relancer le webhook.
     */

    await saveOrder({
      domain,
      email,
      userId,
      status: "failed",
      stripeSessionId: session.id,
    });

  throw error;
}
}

/*
 * ============================================================
 * RECHERCHE COMPTE SUPABASE PAR E-MAIL
 * ============================================================
 */

async function findUserIdByEmail(
  email: string,
): Promise<string | null> {
  const normalizedEmail =
    email.trim().toLowerCase();

  let page = 1;

  const perPage = 100;

  while (true) {
    const {
      data,
      error,
    } =
      await supabaseAdmin.auth.admin.listUsers({
        page,
        perPage,
      });

    if (error) {
      throw new Error(
        `Erreur Supabase lors de la recherche du compte : ${error.message}`,
      );
    }

    const users = data?.users || [];

    const matchingUser =
      users.find(
        (user) =>
          user.email
            ?.trim()
            .toLowerCase() ===
          normalizedEmail,
      );

    if (matchingUser) {
      return matchingUser.id;
    }

    if (
      users.length < perPage
    ) {
      break;
    }

    page += 1;
  }

  return null;
}

/*
 * ============================================================
 * CONTACT OPENPROVIDER
 * ============================================================
 */

function makeContact({
  address,
  email,
  name,
  phone,
}: {
  address: Stripe.Address;
  email: string;
  name: string;
  phone: string;
}) {
  const parts = name.split(/\s+/);

  const firstName =
    parts.shift() || "Client";

  const lastName =
    parts.join(" ") || firstName;

  const line1 =
    address.line1?.trim();

  const city =
    address.city?.trim();

  const postalCode =
    address.postal_code?.trim();

  if (
    !line1 ||
    !city ||
    !postalCode ||
    !address.country
  ) {
    throw new Error(
      "Adresse de facturation Stripe incomplète.",
    );
  }

  const addressMatch =
    line1.match(
      /^(\d+[A-Za-z]?)\s+(.+)$/,
    );

  return {
    firstName,
    lastName,
    email,
    phone,

    street:
      addressMatch?.[2] ||
      line1,

    number:
      addressMatch?.[1] ||
      "1",

    city,

    postalCode,

    state:
      address.state || "",

    country:
      address.country,
  };
}

/*
 * ============================================================
 * RECUPERATION COMMANDE
 * ============================================================
 */

async function getOrder(
  stripeSessionId: string,
): Promise<SavedOrder | null> {
  const {
    data,
    error,
  } = await supabaseAdmin
    .from("domains")
    .select(
      "status, user_id",
    )
    .eq(
      "stripe_session_id",
      stripeSessionId,
    )
    .maybeSingle();

  if (error) {
    throw new Error(
      `Erreur Supabase : ${error.message}`,
    );
  }

  return data as SavedOrder | null;
}

/*
 * ============================================================
 * LIAISON USER
 * ============================================================
 */

async function attachUserToOrder(
  stripeSessionId: string,
  userId: string,
) {
  const {
    error,
  } = await supabaseAdmin
    .from("domains")
    .update({
      user_id: userId,
    })
    .eq(
      "stripe_session_id",
      stripeSessionId,
    )
    .is(
      "user_id",
      null,
    );

  if (error) {
    throw new Error(
      `Erreur Supabase lors de la liaison du compte : ${error.message}`,
    );
  }
}

/*
 * ============================================================
 * SAUVEGARDE DOMAINE ENREGISTRE
 * ============================================================
 */

async function saveRegisteredOrder({
  domain,
  email,
  userId,
  registration,
  stripeSessionId,
}: {
  domain: string;
  email: string;
  userId: string;
  registration: Record<
    string,
    unknown
  >;
  stripeSessionId: string;
}) {
  await saveOrder({
    domain,
    email,
    userId,
    expiresAt:
      extractExpirationDate(
        registration,
      ),
    openproviderId:
      extractOpenproviderId(
        registration,
      ),
    status:
      getProviderStatus(
        registration,
      ) === "ACT"
        ? "active"
        : "pending",
    stripeSessionId,
  });
}

/*
 * ============================================================
 * SAUVEGARDE COMMANDE
 * ============================================================
 */

async function saveOrder({
  domain,
  email,
  userId,
  expiresAt,
  openproviderId,
  status,
  stripeSessionId,
}: {
  domain: string;
  email: string;
  userId: string;
  expiresAt?: string | null;
  openproviderId?: string | null;
  status: DomainOrderStatus;
  stripeSessionId: string;
}) {
  const values = {
    domain,

    email,

    user_id:
      userId,

    expires_at:
      expiresAt || null,

    openprovider_id:
      openproviderId || null,

    status,

    stripe_session_id:
      stripeSessionId,
  };

  const existingOrder =
    await getOrder(
      stripeSessionId,
    );

  const query =
    existingOrder
      ? supabaseAdmin
          .from("domains")
          .update(values)
          .eq(
            "stripe_session_id",
            stripeSessionId,
          )
      : supabaseAdmin
          .from("domains")
          .insert(values);

  const {
    error,
  } = await query;

  if (error) {
    throw new Error(
      `Erreur Supabase : ${error.message}`,
    );
  }
}

/*
 * ============================================================
 * STATUS OPENPROVIDER
 * ============================================================
 */

function getProviderStatus(
  registration: Record<
    string,
    unknown
  >,
) {
  const status =
    registration.status;

  return typeof status ===
    "string"
    ? status.toUpperCase()
    : "REQ";
}

/*
 * ============================================================
 * ID OPENPROVIDER
 * ============================================================
 */

function extractOpenproviderId(
  registration: Record<
    string,
    unknown
  >,
) {
  const id =
    registration.id;

  return id === undefined ||
    id === null
    ? null
    : String(id);
}

/*
 * ============================================================
 * DATE EXPIRATION
 * ============================================================
 */

function extractExpirationDate(
  registration: Record<
    string,
    unknown
  >,
) {
  const date =
    registration.expiration_date;

  if (
    typeof date !== "string" ||
    !date
  ) {
    return null;
  }

  const parsed =
    new Date(date);

  if (
    Number.isNaN(
      parsed.getTime(),
    )
  ) {
    return null;
  }

  return parsed.toISOString();
}

/*
   * ============================================================
   * ERREUR
   * ============================================================
   */

   function getErrorMessage(
     error: unknown,
   ) {
     return error instanceof Error
       ? error.message
       : "Erreur inconnue lors de l'enregistrement.";
   }

   /*
   * ============================================================
   * TRAITEMENT EMAIL
   * ============================================================
   */

   async function processEmailOrder(
     session: Stripe.Checkout.Session,
   ) {
     if (session.payment_status !== "paid") {
       throw new Error(
         "Le paiement Stripe n'est pas confirmé.",
       );
     }

     if (
       session.metadata?.type !==
       "professional_email"
     ) {
       return;
     }

     const emailAddress = session.metadata.email_address?.trim().toLowerCase();
     const emailPrefix = session.metadata.email_prefix?.trim().toLowerCase();
     const domain = session.metadata.domain?.trim().toLowerCase();
     const plan = session.metadata.plan;
     const billingPeriod = session.metadata.billing_period || "monthly";
     const metadataUserId = session.metadata.user_id?.trim();
     const amount = parseFloat(session.metadata.amount) || 0;

     if (!emailAddress || !domain || !plan) {
       throw new Error(
         "Métadonnées email incomplètes.",
       );
     }

     /*
      * RÉCUPÉRATION user_id
      */
     let userId: string | null = null;

     if (metadataUserId) {
       userId = metadataUserId;
     } else {
       const customerEmail = session.customer_details?.email?.trim().toLowerCase();
       if (customerEmail) {
         userId = await findUserIdByEmail(customerEmail);
       }
     }

     if (!userId) {
       throw new Error(
         "Aucun utilisateur trouvé pour cette commande email.",
       );
     }

     /*
      * VÉRIFICATION DOMAINE APPARTIENT AU CLIENT
      */
     const { data: domainRow, error: domainErr } = await supabaseAdmin
       .from("domains")
       .select("id, domain, status")
       .eq("domain", domain)
       .eq("user_id", userId)
       .maybeSingle();

     if (domainErr) {
       throw new Error("Erreur vérification domaine.");
     }

     if (!domainRow) {
       throw new Error("Le domaine n'appartient pas à ce compte.");
     }

     if (domainRow.status !== "active") {
       throw new Error("Le domaine n'est pas actif.");
     }

     /*
      * IDÉMPOTENCE — même Stripe session ne traite qu'une fois
      */
     const existingOrder = await getEmailOrderBySession(session.id);

     if (existingOrder) {
       console.log(
         "EMAIL ORDER ALREADY EXIST:",
         session.id,
       );
       return;
     }

     /*
      * VÉRIFICATION ADRESSE DÉJÀ EXISTANTE
      */
     const { data: existingEmail } = await supabaseAdmin
       .from("emails")
       .select("id")
       .eq("email_address", emailAddress)
       .maybeSingle();

     if (existingEmail) {
       throw new Error(
         "Cette adresse email existe déjà.",
       );
     }

/*
       * ENREGISTREMENT COMMANDE AVEC PROVISIONNING OPENPROVIDER
       */
      try {
        /*
         * 1. Assurer que le domaine existe dans le service email
         */
        await ensureEmailDomain({
          domain,
        });

        /*
         * 2. Créer la boîte email
         */
        const emailAccount = await createEmailAccount({
          email: emailAddress,
          plan,
          mailboxSize:
            plan === "essential" ? 15 :
            plan === "business" ? 45 :
            plan === "team" ? 75 : 15,
        });

        /*
         * 3. Mettre à jour la commande avec provider_id et statut active
         */
        await saveEmailOrder({
          domain,
          email: emailAddress,
          emailPrefix,
          userId,
          plan,
          billingPeriod,
          amount,
          currency: (session.currency || "eur").toUpperCase(),
          status: "active",
          stripeSessionId: session.id,
          providerId:
            emailAccount?.id !== undefined &&
            emailAccount?.id !== null
              ? String(emailAccount.id)
              : null,
        });

        console.log(
          "EMAIL ACCOUNT CREATED:",
          {
            email: emailAddress,
            userId,
            providerId: emailAccount.id,
            sessionId: session.id,
          },
        );
      } catch (error) {
        /*
         * Si l'API email échoue, on conserve la commande en pending
         * pour qu'un support technique puisse la traiter plus tard.
         */
        await saveEmailOrder({
          domain,
          email: emailAddress,
          emailPrefix,
          userId,
          plan,
          billingPeriod,
          amount,
          currency: (session.currency || "eur").toUpperCase(),
          status: "pending",
          stripeSessionId: session.id,
          providerId: null,
        });

        console.error(
          "EMAIL ACCOUNT CREATION ERROR:",
          {
            email: emailAddress,
            error:
              error instanceof Error
                ? error.message
                : String(error),
          },
        );

        throw error;
      }
   }

   async function getEmailOrderBySession(
     stripeSessionId: string,
   ) {
     const { data, error } = await supabaseAdmin
       .from("emails")
       .select("id, status")
       .eq("stripe_session_id", stripeSessionId)
       .maybeSingle();

     if (error) {
       throw new Error(
         `Erreur Supabase : ${error.message}`,
       );
     }

     return data;
   }

   async function saveEmailOrder({
     domain,
     email,
     emailPrefix,
     userId,
     plan,
     billingPeriod,
     amount,
     currency,
     status,
     stripeSessionId,
     providerId,
   }: {
     domain: string;
     email: string;
     emailPrefix: string;
     userId: string;
     plan: string;
     billingPeriod: string;
     amount: number;
     currency: string;
     status: string;
     stripeSessionId: string;
     providerId?: string | null;
   }) {
     const existing = await getEmailOrderBySession(
       stripeSessionId,
     );

     const values = {
       user_id: userId,
       domain,
       email_prefix: emailPrefix,
       email_address: email,
       plan,
       billing_period: billingPeriod,
       amount,
       currency,
       status,
       stripe_session_id: stripeSessionId,
       provider_id: providerId ?? null,
     };

     if (existing) {
       const { error } = await supabaseAdmin
         .from("emails")
         .update(values)
         .eq("stripe_session_id", stripeSessionId);

       if (error) {
         throw new Error(
           `Erreur Supabase lors de la mise à jour de la commande email : ${error.message}`,
         );
       }
     } else {
       const { error } = await supabaseAdmin
         .from("emails")
         .insert(values);

       if (error) {
         throw new Error(
           `Erreur Supabase lors de la création de la commande email : ${error.message}`,
         );
       }
     }
   }
