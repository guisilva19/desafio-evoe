import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function PrivateRoute() {
  const [cookies] = useCookies(["access_token"]);

  return cookies.access_token ? <Outlet /> : <Navigate to="/" />;
}
