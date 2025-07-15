import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../AuthProvider";

const PrivateRoute = ({ children }) => {
  const { isLogedIn } = useContext(AuthContext);
  return isLogedIn ? children : <Navigate to={"/login"} />;
};

export default PrivateRoute;
