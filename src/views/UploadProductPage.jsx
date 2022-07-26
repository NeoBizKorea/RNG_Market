/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "universal-cookie";
import UploadProduct from "../components/UploadProduct";
import { useAppSelector } from "../store/hooks";
import { selectCurrentLoginStatus } from "../store/loginStatus/loginStatus";

export default function UploadProductPage() {
  const currentLoginStatus = useAppSelector(selectCurrentLoginStatus);
  const navigate = useNavigate();
  useEffect(() => {
    const cookie = new Cookie();
		const token = cookie.get("token");
    if(!token) {
      alert("You must be logged in to upload a product");
      navigate("/");
    }
  }, []);
  
  useEffect(() => {
    if(!currentLoginStatus.state) {
      alert("You must be logged in to upload a product");
      navigate("/");
    }
  }, [currentLoginStatus.state]);
  return <UploadProduct />;
}
