import React, { useMemo } from "react";
import { getDayMessage } from "../../utils";

export const CustomDate: React.FC<{ dateString: string }> = ({
	dateString,
}) => {
	const dateMessage = useMemo(
		() => getDayMessage(new Date(dateString), new Date()),
		[dateString]
	);

	return <p className="text text_color_inactive">{dateMessage}</p>;
};
