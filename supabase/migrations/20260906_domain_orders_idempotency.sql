-- À exécuter une seule fois dans le SQL Editor Supabase avant le déploiement.
-- Cette contrainte empêche une même session Stripe de créer plusieurs commandes.
create unique index if not exists domains_stripe_session_id_key
  on public.domains (stripe_session_id)
  where stripe_session_id is not null;
