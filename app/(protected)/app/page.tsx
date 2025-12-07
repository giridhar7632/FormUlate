"use client";

import Button from "@/components/Button";
import Link from "next/link";
import FormActions from "./FormActions";
import { getFormsByUser } from "@/lib/firebase/firestore";
import { useAuth } from "@/app/Auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user, loading } = useAuth() || {};
  const [forms, setForms] = useState<any[]>([]);
  const [loadingForms, setLoadingForms] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  // const forms = await getFormsByUser()
  function removeForm(id: string) {
    setForms((prevForms) => prevForms.filter((form) => form.id !== id));
  }
  useEffect(() => {
    if (!loading && user) {
      setLoadingForms(true);
      getFormsByUser(user.uid)
        .then((forms) => {
          setForms(forms);
          setLoadingForms(false);
          console.log(forms);
        })
        .catch((error) => {
          console.error("Error fetching forms:", error);
          setError("Error fetching forms. Try reloading the page!");
          setLoadingForms(false);
        });
    }
  }, [user, loading]);

  if (loading)
    return (
      <div className="max-w-5xl min-h-screen px-4 lg:px-0 mx-auto overflow-x-hidden flex w-full h-full flex-col items-center justify-between ">
        <main className="flex-1 py-24">Loading...</main>
      </div>
    );

  if (!user) router.push("/auth/login");

  return (
    <div className="w-full">
      <p className="text-xl">
        Hi there! <b>{user?.name}</b>
      </p>
      <div className="w-full my-4 flex items-center justify-between">
        <h2 className="text-2xl text-gray-500 truncate">Your forms</h2>
        <Link className="mr-1" href="/create">
          <Button>Create new form</Button>
        </Link>
      </div>
      <div className="flex gap-4 flex-col md:flex-row items-center flex-wrap">
        {loadingForms ? (
          <span className="mx-auto">Loading...</span>
        ) : error ? (
          <p className="text-gray-500 mt-24 mx-auto">{error}</p>
        ) : forms.length ? (
          forms.map((form) => (
            <div
              key={form.id}
              className="flex-1 p-4 md:p-6 flex items-center justify-between w-full md:min-w-[40%] border shadow-sm hover:shadow-md border-gray-200 rounded-xl bg-white dark:border-gray-600 dark:bg-gray-800"
            >
              <Link href={`/form/${form.slug}`}>
                <p className="text-blue-500">{form.name}</p>
                <p className="text-sm text-gray-500">
                  created on: {form.createdAt}
                </p>
              </Link>
              <FormActions id={form.id} removeForm={removeForm} slug={form.slug as string} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-24 mx-auto">
            No forms yet! Click on the button above to create new forms.
          </p>
        )}
      </div>
    </div>
  );
}
