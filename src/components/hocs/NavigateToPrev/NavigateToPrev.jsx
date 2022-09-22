import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function NavigateToPrev() {
	const location = useLocation();
	return <Navigate to={location?.state?.from || "/"} replace/>;
}

export default NavigateToPrev;
