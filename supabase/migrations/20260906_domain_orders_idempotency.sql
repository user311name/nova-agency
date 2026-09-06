-- À exécuter une seule fois dans le SQL Editor Supabase avant le déploiement.
-- Ces changements enregistrent l'identifiant Openprovider et empêchent une
-- même session Stripe de créer plusieurs commandes.
alter table public.domains
  add column if not exists openprovider_id text;

create unique index if not exists domains_stripe_session_id_key
  on public.domains (stripe_session_id)
  where stripe_session_id is not null;
