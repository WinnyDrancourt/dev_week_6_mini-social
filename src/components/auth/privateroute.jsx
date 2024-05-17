import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function PrivateRoute({ children }) {
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}
