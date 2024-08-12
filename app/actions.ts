// @ts-nocheck

"use server";

import { model } from "@/lib/model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { firebaseAdmin } from "@/lib/firebase/admin";

export async function getUserData(uid: string) {
  const user = await firebaseAdmin.auth().getUser(uid);
  return user;
}

export async function getData(table: string) {
  const session = await getSession();
  if (session) {
    const data = await xata.db[table].getPaginated({
      pagination: { size: 10, offset: 0 },
    });
    return data.map((item: any) => {
      const { id, xata, ...rest } = item;
      return {
        ...rest,
        "Submitted at": new Date(xata.createdAt).toLocaleString(),
      };
    });
  }
}

export async function getDataFromTable(table: string) {
  const session = await getSession();
  if (session) {
    const res = await xata.db.forms.filter({ slug: table }).getFirst();
    if (res?.createdBy?.id === session?.user?.id) {
      // const data = await dbReq({
      //   method: 'POST',
      //   path: `/tables/${table}/query`,
      // })
      const data = await xata.db[table].getMany();
      // console.log('testdata', testdata)
      return data.map((item: any) => {
        const { id, xata, ...rest } = item;
        return {
          ...rest,
          "Submitted at": new Date(xata.createdAt).toLocaleString(),
        };
      });
    } else {
      // throw new Error('Caught you! You are not authorized to view this page.')
      redirect(`/form/${table}/error`);
    }
  }
}

export async function generateJson(prompt: string, old = {}) {
  const res = await model(old, prompt);
  return res;
}
