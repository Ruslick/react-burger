import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useCheckAuth from "../../../hooks/useCheckAuth";
import PropTypes from "prop-types";

import Loading from "../../statuses/Loading/Loading";
function ProtectedRoute({ redirectTo, mustAuth = true, children }) {
	const { user, isLoaded, checkAuth } = useCheckAuth();

	useEffect(() => {
		checkAuth();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoaded && user) {
		return mustAuth ? children : <Navigate to={redirectTo} replace />;
	}

	if (isLoaded && !user) {
		return !mustAuth ? children : <Navigate to={redirectTo} replace />;
	}
	return <Loading />;
}

ProtectedRoute.propTypes = {
	redirectTo: PropTypes.string.isRequired,
	mustAuth: PropTypes.bool,
	children: PropTypes.object.isRequired,
};

export default ProtectedRoute;
