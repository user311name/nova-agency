"use client";

import { useEffect } from "react";

type SuccessClientSyncProps = {
  email: string | null;
  domain: string | null;
};

export default function SuccessClientSync({
  email,
  domain,
}: SuccessClientSyncProps) {
  useEffect(() => {
    const safeEmail =
      typeof email === "string"
        ? email.trim().toLowerCase()
        : "";

    const safeDomain =
      typeof domain === "string"
        ? domain.trim().toLowerCase()
        : "";

    if (safeEmail) {
      window.localStorage.setItem(
        "nova_client_email",
        safeEmail
      );
    }

    if (safeDomain) {
      window.localStorage.setItem(
        "nova_last_domain",
        safeDomain
      );
    }
  }, [email, domain]);

  return null;
}