import Link from "next/link";
import Button from "@/components/Button";
import { redirect } from "next/navigation";
import ProfileMenu from "@/components/ProfileMenu";
import Image from "next/image";
import { ThemeSwitch } from "@/components/Theme";
import { cookies } from "next/headers";
import { firebaseAdmin } from "@/lib/firebase/admin";
import { getUserData } from "../actions";
import { AuthProvider } from "@/app/Auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  let loggedIn = false
  let user;
  // console.log("auth cookie", cookieStore.get("token"));
  const token = cookieStore.get("token")?.value || "";
  try {
    // Verify the ID token on the server-side
    const { uid } = await firebaseAdmin.auth().verifyIdToken(token);
    if (uid) {
      loggedIn = true
      user = (await getUserData(uid)).toJSON();
    }
  } catch (error) {
    console.error("Error verifying ID token:", error);
    // Handle verification error (e.g., redirect to login)
  }

  if (loggedIn) {
    redirect("/app");
  }

  // if (loading)
  //   return (
  //     <div className="max-w-5xl min-h-screen px-4 lg:px-0 mx-auto overflow-x-hidden flex w-full h-full flex-col items-center justify-between ">
  //       <main className="flex-1 py-24">Loading...</main>
  //     </div>
  //   );
  if (!loggedIn) redirect("/auth/login");

  return (

    <AuthProvider>
    <div className="max-w-5xl min-h-screen px-4 lg:px-0 mx-auto overflow-x-hidden">
      <nav className="flex py-4 items-center justify-between px-2">
        <Link className="flex items-center justify-center" href="/">
          <Image
            alt="Formulate logo"
            src="/formulate.svg"
            width={32}
            height={32}
          />
          <span className="sr-only">FormUlate</span>
        </Link>
        <div className="flex items-center justify-end gap-3">
          {loggedIn ? (
            <ProfileMenu {...user} />
          ) : (
            <Link href={"/auth/login"}>
              <Button>Login</Button>
            </Link>
          )}
          <ThemeSwitch />
        </div>
      </nav>
      <main className="flex w-full h-full flex-col items-center justify-between py-24">
        {children}
      </main>
    </div>
    </AuthProvider>
  );
}
