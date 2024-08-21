import { SignIn, SignOut } from "@/components/authentication/auth";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <p className="text-4xl font-bold">Hello World</p>
      <pre>Session: {JSON.stringify(session) || "none"}</pre>
      {session ? <SignOut /> : <SignIn />}
    </main>
  );
}
