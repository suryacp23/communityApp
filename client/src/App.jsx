import Login from "./screen/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./screen/Signup";
import Home from "./screen/Home";
import { AuthProvider } from "./hooks/useAuth";
import { BlogProvider } from "./hooks/useBlog";
import Blogpage from "./screen/Blogpage";
import { CommentProvider } from "./hooks/useComments";
import MyBlogs from "./screen/user/MyBlogs";
import DashBoard from "./screen/user/DashBoard";
import Groups from "./components/dashboard/Groups";
import Requests from "./components/dashboard/Requests";
import Profile from "./components/dashboard/Profile";
import GroupPage from "./components/group/GroupPage";
import { SocketContextProvider } from "./context/socketContext";
import { GroupProvider } from "./hooks/useGroup";
import Chatpage from "./screen/Chatpage";
import EventPage from "./components/forms/EventPage";
import CreateEvent from "./components/forms/CreateEvent";
import EditEvent from "./components/forms/EditEvent";

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
                  <Route path="/blogs" element={<Blogpage />} />
                  <Route path="/myBlogs" element={<MyBlogs />} />
                  <Route path="*" element={<Home />} />
                  <Route path="/events" element={<EventPage />} />
                  <Route path="/createEvent" element={<CreateEvent />} />
                  <Route path="/editEvent" element={<EditEvent />} />
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
