import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Events from "./screen/Events";
import Event from "./screen/Event";
import Login from "./screen/Login";
import Signup from "./screen/Signup";
import Group from "./screen/Group";
import GetStarted from "./screen/GetStarted";
import Attendancepage from "./screen/Attendancepage";
import Dashboard from "./screen/Dashboard";
import CreateEvents from "./screen/CreateEvents";
import PaymentPage from "./screen/PaymentPage";
import EditEvents from "./screen/EditEvents";
import RequestComponent from "./components/RequestComponent";
import Request from "./screen/Request";

const App = () => {
  return (
    <Router>
      <div className="max-w-screen-wide bg-background mx-auto">
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId" element={<Event />} />
          <Route path="/groups" element={<Group />} />
          <Route path="/create-events" element={<CreateEvents />} />
          <Route path="/updateEvent/:eventId" element={<EditEvents />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/request" element={<Request />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/events/:eventId/attendance"
            element={<Attendancepage />}
          />
          <Route path="/payments/:eventId" element={<PaymentPage />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
