import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  role: string;
  requiredRole: "admin" | "user";
  children: JSX.Element;
}

export function ProtectedRoute({ role, requiredRole, children }: ProtectedRouteProps) {
  if (role !== requiredRole) {
    return <Navigate to="/dashboard" replace />; // kick non-admins back
  }
  return children;
}
