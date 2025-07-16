import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider";
import { API_BASE_URL } from "../utils/constants";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const successMessage = location.state?.successMessage;
  const [errorMessage, setErrorMessage] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLogedIn, setIslogedIn } = useContext(AuthContext);
  const [showLoading, setShowLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    const formData = { username, password };
    try {
      const res = await axios.post(API_BASE_URL + "auth/token/", formData);

      localStorage.setItem("accessToken", res?.data?.access);
      localStorage.setItem("refreshToken", res?.data?.refresh);
      setIslogedIn(true);
      navigate("/");
    } catch (error) {
      setErrorMessage(
        error?.response?.data || "Login failed. Please check your credentials."
      );
    } finally {
      setShowLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-md shadow-2xl bg-neutral text-neutral-content">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-content">
                  Username
                </span>
              </label>
              <input
                type="text"
                placeholder="Username or Email"
                className="input input-bordered w-full"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="label">
                {errorMessage.username && (
                  <>
                    <span className="label-text-alt text-error">
                      {errorMessage.username}
                    </span>
                  </>
                )}
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-content">
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="label">
                {errorMessage.password && (
                  <>
                    <span className="label-text-alt text-error">
                      {errorMessage.password}
                    </span>
                  </>
                )}
              </label>
            </div>

            <label className="label">
              {successMessage && (
                <>
                  <span className="label-text-alt text-success">
                    {successMessage}
                  </span>
                </>
              )}
            </label>
            <label className="label">
              {errorMessage.detail && (
                <>
                  <span className="label-text-alt text-error">
                    {errorMessage.detail}
                  </span>
                </>
              )}
            </label>

            <div className="form-control mt-4">
              {showLoading ? (
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled
                >
                  <FontAwesomeIcon icon={faSpinner} spin /> Please wait
                </button>
              ) : (
                <button type="submit" className="btn btn-primary w-full">
                  Login
                </button>
              )}
            </div>

            <div className="text-center text-sm mt-2">
              <span className="text-neutral-content">
                Don't have an account?{" "}
                <Link to={"/registration/"} className="link link-primary">
                  Register
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
