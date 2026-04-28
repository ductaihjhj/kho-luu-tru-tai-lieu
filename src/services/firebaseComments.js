import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { db } from "../lib/firebase";

const COMMENTS_COLLECTION = "comments";

function normalizeComment(docItem) {
  const data = docItem.data();

  return {
    id: docItem.id,
    ...data,
    createdAt: data.createdAt?.toDate
      ? data.createdAt.toDate().toISOString()
      : data.createdAt || null,
  };
}

export function getCommentKey(resource = {}) {
  if (resource.id) return String(resource.id);

  if (resource.fileUrl && resource.fileUrl !== "#") {
    return `file:${resource.fileUrl}`;
  }

  return `title:${resource.title || "unknown-resource"}`;
}

export async function fetchCommentsByResource(resource) {
  if (!resource) return [];

  const commentKey = getCommentKey(resource);

  const q = query(
    collection(db, COMMENTS_COLLECTION),
    where("commentKey", "==", commentKey)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs
    .map(normalizeComment)
    .sort((a, b) => {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
}

export async function createCommentForResource({
  resource,
  name,
  message,
}) {
  const commentKey = getCommentKey(resource);

  const payload = {
    commentKey,
    resourceId: resource?.id || "",
    resourceTitle: resource?.title || "",
    resourceFileUrl: resource?.fileUrl || "",
    name: name.trim(),
    message: message.trim(),
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, COMMENTS_COLLECTION), payload);

  return {
    id: docRef.id,
    ...payload,
    createdAt: new Date().toISOString(),
  };
}