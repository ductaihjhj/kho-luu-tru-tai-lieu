import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "../lib/firebase";

const SETTINGS_COLLECTION = "settings";
const SETTINGS_DOC_ID = "main";

const settingsRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);

export async function fetchSettingsFromFirebase() {
  const snapshot = await getDoc(settingsRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}

export async function saveSettingsToFirebase(settingsData) {
  await setDoc(
    settingsRef,
    {
      ...settingsData,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export function subscribeSettingsFromFirebase(callback) {
  return onSnapshot(settingsRef, (snapshot) => {
    if (!snapshot.exists()) {
      callback(null);
      return;
    }

    callback(snapshot.data());
  });
}