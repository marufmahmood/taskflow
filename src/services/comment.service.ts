import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import type { Comment } from "@/types/comment";

export const getComments = async (
  taskId: string
) => {
  const q = query(
    collection(db, "tasks", taskId, "comments"),
    orderBy("createdAt", "asc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Comment),
  }));
};

export const addComment = async (
  taskId: string,
  comment: Comment
) => {
  await addDoc(
    collection(db, "tasks", taskId, "comments"),
    comment
  );
};