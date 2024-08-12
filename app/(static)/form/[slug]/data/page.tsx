import { Suspense } from "react";
import { LoaderIcon } from "react-hot-toast";
import Table from "./Table";
import Export from "./Export";
import { redirect } from "next/navigation";
import { Pagination } from "./Pagination";
import { ENTRIES_PER_PAGE } from "@/utils/constants";
import ShareButton from "./ShareButton";
import ShareForm from "./ShareForm";
import { cookies } from "next/headers";
import { firebaseAdmin } from "@/lib/firebase/admin";
import {
  getFormBySlug,
  getRecordCount,
  getRecords,
} from "@/lib/firebase/firestore";
import { PramsProps } from "../page";
import { Metadata, ResolvingMetadata } from "next";
import {
  getAuthenticatedAppForUser,
  getAuthenticatedAppForUser as getUser,
} from "@/lib/firebase/serverApp";
import { getFirestore } from "firebase/firestore";

export async function generateMetadata(
  { params }: PramsProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { firebaseServerApp } = await getAuthenticatedAppForUser();
  const form = await getFormBySlug(
    getFirestore(firebaseServerApp),
    params.slug,
  );

  if (!form) {
    return (await parent) as Metadata;
  }

  const previousImages = (await parent).openGraph?.images || [];
  const title = `Submissions of ${form?.name}`;
  const { description } = form;

  return {
    title,
    description,
    openGraph: {
      title,
      description: description as string,
      images: previousImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description as string,
      images: previousImages,
    },
  };
}

export default async function Data({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page: string };
}) {
  const cookieStore = cookies();
  const cookie = cookieStore.get("token")?.value || "";
  if (!cookie) redirect("/auth/login");
  console.log({ cookie });
  const token = await firebaseAdmin.auth().verifyIdToken(cookie);

  // the user is authenticated!
  const { uid } = token;
  // const user = (await getUserData(uid)).toJSON();

  if (!uid) redirect("/auth/login");

  let form;
  const { firebaseServerApp } = await getAuthenticatedAppForUser();
  const firestore = getFirestore(firebaseServerApp);
  try {
    form = await getFormBySlug(firestore, params.slug);
  } catch (error: any) {
    redirect(`/form/${params.slug}/error?error=${error.message || ""}`);
  }
  if (form?.createdBy?.id !== uid) {
    redirect(`/form/${params.slug}/error`);
  }
  const pageNumber = parseInt(searchParams.page) || 1;

  const recordPagePromise = getRecords(firestore, params.slug, pageNumber);

  const recordCountPromise = getRecordCount(firestore, params.slug);

  const [recordsPage, recordCount] = await Promise.all([
    recordPagePromise,
    recordCountPromise,
  ]);

  const totalNumberOfPages = Math.ceil(recordCount / ENTRIES_PER_PAGE);

  // This page object is needed for building the buttons in the pagination component
  const page = {
    pageNumber,
    hasNextPage: pageNumber * ENTRIES_PER_PAGE < recordCount,
    hasPreviousPage: pageNumber > 1,
    totalNumberOfPages,
  };

  console.log({ recordsPage, recordCount, page });

  return (
    <div className="flex flex-col gap-4">
      <p>{form?.name}</p>
      <div className="flex flex-col md:flex-row gap-2 items-center md:justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold md:text-5xl/none">Submissions</h1>
          <span className="inline-block rounded-lg bg-gray-100 dark:text-gray-800 px-3 py-1 text-sm">
            {recordCount}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ShareForm
            title={form?.name}
            text="Hey! please submit your response here: "
            slug={params.slug}
          />
          <ShareButton slug={params.slug} />
          <Export table={params.slug} data={recordsPage} />
        </div>
      </div>
      <div className="my-6">
        <Suspense fallback={<LoaderIcon />}>
          {recordsPage.length ? (
            <Table data={recordsPage} page={pageNumber} />
          ) : (
            <p className="text-gray-500 mx-auto w-full text-center my-24">
              No submissions yet! Share the form with your friends to get
              started.
            </p>
          )}
        </Suspense>
      </div>
      <div className="my-4">
        <Pagination
          slug={params.slug}
          currPage={pageNumber}
          totalPages={page.totalNumberOfPages}
        />
      </div>
    </div>
  );
}
