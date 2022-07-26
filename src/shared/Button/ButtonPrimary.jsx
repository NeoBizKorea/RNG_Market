import React from "react";
import Button from "./Button";

const ButtonPrimary = ({
	className = "",
	...args
}) => (
		<Button
			className="ttnc-ButtonPrimary text-black bg-blue-500"
			{...args}
		/>
	);

export default ButtonPrimary;
