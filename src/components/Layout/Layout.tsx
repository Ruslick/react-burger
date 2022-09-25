import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";

function Layout() {
	return (
		<>
			<AppHeader />

			<div className="container">
				<Outlet />
			</div>
		</>
	);
}

export default Layout;
