import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();
  

  return <div>
          <p>Logged in as: {session?.user?.name} ({session?.user?.email})</p>
        </div>
}