import React from "react";
import { useLocation } from "react-router-dom";
import Login from "../components/Login";

function LoginPage(props) {
	const { state } = useLocation();

	return (
		<div class="flex w-full h-full items-center justify-center  bg-white">
			<Login redirectTo={state?.redirectTo ? state?.redirectTo : null} />
		</div>
	);
}

export default LoginPage;
