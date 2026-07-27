import { Navigate } from "react-router-dom";
import { auth } from "@/firebase/firebase";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {

  if (!auth.currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}