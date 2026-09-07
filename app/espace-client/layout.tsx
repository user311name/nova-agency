import ClientHeader from "@/components/ClientHeader";

export default function EspaceClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClientHeader />
      {children}
    </>
  );
}