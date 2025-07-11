import { Link, useLocation } from "react-router";

const Login = () => {
  const location = useLocation();
  const successMessage = location.state?.successMessage;
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-md shadow-2xl bg-neutral text-neutral-content">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-content">
                  Username or Email
                </span>
              </label>
              <input
                type="text"
                placeholder="Username or Email"
                className="input input-bordered w-full"
                name="username"
              />
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
              />
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

            <div className="form-control">
              <label className="label cursor-pointer justify-between">
                <span className="label-text text-neutral-content">
                  Remember me
                </span>
                <input type="checkbox" className="checkbox checkbox-sm" />
              </label>
            </div>

            <div className="form-control mt-4">
              <button className="btn btn-primary w-full">Login</button>
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
