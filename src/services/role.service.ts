import { auth } from "@/firebase/firebase";
import { getUserById } from "./user.service";

export async function getCurrentUserRole() {
  const uid = auth.currentUser?.uid;

  if (!uid) return null;

  const user = await getUserById(uid);

  return user?.role ?? "Member";
}