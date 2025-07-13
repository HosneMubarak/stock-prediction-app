import { BrowserRouter } from "react-router";
import "./App.css";
import AuthProvider from "./AuthProvider";
import Body from "./components/Body";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Body />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
