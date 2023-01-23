import Home from "./pages/Home";
import Sandbox from "./pages/Sandbox";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sandbox" element={<Sandbox />} />
      </Routes>
    </>
  );
};

export default App;
