/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable spaced-comment */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import MoralisDappContext from "./context";
import { ethABI } from "./ethABI";

function MoralisDappProvider({ children }) {
	const { web3, Moralis, user } = useMoralis();
	const [walletAddress, setWalletAddress] = useState();
	const [chainId, setChainId] = useState();
	const [contractABI, setContractABI] = useState(JSON.stringify(ethABI)); //Smart Contract ABI here
	const [marketAddress, setMarketAddress] = useState(
		process.env.REACT_APP_MARKET_CONTRACT_ADDRESS
	); //Smart Contract Address Here

	useEffect(() => {
		Moralis.onChainChanged(function (chain) {
			setChainId(chain);
		});

		Moralis.onAccountsChanged(function (address) {
			setWalletAddress(address[0]);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		if (web3 && web3.givenProvider) {
			setChainId(web3.givenProvider?.chainId);
		}
	});
	useEffect(() => {
		if (web3 && web3.givenProvider) {
			setWalletAddress(
				web3.givenProvider?.selectedAddress || user?.get("ethAddress")
			);
		}
	}, [web3, user]);

	return (
		<MoralisDappContext.Provider
			value={{
				walletAddress,
				chainId,
				marketAddress,
				setMarketAddress,
				contractABI,
				setContractABI,
			}}>
			{children}
		</MoralisDappContext.Provider>
	);
}

function useMoralisDapp() {
	const context = React.useContext(MoralisDappContext);
	if (context === undefined) {
		throw new Error("useMoralisDapp must be used within a MoralisDappProvider");
	}
	return context;
}

export { MoralisDappProvider, useMoralisDapp };
