import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";

export function Layout() {
	return (
		<>
			<AppHeader />

			<div className="container">
				<Outlet />
			</div>
		</>
	);
}


