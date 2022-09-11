import React from "react";

import style from "./AuthTemplate.module.css";



function AuthTemplate({
	id,
	title,
	inputs,
	button,
	additionActions,
	onSubmit,
}) {
	return (
		<div className={style.wrapper}>
			<form id={id} className={style.content} onSubmit={onSubmit}>
				<p className="text text-type-main_large">{title}</p>
				<div className={`${style.inputsWrapper} mb-6 mt-6`}>{inputs}</div>

				<div className="mb-20 ">{button}</div>

				<div className={style.actionsWrapper}>{additionActions}</div>
			</form>
		</div>
	);
}

export default AuthTemplate;
