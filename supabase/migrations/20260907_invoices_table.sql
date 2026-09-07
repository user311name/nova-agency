-- Migration : création de la table invoices
-- Permet de stocker les factures clients issues de Stripe

CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'EUR',
  status TEXT NOT NULL DEFAULT 'pending',
  email TEXT NOT NULL DEFAULT '',
  stripe_session_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS invoices_user_id_idx ON invoices(user_id);
CREATE INDEX IF NOT EXISTS invoices_created_at_idx ON invoices(created_at DESC);
CREATE INDEX IF NOT EXISTS invoices_stripe_session_id_idx ON invoices(stripe_session_id);

ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "invoices_select_own" ON invoices
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "invoices_insert_own" ON invoices
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "invoices_update_own" ON invoices
  FOR UPDATE
  USING (auth.uid() = user_id);