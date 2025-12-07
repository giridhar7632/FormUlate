"use client";

import { useRef, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Provider from "@/components/Providers";
import {
  signInWithEmailLink,
  signInWithGitHub,
  signInWithGoogle,
  signOut,
} from "@/lib/firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export const SignOut: React.FC = () => {
  const router = useRouter();
  return (
    <Button
      variant="secondary"
      onClick={async () => {
        try {
          await signOut();
          router.push("/");
        } catch (error) {}
      }}
    >
      Sign out
    </Button>
  );
};

export const EmailLogin = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const callbackUrl = searchParams.get("callbackUrl") as string;
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={formRef}
      onSubmit={async (e) => {
        setLoading(true);
        try {
          e.preventDefault();
          if (!email) throw new Error("Email is required");
          await signInWithEmailLink(email, callbackUrl || `/app`);
          console.log("Email sent");
          toast.success("Email sent successfully!");
          formRef.current?.reset();
        } catch (error: any) {
          toast.error(error.message);
        }
        setLoading(false);
      }}
    >
      <Input
        name={"email"}
        label={"Email"}
        fieldType={"email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={"Email"}
        disabled={loading}
      />
      <Button
        type="submit"
        loading={loading}
        loadingText="Sending email..."
        className="w-full"
      >
        Continue with Email
      </Button>
    </form>
  );
};

type SocialLoginProps = {
  type: "Google" | "GitHub";
};

export const SocialLogin = ({ type }: SocialLoginProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") as string;
  return (
    <Button
      className="flex-1"
      variant="outline"
      onClick={async () => {
        try {
          let res;
          if (type === "Google") {
            res = await signInWithGoogle();
          } else if (type === "GitHub") {
            res = await signInWithGitHub();
          } else {
            throw new Error("Invalid provider");
          }
          console.log({ res });
          if (res != undefined) {
            router.push(callbackUrl || `/app`);
          }
        } catch (error: any) {
          toast.error(error.message);
        }
      }}
    >
      <Provider id={type} /> {type}
    </Button>
  );
};
