// enforces that this code can only be called on the server
// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment
import "server-only";

import { cookies, headers } from "next/headers";
import { initializeServerApp } from "firebase/app";

import { firebaseConfig } from "./config";
import { getAuth } from "firebase/auth";

export async function getAuthenticatedAppForUser() {
  let idToken = headers().get("Authorization")?.split("Bearer ")[1];
  console.log({ idToken });
  // if (!idToken) {
  //   const cookieStore = cookies();
  //   idToken = cookieStore.get("token")?.value;
  // }

  const firebaseServerApp = initializeServerApp(
    firebaseConfig,
    idToken
      ? {
          authIdToken: idToken,
        }
      : {},
  );

  const auth = getAuth(firebaseServerApp);
  await auth.authStateReady();

  return { firebaseServerApp, currentUser: auth.currentUser };
}
