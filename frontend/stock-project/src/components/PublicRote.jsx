import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../AuthProvider";

const PublicRoute = ({ children }) => {
  const { isLogedIn } = useContext(AuthContext);
  return !isLogedIn ? children : <Navigate to={"/"} />;
};

export default PublicRoute;
