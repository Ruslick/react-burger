import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useCheckAuth from "../../../hooks/useCheckAuth";
import PropTypes from "prop-types";

import Loading from "../../statuses/Loading/Loading";

function ProtectedRoute({ children, mustAuth = true }) {
	const { user, isLoaded, checkAuth } = useCheckAuth();

	const location = useLocation();
	const from = location.state?.from || "/";

	useEffect(() => {
		checkAuth();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Если пользователь должен быть авторизованным, а он не авторизован...
	if (mustAuth && !isLoaded && !user) {
		return <Navigate to="/login" state={{ from: location.pathname }} />;
	}

	// Если пользователь не должен быть авторизованным, а он авторизован...
	if (!mustAuth && isLoaded && user) {
		return <Navigate to={from} />;
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
