import React from "react";
import Header from "../../components/bigcomponents/Header.jsx";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/dashboard/NavBar.jsx";
const DashBoard = () => {
	return (
		<>
			<Header />
			<NavBar />
			<div>
				<Outlet />
			</div>
		</>
	);
};

export default DashBoard;
