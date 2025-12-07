import { firebaseAdmin } from "@/lib/firebase/admin";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  console.log("cookie", cookieStore.get("token"));
  const token = cookieStore.get("token")?.value || "";
  try {
    // Verify the ID token on the server-side
    const { uid } = await firebaseAdmin.auth().verifyIdToken(token);
    if (uid) {
      redirect("/app");
    }
  } catch (error) {
    console.error("Error verifying ID token:", error);
    // Handle verification error (e.g., redirect to login)
  }

  return (
    <div className="max-w-5xl min-h-screen px-4 lg:px-0 mx-auto overflow-x-hidden flex w-full h-full flex-col items-center justify-between ">
      <main className="flex-1 py-24">
        <div className="w-80 sm:w-96 flex flex-col bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-600 rounded-2xl p-6 md:p-12">
          {children}
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t dark:border-gray-600">
        <Link href={"/"} className="text-xs text-gray-500  ">
          © FormUlate.
        </Link>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="/terms"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="/policy"
          >
            Privacy
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="/form/contact-us"
          >
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
}
