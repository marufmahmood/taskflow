import {
  addDoc,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import type { User } from "@/types/user";


const userCollection = collection(db, "users");


// Create User Profile
export async function createUserProfile(
  user: User
) {
  return await addDoc(
    userCollection,
    user
  );
}



// Get All Users
export async function getUsers() {

  const snapshot = await getDocs(
    userCollection
  );


  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as User[];

}



// Get Single User

export async function getUserById(
  id: string
) {

  const userRef = doc(
    db,
    "users",
    id
  );


  const snapshot = await getDoc(
    userRef
  );


  if (snapshot.exists()) {

    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as User;

  }


  return null;

}