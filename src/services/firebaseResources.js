import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../lib/firebase";

const RESOURCES_COLLECTION = "resources";

export async function createResourceInFirebase(resourceData) {
  const payload = {
    ...resourceData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, RESOURCES_COLLECTION), payload);

  return {
    id: docRef.id,
    ...resourceData,
    updatedAt: "Vừa xong",
  };
}

export async function fetchResourcesFromFirebase() {
  const q = query(
    collection(db, RESOURCES_COLLECTION),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => {
    const data = item.data();

    return {
      id: item.id,
      ...data,
      createdAt: data.createdAt?.toDate
        ? data.createdAt.toDate().toISOString()
        : data.createdAt || null,
      updatedAt: "Vừa xong",
    };
  });
}

export async function updateResourceInFirebase(resourceId, data) {
  const resourceRef = doc(db, RESOURCES_COLLECTION, resourceId);

  await updateDoc(resourceRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteResourceFromFirebase(resourceId) {
  await deleteDoc(doc(db, RESOURCES_COLLECTION, resourceId));
}