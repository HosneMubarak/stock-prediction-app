import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogedIn, setIslogedIn] = useState(
    !!localStorage.getItem("accessToken")
  );
  return (
    <AuthContext.Provider value={{ isLogedIn, setIslogedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
