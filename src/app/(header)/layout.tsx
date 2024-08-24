import Header from "@/components/ui/header";
import SessionProvider from "@/components/session-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Toaster } from "@/components/ui/toaster";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <SessionProvider session={session}>
        <Header />
      </SessionProvider>
      {children}
      <Toaster />
    </>
  );
}
