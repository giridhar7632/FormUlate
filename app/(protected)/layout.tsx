import Link from "next/link";
import Button from "@/components/Button";
import { redirect } from "next/navigation";
import ProfileMenu from "@/components/ProfileMenu";
import Image from "next/image";
import { ThemeSwitch } from "@/components/Theme";
import { cookies } from "next/headers";
import { firebaseAdmin } from "@/lib/firebase/admin";
import { getUserData } from "../actions";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  console.log("cookie", cookieStore.get("token"));
  const token = await firebaseAdmin
    .auth()
    .verifyIdToken(cookieStore.get("token")?.value ?? "");

  // the user is authenticated!
  const { uid } = token;
  const user = (await getUserData(uid)).toJSON();

  // if (loading)
  //   return (
  //     <div className="max-w-5xl min-h-screen px-4 lg:px-0 mx-auto overflow-x-hidden flex w-full h-full flex-col items-center justify-between ">
  //       <main className="flex-1 py-24">Loading...</main>
  //     </div>
  //   );
  if (!uid) redirect("/auth/login");

  return (
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
          {user ? (
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
  );
}
