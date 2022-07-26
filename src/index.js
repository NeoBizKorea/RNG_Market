import React from "react";
import ReactDOM from "react-dom/client";
import { MoralisProvider } from "react-moralis";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { MoralisDappProvider } from "./providers/MoralisDappProvider/MoralisDappProvider";
import { store } from "./store/store";

const root = document.getElementById("root");

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

ReactDOM.createRoot(root).render(
	<BrowserRouter>
		<Provider store={store}>
			<MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
				<MoralisDappProvider>
					<App />{" "}
				</MoralisDappProvider>
			</MoralisProvider>
		</Provider>
	</BrowserRouter>
);
