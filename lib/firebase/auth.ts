import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  signInWithRedirect,
  sendSignInLinkToEmail,
  onAuthStateChanged as _onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "./clientApp";
import { setCookie } from "nookies";

export function onAuthStateChanged(cb: any) {
  return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential?.accessToken;
    // if(token){
    //   setCookie(null, 'token', token, { path: "/" })
    // }

    return result;
  } catch (error: any) {
    console.error("Error signing in with Google", error);
    if (error.code === "auth/account-exists-with-different-credential") {
      throw new Error("You used different provider with this email.");
    } else {
      throw new Error("Something went wrong while signing you in!.");
    }
  }
}

export async function signInWithGitHub() {
  const provider = new GithubAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    // const credential = GithubAuthProvider.credentialFromResult(result);
    // const token = credential?.accessToken;
    // if(token){
    //   setCookie(null, 'token', token, { path: "/" })
    // }

    return result;
  } catch (error: any) {
    console.error("Error signing in with GitHub", error);
    if (error.code === "auth/account-exists-with-different-credential") {
      throw new Error("You used different provider with this email.");
    } else {
      throw new Error("Something went wrong while signing you in!.");
    }
  }
}

export async function signInWithEmailLink(email: string, callbackUrl: string) {
  try {
    const actionCodeSettings = {
      url:
        "http://localhost:3000/auth/passwordless-auth?email=" +
        email +
        "&callbackUrl=" +
        callbackUrl,
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
  } catch (error: any) {
    console.error("Error signing in with Email", error);
    if (error.code === "auth/account-exists-with-different-credential") {
      throw new Error("You used different provider with this email.");
    } else {
      throw new Error("Something went wrong while signing you in!.");
    }
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out!", error);
  }
}

export async function updateUserProfile(userId: string, formData: FormData) {
  if (auth.currentUser?.uid == userId) {
    auth.currentUser.uid &&
      (await updateProfile(auth.currentUser, {
        displayName: formData.get("name") as string,
      }));
  } else {
    throw new Error("Unauthorized");
  }
}
