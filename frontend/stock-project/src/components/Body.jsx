import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Body;
