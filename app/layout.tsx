import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "NOVA",
  description: "Agence digitale premium",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>

        <header className="navbar">

          <Link href="/" className="logo">
            <Image
              src="/logo-nova.png"
              alt="NOVA"
              width={160}
              height={60}
              priority
            />
          </Link>

          <nav className="main-nav">

            <Link href="/">
              Accueil
            </Link>

            <Link href="/services">
              Services
            </Link>

            <Link href="/realisations">
              Réalisations
            </Link>

            <Link href="/a-propos">
              À propos
            </Link>

            <Link href="/contact">
              Contact
            </Link>

          </nav>

          <Link
            href="/contact"
            className="nav-button"
          >
            Demander un devis
          </Link>

        </header>

        {children}

      </body>
    </html>
  );
}