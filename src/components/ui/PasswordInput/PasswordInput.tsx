import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useState } from "react";

const PasswordInput: FC<any> = (props) => {
	const [isVisible, setIsVisible] = useState(false);
	const iconClickHandle: VoidFunction = () => {
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
};

export default PasswordInput;
