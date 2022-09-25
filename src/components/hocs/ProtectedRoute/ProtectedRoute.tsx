import React, {  useEffect } from "react";
import { Navigate } from "react-router-dom";
import useCheckAuth from "../../../hooks/useCheckAuth";

import Loading from "../../statuses/Loading/Loading";

export const ProtectedRoute = ({
	children,
	mustAuth = true,
}: {
	mustAuth?: boolean;
	children: JSX.Element;
}) => {
	const { user, isLoaded, checkAuth, doResetLoaded } = useCheckAuth();

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
		return <Navigate to="/" replace />;
	}
	if (isLoaded) {
		return children;
	}
	return <Loading />;
};
