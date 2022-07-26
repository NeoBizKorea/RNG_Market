import loginStatusReducer from "./loginStatus/loginStatus";
import toggleStatusReducer from "./toggleStatus/toggleStatus";

const rootReducers = {
	loginStatus: loginStatusReducer,
	toggleStatus: toggleStatusReducer,
};

export default rootReducers;
