import React, { FC } from "react";
import {Link} from "react-router-dom";
import { IAdditionalAction } from "../../../utils/types";

import style from "./AdditionalAction.module.css";


const AdditionalAction: FC<IAdditionalAction> = ({description, linkText, to}) => {
	return (
		<span className={style.wrapper}>
			<p className="text text_color_inactive mr-2">{description}</p>
			<Link className={`${style.link} text text text_color_accent`} to={to}>{linkText}</Link>
		</span>
	);
}

export default AdditionalAction;
