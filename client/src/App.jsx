import Login from "./screen/Login";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "./screen/Signup";
import Home from "./screen/Home";

const App = () => {
  return (
    <div className="bg-blue-600">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
