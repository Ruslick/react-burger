import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";

function PasswordInput(props) {
	const [isVisible, setIsVisible] = useState(false);
	const iconClickHandle = () => {
		setIsVisible(!isVisible);
	};

	return (
		<Input
			{...props}
			type={isVisible ? "text" : "password"}
			name="password"
			onIconClick={iconClickHandle}
			icon={isVisible ? "HideIcon" : "ShowIcon"}
		/>
	);
}

export default PasswordInput;
