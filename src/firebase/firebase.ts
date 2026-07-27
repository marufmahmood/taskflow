import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtIFCeJ_l9O9byz3SsqKnUvuDxcA0_FkM",
  authDomain: "taskflow-3c133.firebaseapp.com",
  projectId: "taskflow-3c133",
  storageBucket: "taskflow-3c133.firebasestorage.app",
  messagingSenderId: "100789372804",
  appId: "1:100789372804:web:7b59650330f1019ba07fd1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;