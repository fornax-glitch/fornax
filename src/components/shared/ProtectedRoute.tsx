import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const isAuthenticated = () => {
  return !!localStorage.getItem("auth"); // simple for now
};

export default function ProtectedRoute({ children }: Props) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}