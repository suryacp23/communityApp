import Login from "./screen/Login";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "./screen/Signup";
import Home from "./screen/Home";
import { AuthProvider } from "./hooks/useAuth";
// import logo from "./assets/logo.svg";

const App = () => {
  return (
    <div>
      {/* <div>{logo}</div> */}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
