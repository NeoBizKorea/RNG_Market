import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { useNFTBalance } from "../../hooks/useNFTBalance";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import Layout from "../Partials/Layout";
import OverviewSection from "./OverviewSection";

export default function ActiveBids() {
  const navigate = useNavigate();
	const { marketAddress, contractABI } = useMoralisDapp();
	const { NFTBalance, fetchSuccess } = useNFTBalance();
	const [currentNft, setCurrentNft] = useState(null);
	const [price, setPrice] = useState(0);
	const listItemFunction = "createMarketItem";
	const contractABIJson = JSON.parse(contractABI);
	const contractProcessor = useWeb3ExecuteFunction();

  const getQueryId = () => {
		const query = queryString.parse(window.location.search);
		if (query.id) {
			return query.id;
		} 
			return null;
		
	};
  
  useEffect(() => {
		const id = getQueryId();
		if (id) {
			const current: any = NFTBalance.find((nft: any) => nft.token_hash === id);
      console.log(current);
			setCurrentNft(current);
		}
	}, [fetchSuccess, NFTBalance]);

  const list = async () => {
		if (price && price !== 0) {
			// const p: number = price * ("e1" + 18);
			const p = price * 10 ** 18;

			const ops = {
				contractAddress: marketAddress,
				functionName: listItemFunction,
				abi: contractABIJson,
				params: {
					nftContract: currentNft.token_address,
					tokenId: currentNft.token_id,
					price: String(p),
				},
			};

			await contractProcessor.fetch({
				params: ops,
				onSuccess: () => {
					alert("Listing success");
					navigate(`/market-place`);
				},
				onError: (error) => {
					console.dir(error);
					alert("Listing Error");
				},
			});
		} else {
			alert("Please enter price");
		}
	};

  async function approveAll() {
		const ops = {
			contractAddress: currentNft.token_address,
			functionName: "setApprovalForAll",
			abi: [
				{
					inputs: [
						{ internalType: "address", name: "operator", type: "address" },
						{ internalType: "bool", name: "approved", type: "bool" },
					],
					name: "setApprovalForAll",
					outputs: [],
					stateMutability: "nonpayable",
					type: "function",
				},
			],
			params: {
				operator: marketAddress,
				approved: true,
			},
		};

		await contractProcessor.fetch({
			params: ops,
			onSuccess: () => {
				list();
			},
			onError: (error) => {
				console.dir(error);
				alert("Approve Error");
			},
		});
	}  

  return (
    <>
      <Layout>
        {/* <CounterSection className="mb-10" /> */}
        <OverviewSection className="mb-10" currentNft={currentNft} approveAll={approveAll} setPrice={setPrice} price={price} />
        {/* <AllBidsSection allBids={allBids} className="mb-10" />
        <UpdateTable className="mb-10" /> */}
      </Layout>
    </>
  );
}
