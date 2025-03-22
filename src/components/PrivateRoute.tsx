import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Layout from "./Layout";

export default function PrivateRoute() {
  const [cookies] = useCookies(["access_token"]);

  return cookies.access_token ? <Layout /> : <Navigate to="/" />;
}
