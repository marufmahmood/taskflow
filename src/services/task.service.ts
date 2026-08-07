import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";
import type { Task } from "@/types/task";
const taskCollection = collection(db, "tasks");

export async function addTask(task: Task) {
  return await addDoc(taskCollection, task);
}

export async function getTasks() {
  const q = query(
    taskCollection,
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Task[];
}


export async function deleteTask(id: string) {
  const taskRef = doc(db, "tasks", id);

  return await deleteDoc(taskRef);
}
export async function updateTask(
  id: string,
  data: Partial<Task>
) {
  const taskRef = doc(db, "tasks", id);

  return await updateDoc(taskRef, data);
}