import { Route, Routes } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import Login from "./Login";
import Main from "./Main";
import Registration from "./Registration";

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/registration/" element={<Registration />} />
        <Route path="/login/" element={<Login />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default Body;
