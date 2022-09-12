import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useCheckAuth from "../../../hooks/useCheckAuth";
import PropTypes from "prop-types";

import Loading from "../../statuses/Loading/Loading";

function ProtectedRoute({ children, mustAuth = true }) {
	console.log(mustAuth);
	const { user, isLoaded, checkAuth, doResetLoaded } = useCheckAuth();

	const location = useLocation();
	const from = location.state?.from || "/";

	useEffect(() => {
		checkAuth();
		return () => {
			doResetLoaded();
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Если пользователь должен быть авторизованным, а он не авторизован...
	if (mustAuth && isLoaded && !user) {
		return <Navigate to="/login" replace />;
	}

	// Если пользователь не должен быть авторизованным, а он авторизован...
	if (!mustAuth && isLoaded && user) {
		return <Navigate to={from} replace />;
	}
	if (isLoaded) {
		return children;
	}
	return <Loading />;
}

ProtectedRoute.propTypes = {
	mustAuth: PropTypes.bool,
	children: PropTypes.object.isRequired,
};

export default ProtectedRoute;
