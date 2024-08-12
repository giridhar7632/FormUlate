"use client";

import { redirect, useSearchParams } from "next/navigation";

export default function ErrorRedirect() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (error) {
    redirect(`/auth/error?error=${error}`);
  }
  return <></>;
}
