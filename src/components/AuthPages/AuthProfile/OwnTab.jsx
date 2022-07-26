import React, { useEffect } from "react";
import ProductCardStyleOne from "../../Cards/ProductCardStyleOne";
import DataIteration from "../../Helpers/DataIteration";
import SearchCom from "../../Helpers/SearchCom";

export default function OwnTab({ className, products, NFTBalance}) {
  useEffect(() => {
    console.log(NFTBalance);
  }, [NFTBalance])
  return (
    <>
      <div className={`onsale-tab-wrapper w-full ${className || ""}`}>
        <div className="main-container w-full">
          <div className="filter-section w-full items-center sm:flex justify-between mb-6">
            {/* filter-search */}
            <div className="sm:w-1/2 w-full sm:pr-20 pr-0 mb-5 sm:mb-0">
              <SearchCom />
            </div>
            {/* filer-dropdown */}
          </div>
          <div className="content-section w-full-width">
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 2xl:gap-8 xl:gap-5 gap-5 mb-10">
              <DataIteration
                datas={NFTBalance}
                startLength={0}
                endLength={NFTBalance.length}
                NFTBalance={NFTBalance}
              >
                {({ datas }) => (
                  <ProductCardStyleOne key={datas.id} datas={datas} NFTBalance={NFTBalance} />
                )}
              </DataIteration>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
