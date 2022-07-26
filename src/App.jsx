import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import Toaster from "./components/Helpers/Toaster";
import Routers from "./Routers";

function App() {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
  useMoralis();


useEffect(() => {
  if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [isAuthenticated, isWeb3Enabled]);

  return (
    <>
      <Routers />
      <Toaster />
    </>
  );
}

export default App;
