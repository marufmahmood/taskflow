import {
  collection,
  getDocs,
  orderBy,
  limit,
  query,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

export async function generateTaskNumber() {
  const year = new Date().getFullYear().toString();

  const q = query(
    collection(db, "tasks"),
    orderBy("taskNo", "desc"),
    limit(1)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return `${year}0001`;
  }

  const lastTask = snapshot.docs[0].data();

  const lastNo = lastTask.taskNo as string;

  if (!lastNo.startsWith(year)) {
    return `${year}0001`;
  }

  const serial = Number(lastNo.slice(4)) + 1;

  return year + serial.toString().padStart(4, "0");
}