/* eslint-disable react-hooks/exhaustive-deps */
import {
	FileSearchOutlined,
	RightCircleOutlined,
	ShoppingCartOutlined
} from "@ant-design/icons";
import { Alert, Badge, Card, Image, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisQuery, useWeb3ExecuteFunction } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { getCollectionsByChain } from "../../helpers/collections";
import { getNativeByChain } from "../../helpers/networks";
import { useNFTTokenIds } from "../../hooks/useNFTTokenIds";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";

const { Meta } = Card;

export default function MainSection({ className, marketPlaceProduct, setNftToSell, inputValue, setInputValue }) {
  const fallbackImg =
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg==";
  
    const styles = {
      NFTs: {
        display: "flex",
        flexWrap: "wrap",
        WebkitBoxPack: "start",
        justifyContent: "flex-start",
        margin: "0 auto",
        maxWidth: "1000px",
        gap: "10px",
      },
      banner: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: "0 auto",
        width: "600px",
        // borderRadius: "10px",
        height: "150px",
        marginBottom: "40px",
        paddingBottom: "20px",
        borderBottom: "solid 1px #e3e3e3",
      },
      logo: {
        height: "115px",
        width: "115px",
        borderRadius: "50%",
        // positon: "relative",
        // marginTop: "-80px",
        border: "solid 4px white",
      },
      text: {
        color: "#041836",
        fontSize: "27px",
        fontWeight: "bold",
      },
    };
  
    const { NFTTokenIds, totalNFTs, fetchSuccess } = useNFTTokenIds(inputValue);
  const navigate = useNavigate();
  const [visible, setVisibility] = useState(false);
  const [nftToBuy, setNftToBuy] = useState(null);
  const [loading, setLoading] = useState(false);
  const contractProcessor = useWeb3ExecuteFunction();
  const { chainId, marketAddress, contractABI, walletAddress } =
    useMoralisDapp();
  const nativeName = getNativeByChain(chainId);
  const contractABIJson = JSON.parse(contractABI);
  const { Moralis } = useMoralis();
	// const [NFTCollections, setNFTCollections] = useState([]);
	const queryMarketItems = useMoralisQuery("MarketItems");
	const fetchMarketItems = JSON.parse(
		JSON.stringify(queryMarketItems.data, [
			"objectId",
			"createdAt",
			"price",
			"nftContract",
			"itemId",
			"sold",
			"tokenId",
			"seller",
			"owner",
			"confirmed",
		])
	);
	const purchaseItemFunction = "createMarketSale";
	const NFTCollections = getCollectionsByChain(chainId);

  useEffect(() => {
    console.log(chainId)
  }, [NFTTokenIds])

  const getMarketItem = (nft) => {
    const result = fetchMarketItems.find(
      (e) =>
        e.nftContract === nft?.token_address &&
        e.tokenId === nft?.token_id &&
        e.sold === false &&
        e.confirmed === true
    );

    return result;
  };

  function succPurchase() {
    alert("You have purchased this NFT")
  }

  function failPurchase() {
    alert("There was a problem when purchasing this NFT")
  }

  async function updateSoldMarketItem() {
    const id = getMarketItem(nftToBuy).objectId;
    const marketList = Moralis.Object.extend("MarketItems");
    const query = new Moralis.Query(marketList);

    console.group("updateSoldMarketItem");
    console.log("id : " , id);
    console.log("marketList : " , marketList);
    console.log("query : " , query);
    console.groupEnd();

    await query.get(id).then((obj) => {
      obj.set("sold", true);
      obj.set("owner", walletAddress);
      obj.save();
    });
  }

  async function purchase() {
    setLoading(true);
    const tokenDetails = getMarketItem(nftToBuy);
    const itemID = tokenDetails.itemId;
    const tokenPrice = tokenDetails.price;
    const ops = {
      contractAddress: marketAddress,
      functionName: purchaseItemFunction,
      abi: contractABIJson,
      params: {
        nftContract: nftToBuy.token_address,
        itemId: itemID
      },
      msgValue: tokenPrice
    };

    console.group("purchase");
    console.log("tokenDetails : " , tokenDetails);
    console.log("itemID : " , itemID);
    console.log("tokenPrice : " , tokenPrice);
    console.log("ops : " , ops);
    console.groupEnd();

    await contractProcessor.fetch({
      params: ops,
      onSuccess: () => {
        console.log("success");
        setLoading(false);
        setVisibility(false);
        updateSoldMarketItem();
        succPurchase();
      },
      onError: (error) => {
        setLoading(false);
        failPurchase();
      }
    });
  }

  const handleBuyClick = (nft) => {
    setNftToBuy(nft);
	if(getMarketItem(nftToBuy)) {
		const isConfirm = confirm("Are you sure you want to purchase this NFT?");
		if(isConfirm) {
			purchase()
		}
	} else {
		alert("This NFT is not for sale")
	}
  };

  return (
    <>
			<div>
				{contractABIJson.noContractDeployed && (
					<>
						<Alert
							message="No Smart Contract Details Provided. Please deploy smart contract and provide address + ABI in the MoralisDappProvider.js file"
							type="error"
						/>
						<div style={{ marginBottom: "10px" }} />
					</>
				)}
				{inputValue !== "explore" && totalNFTs !== undefined && (
					<>
						{!fetchSuccess && (
							<>
								<Alert
									message="Unable to fetch all NFT metadata... We are searching for a solution, please try again later!"
									type="warning"
								/>
								<div style={{ marginBottom: "10px" }} />
							</>
						)}
						<div style={styles.banner}>
							<Image
								preview={false}
								src={NFTTokenIds[0]?.image || "error"}
								fallback={fallbackImg}
								alt=""
								style={styles.logo}
							/>
							<div style={styles.text}>
								<>
									<div>{`${NFTTokenIds[0]?.name}`}</div>
									<div
										style={{
											fontSize: "15px",
											color: "#9c9c9c",
											fontWeight: "normal",
										}}>
										Collection Size: {`${totalNFTs}`}
									</div>
								</>
							</div>
						</div>
					</>
				)}

				<div style={styles.NFTs}>
					{inputValue === "explore" &&
						NFTCollections?.map((nft, index) => (
							<Card
								hoverable
								actions={[
									<Tooltip title="View Collection">
										<RightCircleOutlined
											onClick={() => setInputValue(nft?.addrs)}
										/>
									</Tooltip>,
								]}
								style={{ width: 240, border: "2px solid #e7eaf3" }}
								cover={
									<Image
										preview={false}
										src={nft?.image || "error"}
										fallback={fallbackImg}
										alt=""
										style={{ height: "240px" }}
									/>
								}
								key={index}>
								<Meta title={nft.name} />
							</Card>
						))}

					{inputValue !== "explore" &&
						NFTTokenIds.slice(0, 20).map((nft, index) => (
							<Card
								hoverable
								actions={[
									<Tooltip title="View On Blockexplorer">
										<FileSearchOutlined
											onClick={() =>
												window.open(
													`${getExplorer(chainId)}address/${nft.token_address}`,
													"_blank"
												)
											}
										/>
									</Tooltip>,
									<Tooltip title="Buy NFT">
										<ShoppingCartOutlined onClick={() => handleBuyClick(nft)} />
									</Tooltip>,
								]}
								style={{ width: 240, border: "2px solid #e7eaf3" }}
								cover={
									<Image
										preview={false}
										src={nft.image || "error"}
										fallback={fallbackImg}
										alt=""
										style={{ height: "240px" }}
									/>
								}
								key={index}>
								{getMarketItem(nft) && (
									<Badge.Ribbon text="Buy Now" color="green" />
								)}
								<Meta title={nft.name} description={`#${nft.token_id}`} />
							</Card>
						))}
				</div>
			</div>
		</>
  );
}
