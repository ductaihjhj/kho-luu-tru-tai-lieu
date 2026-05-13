import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../lib/firebase";

const NOTIFICATIONS_COLLECTION = "notifications";

function formatTime(value) {
  if (!value) return "Vừa xong";

  const date = value?.toDate ? value.toDate() : new Date(value);

  if (Number.isNaN(date.getTime())) return "Vừa xong";

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return "Vừa xong";
  if (diffMinutes < 60) return `${diffMinutes} phút trước`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} giờ trước`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} ngày trước`;
}

function normalizeNotification(docItem) {
  const data = docItem.data();

  return {
    id: docItem.id,
    icon: data.icon || "🔔",
    text: data.text || "Có thông báo mới",
    time: data.time || formatTime(data.createdAt),
    read: Boolean(data.read),
    color: data.color || "bg-purple-100",
    resourceId: data.resourceId || "",
    resourceTitle: data.resourceTitle || "",
    commentKey: data.commentKey || "",
    createdAt: data.createdAt?.toDate
      ? data.createdAt.toDate().toISOString()
      : data.createdAt || null,
    isFirebase: true,
  };
}

export function subscribeNotificationsFromFirebase(callback) {
  const q = query(
    collection(db, NOTIFICATIONS_COLLECTION),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(normalizeNotification);
    callback(data);
  });
}

export async function markAllNotificationsReadInFirebase() {
  const snapshot = await getDocs(collection(db, NOTIFICATIONS_COLLECTION));

  await Promise.all(
    snapshot.docs.map((item) =>
      updateDoc(doc(db, NOTIFICATIONS_COLLECTION, item.id), {
        read: true,
      })
    )
  );
}
export async function deleteNotificationsByResource(resource = {}) {
  const resourceId = resource.id || "";
  const resourceTitle = resource.title || "";

  const jobs = [];

  if (resourceId) {
    const qById = query(
      collection(db, NOTIFICATIONS_COLLECTION),
      where("resourceId", "==", resourceId)
    );

    jobs.push(getDocs(qById));
  }

  if (resourceTitle) {
    const qByTitle = query(
      collection(db, NOTIFICATIONS_COLLECTION),
      where("resourceTitle", "==", resourceTitle)
    );

    jobs.push(getDocs(qByTitle));
  }

  const snapshots = await Promise.all(jobs);

  const docsToDelete = new Map();

  snapshots.forEach((snapshot) => {
    snapshot.docs.forEach((item) => {
      docsToDelete.set(item.id, item);
    });
  });

  await Promise.all(
    Array.from(docsToDelete.values()).map((item) =>
      deleteDoc(doc(db, NOTIFICATIONS_COLLECTION, item.id))
    )
  );
}

export async function deleteNotificationInFirebase(notificationId) {
  if (!notificationId) return;

  await deleteDoc(doc(db, NOTIFICATIONS_COLLECTION, notificationId));
}