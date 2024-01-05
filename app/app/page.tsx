import { auth } from "@/lib/auth";
import { SignOut } from "../auth/login/Methods";

export default async function Page() {

  const session = await auth();

  return <div>
    <p>Logged in as: {session?.user?.name} ({session?.user?.email})</p>
    <SignOut />
  </div>
}