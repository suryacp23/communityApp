import Login from "./screen/Login";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "./screen/Signup";
import Home from "./screen/Home";
import { AuthProvider } from "./hooks/useAuth";
import { BlogProvider } from "./hooks/useBlog";
import CreateBlog from "./components/forms/CreateBlog";
import EditBlog from "./components/forms/EditBlog";
// import logo from "./assets/logo.svg";

const App = () => {
  return (
    <div>
      <BlogProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createPost" element={<CreateBlog />} />
            <Route path="/editBlog" element={<EditBlog />} />
          </Routes>
        </AuthProvider>
      </BlogProvider>
    </div>
  );
};

export default App;
