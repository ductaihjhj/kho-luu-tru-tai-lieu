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
const NOTIFICATIONS_COLLECTION = "notifications";

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

export async function createCommentForResource({ resource, name, message }) {
  const commentKey = getCommentKey(resource);
  const cleanName = name.trim();
  const cleanMessage = message.trim();

  const commentPayload = {
    commentKey,
    resourceId: resource?.id || "",
    resourceTitle: resource?.title || "",
    resourceFileUrl: resource?.fileUrl || "",
    name: cleanName,
    message: cleanMessage,
    createdAt: serverTimestamp(),
  };

  const commentRef = await addDoc(
    collection(db, COMMENTS_COLLECTION),
    commentPayload
  );

  await addDoc(collection(db, NOTIFICATIONS_COLLECTION), {
    icon: "💬",
    text: `${cleanName} đã bình luận vào "${resource?.title || "tài liệu"}"`,
    time: "Vừa xong",
    read: false,
    color: "bg-pink-100",
    resourceId: resource?.id || "",
    resourceTitle: resource?.title || "",
    commentKey,
    commenterName: cleanName,
    createdAt: serverTimestamp(),
  });

  return {
    id: commentRef.id,
    ...commentPayload,
    createdAt: new Date().toISOString(),
  };
}