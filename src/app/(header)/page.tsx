import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {session ? (
        <p className="text-4xl font-bold">Hello {session.user.name}</p>
      ) : (
        <p className="text-4xl font-bold">No Session</p>
      )}
    </main>
  );
}
