import { BrowserRouter } from "react-router";
import "./App.css";
import Body from "./components/Body";

function App() {
  return (
    <>
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    </>
  );
}

export default App;
