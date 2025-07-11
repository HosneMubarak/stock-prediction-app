import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { API_BASE_URL } from "../utils/constants";

const Registration = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [errorMessage, setErrorMessage] = useState({});

  const handleRegistration = async (e) => {
    e.preventDefault();
    const formData = {
      username,
      first_name,
      last_name,
      email,
      password,
      password1,
    };
    console.log(formData);
    try {
      const res = await axios.post(
        API_BASE_URL + "auth/registration/",
        formData
      );
      setErrorMessage({});
      navigate("/login/", {
        state: {
          successMessage: "Registration successful! Please login.",
        },
      });
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-md shadow-2xl bg-neutral text-neutral-content">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">
            Welcome! Register
          </h2>
          <form className="space-y-4" onSubmit={handleRegistration}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-content">
                  Username
                </span>
              </label>
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered w-full"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="label">
                <span className="label-text-alt text-error">
                  {errorMessage.username && errorMessage.username[0]}
                </span>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-content">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="label">
                <span className="label-text-alt text-error">
                  {errorMessage.email && errorMessage.email[0]}
                </span>
              </label>
            </div>

            <div className="flex gap-4">
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text text-neutral-content">
                    First Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered w-full"
                  name="firstName"
                  value={first_name}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errorMessage.first_name && errorMessage.first_name[0]}
                  </span>
                </label>
              </div>
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text text-neutral-content">
                    Last Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered w-full"
                  name="lastName"
                  value={last_name}
                  onChange={(e) => setLastname(e.target.value)}
                />
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errorMessage.last_name && errorMessage.last_name[0]}
                  </span>
                </label>
              </div>
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
                <span className="label-text-alt text-error">
                  {errorMessage.password && errorMessage.password[0]}
                </span>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral-content">
                  Confirm Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full"
                name="password1"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
              <label className="label">
                <span className="label-text-alt text-error">
                  {errorMessage.password1 && errorMessage.password1[0]}
                </span>
              </label>
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
