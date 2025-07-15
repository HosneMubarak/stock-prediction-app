import { Route, Routes } from "react-router";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import Header from "./Header";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRote";
import Registration from "./Registration";

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/registration/"
          element={
            <PublicRoute>
              <Registration />
            </PublicRoute>
          }
        />
        <Route
          path="/login/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default Body;
