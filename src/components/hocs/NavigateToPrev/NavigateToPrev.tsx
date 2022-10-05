import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ILocation } from "../../../utils/types";

function NavigateToPrev() {
	const location = useLocation();

	const {from} = location.state as ILocation
	
	return <Navigate to={from || "/"} replace/>;
}

export default NavigateToPrev;
       