import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider";
import Button from "./Button";

const Header = () => {
  const navigate = useNavigate();
  const { isLogedIn, setIslogedIn } = useContext(AuthContext);
  const location = useLocation();
  const path = location.pathname;

  const logoutHandler = () => {
    setIslogedIn(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login/");
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
          </div>
          <Link to={"/"} className="btn btn-ghost text-xl">
            Stock Prediction
          </Link>
        </div>
        <div className="navbar-end">
          {isLogedIn ? (
            <button
              className="btn btn-error mx-2 text-white"
              onClick={logoutHandler}
            >
              Logout
            </button>
          ) : (
            <>
              {path === "/registration" && (
                <Button
                  text={"Login"}
                  class={"btn-primary mx-2"}
                  url={"login"}
                />
              )}
              {path === "/login" && (
                <Button
                  text={"Registration"}
                  class={"btn-primary mx-2"}
                  url={"registration"}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
