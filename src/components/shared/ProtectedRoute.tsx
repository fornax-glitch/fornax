import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const isAdmin = () => {
  return localStorage.getItem("admin") === "true";
};

export default function ProtectedRoute({ children }: Props) {
  if (!isAdmin()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}