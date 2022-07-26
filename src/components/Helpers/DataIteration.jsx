import React from "react";

function DataIteration(props) {
  const { datas, startLength, endLength, children, NFTBalance } = props;
  return (
    <>
      {NFTBalance &&
        NFTBalance.length >= endLength &&
        NFTBalance
          .slice(startLength, endLength)
          .map((value) => children({ datas: value }))}
    </>
  );
}

export default DataIteration;
