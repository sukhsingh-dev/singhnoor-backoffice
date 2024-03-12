import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession()

  if (!session || !session?.user) {
    redirect('/api/auth/signin')
  }

  return (
    <main>
      <h1>this should be protected</h1>
    </main>
  );
}
