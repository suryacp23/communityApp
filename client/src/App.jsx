import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Events from "./screen/Events";
import Event from "./screen/Event";
import Login from "./screen/Login";
import Signup from "./screen/Signup";
import Group from "./screen/Group";
import GetStarted from "./screen/GetStarted";
<<<<<<< HEAD
import Attendancepage from "./screen/Attendancepage";
import Dashboard from "./screen/Dashboard";
=======
>>>>>>> 205bda4 (added request)
import Attendancepage from "./screen/Attendancepage";
import Dashboard from "./screen/Dashboard";

const navLinks = [
	{ label: "Events", href: "/events" },
	{ label: "Groups", href: "/groups" },
	{ label: "Create Events", href: "/create-events" },
	{ label: "Dashboard", href: "/dashboard" },
];

const CreateEvents = () => (
	<div className="w-full h-screen">
		<Header navLinks={navLinks} />
		<section>Create Events Page</section>
	</div>
);
<<<<<<< HEAD

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/events/:eventId/attendance"
            element={<Attendancepage />}
          />
        </Routes>
      </div>
    </Router>
  );
=======
const Dashboard = () => (
	<div className="w-full h-screen">
		<Header navLinks={navLinks} />
		<section>Dashboard</section>
	</div>
);

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
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route
						path="/events/:eventId/attendance"
						element={<Attendancepage />}
					/>
				</Routes>
			</div>
		</Router>
	);
>>>>>>> 8732cf9 (Backend (#49))
};

export default App;
