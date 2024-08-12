"use client";

import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ErrorPage() {
  const params = useSearchParams();
  const [error, setError] = useState(
    params.get("error") || "You are not authorized to view this page.",
  );

  return (
    <div className="w-80 sm:w-96 mx-auto flex flex-col bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-600 rounded-2xl p-6 md:p-12">
      <Image
        className="mx-auto"
        width={72}
        height={72}
        src="/formulate.svg"
        alt="FormUlate Logo"
      />
      <h1 className="my-6 text-center text-2xl">Caught you!</h1>
      <p className="text-center">{error}</p>
      <Link className="mx-auto mt-6" href={"/app"}>
        <Button variant="secondary">Go to dashboard</Button>
      </Link>
      <p className="text-xs text-center text-gray-400 my-4">
        If this is not what expected, let us know{" "}
        <Link
          className="underline underline-offset-4 text-blue-500"
          href="/form/contact-us"
        >
          here.
        </Link>{" "}
      </p>
    </div>
  );
}
