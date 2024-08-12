"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { updateUserProfile } from "@/lib/firebase/auth";
import { Pencil } from "@/lib/icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

type UserFormProps = {
  image?: string | null;
  name?: string | null;
  email?: string | null;
  id?: string | null;
};

const UserForm = ({ id, image, name, email }: UserFormProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviewImage(e.target.result as string);
        } else {
          console.error(
            "FileReader onload event triggered, but no result is available",
          );
        }
      };

      reader.onerror = (e) => {
        console.error(
          "FileReader encountered an error while reading the file:",
          reader.error,
        );
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <form
      className="w-full"
      action={async (formData) => {
        // formData.append('file', previewImage?.split(',')[1] as string)
        setLoading(true);
        try {
          await updateUserProfile(id ?? "", formData);
          toast.success("Profile updated successfully! 🎊");
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong! 😕");
        }
        setLoading(false);
      }}
    >
      <div className="relative flex items-center justify-center mx-auto mb-4 h-36 w-36 overflow-hidden cursor-pointer">
        <Image
          fill={true}
          className="rounded-full bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-600 object-cover"
          src={previewImage || image || "https://api.multiavatar.com/v.png"}
          alt="upload image"
        />
        {/* <div className="absolute right-0 p-1 bottom-0 mr-2 mb-2 h-8 w-8 border-2 border-white bg-gray-100 rounded-full text-gray-500">
                    <Pencil />
                </div>
                <input
                    type="file"
                    name="avatar"
                    onChange={handleFileChange}
                    className="absolute top-0 left-0 right-0 bottom-0 opacity-0 cursor-pointer"
                /> */}
      </div>
      <Input
        name="name"
        label="Name"
        type="text"
        placeholder={name || "Add your name"}
      />
      <Input
        name="email"
        label="Email"
        type="email"
        placeholder={email || "email"}
        disabled
      />

      <Button
        type="submit"
        className="w-full"
        variant="outline"
        disabled={loading}
      >
        Update profile
      </Button>

      <p className="text-xs text-center text-gray-400 my-4">
        You can see your public profile{" "}
        <Link
          className="underline underline-offset-4 text-blue-500"
          href={`/user/${id}`}
        >
          here.
        </Link>{" "}
      </p>
    </form>
  );
};

export default UserForm;
