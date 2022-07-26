import React from "react";
import Button from "./Button";

const ButtonSecondary = ({ className = " ", ...args }) => (
	<Button
		className={`ttnc-ButtonSecondary border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 ${className}`}
		{...args}
	/>
);

export default ButtonSecondary;
