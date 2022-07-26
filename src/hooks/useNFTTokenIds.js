import { useEffect, useState } from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import { useIPFS } from "./useIPFS";

export const useNFTTokenIds = (addr) => {
	const { token } = useMoralisWeb3Api();
	const { chainId } = useMoralisDapp();
	const { resolveLink } = useIPFS();
	const [NFTTokenIds, setNFTTokenIds] = useState([]);
	const [totalNFTs, setTotalNFTs] = useState();
	const [fetchSuccess, setFetchSuccess] = useState(true);
	const {
		fetch: getNFTTokenIds,
		data,
		error,
		isLoading,
	} = useMoralisWeb3ApiCall(token.getAllTokenIds, {
		chain: chainId,
		address: addr,
		limit: 100,
	});

	const loaded = async () => {
		if (data?.result) {
			const NFTs = data.result;
			setTotalNFTs(data.total);
			setFetchSuccess(true);
			for (const NFT of NFTs) {
				if (NFT?.metadata) {
					console.log(NFT);
					NFT.metadata = JSON.parse(NFT.metadata);
					NFT.image = resolveLink(NFT.metadata?.image);
				} else if (NFT?.token_uri) {
					try {
						await fetch(NFT.token_uri)
							.then((response) => response.json())
							.then((data) => {
								NFT.image = resolveLink(data.image);
							});
					} catch (error) {
						setFetchSuccess(false);
					}
				}
			}
			setNFTTokenIds(NFTs);
		}
	};

	useEffect(() => {
		loaded();
	}, [data, loaded]);

	return {
		getNFTTokenIds,
		NFTTokenIds,
		totalNFTs,
		fetchSuccess,
		error,
		isLoading,
	};
};
