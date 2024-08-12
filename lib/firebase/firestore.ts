import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAt,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "./clientApp";
import { FormField, PageData } from "@/types/types";
import { ENTRIES_PER_PAGE } from "@/utils/constants";
import { revalidatePath } from "next/cache";

export async function getUserData(uid: string) {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log("No such user");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export async function createDataStructure(
  collectionName: string,
  fields: FormField[]
) {
  try {
    console.log("fields for ", collectionName, fields);
    // const metadataDocRef = doc(db, collectionName, "metadata");
    // console.log("setting doc");
    // await setDoc(metadataDocRef, {
    //   ...fields,
    //   createdAt: new Date(),
    // });

    const dataCollectionRef = collection(db, collectionName);

    return { success: true };
  } catch (error) {
    console.error("Error creating data structure:", error);
    return { success: false, error };
  }
}

export async function addPage(
  table: string,
  title: string,
  description: string,
  input: PageData,
  createdBy: { id: string; name: string; email: string },
  prompt?: string
) {
  const formsCollectionRef = collection(db, "forms");
  const newFormRef = await addDoc(formsCollectionRef, {
    name: title ? title : input.title,
    description,
    page: input,
    createdBy,
    slug: table,
    prompt,
    createdAt: new Date(),
  });

  // You might want to update the document with an ID for easier referencing later
  await setDoc(newFormRef, { id: newFormRef.id }, { merge: true });

  return newFormRef.id;
}

export async function getFormsByUser(userId: string) {
  const formsRef = collection(db, "forms");
  const q = query(formsRef, where("createdBy.id", "==", userId));

  const querySnapshot = await getDocs(q);
  const forms = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    slug: doc.data().slug,
    createdAt: doc.data().createdAt.toDate().toDateString().substring(4),
  }));

  return forms;
}

export async function getFormBySlug(db: any, slug: string) {
  if (!slug) {
    console.error("Error: Invalid ID received: ", slug);
    throw new Error("Form does not exist!");
  }
  const formsRef = collection(db, "forms");
  const q = query(formsRef, where("slug", "==", slug));
  const formSnapshot = await getDocs(q);

  const form =
    formSnapshot.docs.length > 0 ? formSnapshot.docs[0].data() : null;
  if (!form) {
    throw new Error("Form does not exist!");
  }

  return form;
}

export async function getRecords(db: any, slug: string, pageNumber: number) {
  const ref = collection(db, slug);
  let startAtDoc: any = null;

  if (pageNumber > 1) {
    const prevPageQuery = query(ref, orderBy("createdAt", "desc"), limit(1));
    const prevPageSnapshot = await getDocs(prevPageQuery);
    startAtDoc = prevPageSnapshot.docs[prevPageSnapshot.docs.length - 1]; // Get last doc
  }

  const q = startAtDoc
    ? query(
        ref,
        orderBy("createdAt", "desc"),
        startAt(startAtDoc),
        limit(ENTRIES_PER_PAGE)
      )
    : query(ref, orderBy("createdAt", "desc"), limit(ENTRIES_PER_PAGE));
  const querySnapshot = await getDocs(q);
  console.log({ data: querySnapshot.docs.length });
  return querySnapshot.docs.map((item: any) => {
    const { id, createdAt, ...rest } = item.data();
    return {
      ...rest,
      "Submitted at": createdAt.toDate().toLocaleString(),
    };
  });
}

export async function getRecordCount(db: any, slug: string) {
  const ref = collection(db, slug);
  const querySnapshot = await getDocs(ref);

  return querySnapshot.size;
}

export async function bulkExportData(table: string) {
  const ref = collection(db, table);
  const q = query(ref, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((item: any) => {
    const { id, createdAt, ...rest } = item.data();
    return {
      ...rest,
      "Submitted at": createdAt.toDate().toLocaleString(),
    };
  });
}

export async function insertDataToForm(collectionName: string, data: any) {
  const collectionRef = collection(db, collectionName);
  const docRef = await addDoc(collectionRef, {
    ...data,
    createdAt: new Date(),
  });

  return docRef.id;
}

export async function deleteForm(id: string, slug: string) {
  try {
    console.log("Deleting form with ID:", id);
    await deleteDoc(doc(db, "forms", id)); // Delete the form document first

    // Delete collection documents (alternative approaches)
    console.log("Deleting form data for:", slug);
    // Option 1: Individual document deletion (more efficient for large collections)
    const collectionRef = collection(db, slug);
    const snapshot = await getDocs(collectionRef);
    const promises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(promises);

    // Option 2: Collection group query (if applicable)
    // const colGroupRef = collectionGroup(db, `${slug}`);
    // const snapshot = await getDocs(colGroupRef); // Replace with your subcollection name
    // const promises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
    // await Promise.all(promises);
    console.log("Form data deleted!");
    revalidatePath(`/app`);
    return { message: "Form deleted!" };
  } catch (error) {
    console.error("Error deleting form:", error);
    return { message: "Failed to delete form!" };
  }
}

export async function seedData() {
  const studentNames = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Emily",
    "Fiona",
    "George",
    "Hannah",
    "Isabella",
    "Jack",
    "Katherine",
    "Liam",
    "Mia",
    "Noah",
    "Olivia",
    "Peter",
    "Quinn",
    "Ryan",
    "Sophia",
    "Thomas",
    "Uma",
    "Victor",
    "Willow",
    "Xavier",
    "Yara",
    "Zachary",
    "Amelia",
    "Benjamin",
    "Chloe",
    "Daniel",
    "Eleanor",
  ];

  const studentData = [];

  for (let i = 0; i < 32; i++) {
    const randomName =
      studentNames[Math.floor(Math.random() * studentNames.length)];
    const randomDob = new Date(
      Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365 * (15 - 12)
    ); // Random date between 12-15 years ago
    const randomFood = ["pizza", "pasta", "sushi", "tacos"][
      Math.floor(Math.random() * 4)
    ];

    studentData.push({
      student_name: randomName,
      student_dob: randomDob.toISOString().slice(0, 10), // Format date as YYYY-MM-DD
      student_food: randomFood,
      createdAt: new Date(),
    });
  }

  const batch = writeBatch(db);
  studentData.forEach((student) => {
    const docRef = doc(collection(db, "badcf-studentinfo"));
    batch.set(docRef, student);
  });

  await batch.commit();
  console.log("Data seeded!");
}
