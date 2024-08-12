"use client";

import { useAuth } from "@/app/Auth";
import UserForm from "./UserForm";

export default function Page() {
  const { user, loading } = useAuth() || {};

  return (
    <div className="w-92 sm:w-96 flex flex-col border items-center bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-600 rounded-2xl p-6 md:p-12">
      {loading ? (
        "Loading..."
      ) : user ? (
        <UserForm
          id={user.uid}
          image={user.photoURL}
          email={user.email}
          name={user.displayName}
        />
      ) : (
        <p className="dark:text-gray-300">User not found!</p>
      )}
    </div>
  );
}
