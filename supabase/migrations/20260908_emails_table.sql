-- Migration : création de la table emails
-- Permet de stocker les boîtes email professionnelles achetées par les clients

CREATE TABLE IF NOT EXISTS emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  email_prefix TEXT NOT NULL,
  email_address TEXT NOT NULL,
  plan TEXT NOT NULL,
  billing_period TEXT NOT NULL DEFAULT 'monthly',
  amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'EUR',
  stripe_session_id TEXT,
  provider_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS emails_user_id_idx ON emails(user_id);
CREATE INDEX IF NOT EXISTS emails_domain_idx ON emails(domain);
CREATE UNIQUE INDEX IF NOT EXISTS emails_stripe_session_id_key ON emails(stripe_session_id) WHERE stripe_session_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS emails_email_address_key ON emails(email_address);
CREATE INDEX IF NOT EXISTS emails_status_idx ON emails(status);

ALTER TABLE emails ENABLE ROW LEVEL SECURITY;

-- Policies : chaque utilisateur ne peut voir/modifier que ses propres emails

CREATE POLICY "emails_select_own" ON emails
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "emails_insert_own" ON emails
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "emails_update_own" ON emails
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "emails_delete_own" ON emails
  FOR DELETE
  USING (auth.uid() = user_id);