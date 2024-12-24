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
import Chatpage from "./screen/Chatpage";
import Home1 from "./Version1/Home1";
import Login1 from "./Version1/Login1";
import Signup1 from "./Version1/Signup1";
import EventPage from "./Version1/EventPage";
import CreateEvents from "./Version1/forms/CreateEvents";
import EditEvents from "./Version1/forms/EditEvents";

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
                  <Route path="/home1" element={<Home1 />} />
                  <Route path="/login1" element={<Login1 />} />
                  <Route path="/signup1" element={<Signup1 />} />
                  <Route path="/events" element={<EventPage />} />
                  <Route path="/createEvents" element={<CreateEvents />} />
                  <Route path="/editEvents" element={<EditEvents />} />
                  <Route path="/dashboard" element={<DashBoard />}>
                    <Route index element={<Profile />} />
                    <Route path="events" element={<MyBlogs />} />
                    <Route path="groups" element={<Groups />} />
                    <Route path="groups/:id" element={<GroupPage />} />
                    <Route path="requests" element={<Requests />} />
                  </Route>
                  <Route path="/chat" element={<Chatpage />} />
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
