import Login from "./screen/Login";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "./screen/Signup";
import Home from "./screen/Home";
import { AuthProvider } from "./hooks/useAuth";
import { BlogProvider } from "./hooks/useBlog";
import CreateBlog from "./components/forms/CreateBlog";
import EditBlog from "./components/forms/EditBlog";
import Blogpage from "./screen/Blogpage";
import { CommentProvider } from "./hooks/useComments";
import MyBlogs from "./screen/user/MyBlogs";
import DashBoard from "./screen/user/DashBoard";
import Groups from "./components/dashboard/Groups";
import Requests from "./components/dashboard/Requests";
import Profile from "./components/dashboard/Profile";
import GroupPage from "./components/group/GroupPage";
import GroupChat from "./components/group/GroupChat";
import { SocketContextProvider } from "./context/socketContext";
import { GroupProvider } from "./hooks/useGroup";
// import logo from "./assets/logo.svg";

const App = () => {
  return (
    <div>
      <BlogProvider>
        <AuthProvider>
          <CommentProvider>
            <GroupProvider>
              <SocketContextProvider>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/createPost" element={<CreateBlog />} />
                  <Route path="/editBlog" element={<EditBlog />} />
                  <Route path="/blogs" element={<Blogpage />} />
                  <Route path="/myBlogs" element={<MyBlogs />} />
                  <Route path="*" element={<Home />} />
                  <Route path="/dashboard" element={<DashBoard />}>
                    <Route index element={<Profile />} />
                    <Route path="events" element={<MyBlogs />} />
                    <Route path="groups" element={<Groups />} />
                    <Route path="groups/:id" element={<GroupPage />} />
                    <Route path="groups/chat" element={<GroupChat />} />
                    <Route path="requests" element={<Requests />} />
                  </Route>
                </Routes>
              </SocketContextProvider>
            </GroupProvider>
          </CommentProvider>
        </AuthProvider>
      </BlogProvider>
    </div>
  );
};

export default App;
