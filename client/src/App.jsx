import Login from "./screen/Login";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "./screen/Signup";
import Home from "./screen/Home";
import { AuthProvider } from "./hooks/useAuth";
import Blogpage from "./screen/blogpage";

const App = () => {
  return (
    <div>
      
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogpage" element={<Blogpage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
