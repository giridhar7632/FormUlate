"use client";

import { useState, useEffect } from "react";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";

export default function VerifyEmail() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email") ?? "";
    setEmail(email);

    if (isSignInWithEmailLink(getAuth(), window.location.href)) {
      setLoading(true);
      const auth = getAuth();
      const callback = urlParams.get("callbackUrl") ?? "/app";
      console.log({
        email,
        href: window.location.href,
      });
      signInWithEmailLink(auth, email, window.location.href)
        .then((userCredential) => {
          console.log("User signed in:", userCredential);
          toast.success("Sign in successful!");
          router.push(callback);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [router, email]);

  return (
    <>
      <Image
        className="mx-auto"
        width={72}
        height={72}
        src="/logo.png"
        alt="FormUlate Logo"
      />
      <h1 className="my-6 text-center text-2xl">
        {loading ? "Signing in..." : error ? "Error Signing In" : "Success"}
      </h1>
      {error ? <p className="text-center">{(error as any).message}</p> : null}
      <Link className="mx-auto mt-6" href={"/"}>
        <Button variant="secondary">Back to home</Button>
      </Link>
    </>
  );
}
