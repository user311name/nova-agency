import "./globals.css";
import Header from "@/components/Header";


export const metadata = {
  title: "NOVA",
  description: "Agence digitale premium",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (

    <html lang="fr">

      <body>

        <Header />

        {children}

      </body>

    </html>

  );

}