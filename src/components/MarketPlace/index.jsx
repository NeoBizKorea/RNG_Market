import React, { useState } from "react";
import products from "../../data/marketplace_data.json";
import SalePage from "../../views/SalePage";
import Layout from "../Partials/Layout";
import MainSection from "./MainSection";

export default function MarketPlace() {
  const [inputValue, setInputValue] = useState("explore");
  const marketProduct = products.data;
  const [nftToSell, setNftToSell] = useState(null);
  return (
    <>
      <Layout>
        {/* <CreateNft /> */}
        {nftToSell ?
        (<SalePage item={nftToSell}/>)
      :
      (<MainSection marketPlaceProduct={marketProduct} setNftToSell={setNftToSell} className="mb-10" setInputValue={setInputValue} inputValue={inputValue}/>)}
      </Layout>
    </>
  );
}
