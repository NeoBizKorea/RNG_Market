/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "universal-cookie";
import profileBanner from "../../../assets/images/profile-cover.png";
import products from "../../../data/product_data.json";
import { useMoralisDapp } from "../../../providers/MoralisDappProvider/MoralisDappProvider";
import Layout from "../../Partials/Layout";
import OwnTab from "./OwnTab";

import { useNFTBalance } from "../../../hooks/useNFTBalance";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { changeLoginStatus, selectCurrentLoginStatus } from "../../../store/loginStatus/loginStatus";




export default function AuthProfile() {
  const ownProducts = products.datas;
  const [email, setEmail] = useState("");
	const [nickName, setNickName] = useState("");
	const [description, setDescription] = useState("");
	const [profilePhoto, setProfilePhoto] = useState("");
	const { NFTBalance, fetchSuccess } = useNFTBalance();
	const { chainId, marketAddress, contractABI } = useMoralisDapp();
	const { Moralis, isAuthenticated, logout } = useMoralis();
	const [visible, setVisibility] = useState(false);
	const [nftToSend, setNftToSend] = useState(null);
	const [price, setPrice] = useState(1);
	const [loading, setLoading] = useState(false);
	const contractProcessor = useWeb3ExecuteFunction();
	const contractABIJson = JSON.parse(contractABI);
	const listItemFunction = "createMarketItem";
	const ItemImage = Moralis.Object.extend("ItemImages");
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const currentLoginStatus = useAppSelector(selectCurrentLoginStatus);

  const handleGetUserInfo = async () => {
		const cookie = new Cookie();
		const token = cookie.get("token");

		if (!token) {
			navigate("/");
		}
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/api/user/jwt-verify`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const userInfo = response.data.data;
			setEmail(userInfo.email);
			setNickName(userInfo.nickName);
			if (userInfo.description) {
				setDescription(userInfo.description);
			} else {
				setDescription("no description");
			}
			if (userInfo.profilePhoto) {
				setProfilePhoto(userInfo.profilePhoto);
			} else {
				setProfilePhoto(
					"http://www.clker.com/cliparts/3/c/9/0/15346636991003506792default_user.med.png"
				);
			}
		} catch (e) {
			console.log(e);
			cookie.remove("token");
			dispatch(changeLoginStatus({ state: false }));
			dispatch(changeLoginStatus({ admin: false }));
			if (isAuthenticated) {
				logout();
			}
			navigate("/");
		}
	};

	useEffect(() => {
    const cookie = new Cookie();
    const token = cookie.get("token");
		if (!token) {
			alert("You must be logged in to create a post");
			navigate("/");
		} else {
			handleGetUserInfo();
		}
	}, [currentLoginStatus.state, handleGetUserInfo, navigate]);

	useEffect(() => {
		console.log(NFTBalance);
	}, [fetchSuccess, NFTBalance, fetchSuccess]);

  return (
    <>
      <Layout>
        <div className="nft-authprofile-wrapper w-full">
          <div className="main-wrapper w-full">
            <div className="content-wrapper-profile-only w-full mb-6">
              <div className="auth-cover w-full">
                <div className="w-full lg:h-[312px] h-[212px] rounded-2xl overflow-hidden">
                  <img
                    src={profileBanner}
                    alt="banner"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="auth lg:flex justify-between items-center mb-16">
                <div className="auth-user-details sm:px-10 px-0 mb-5 lg:mb-0 relative">
                  {/* profile picture */}
                  <div className=" profile-picture sm:block flex justify-center items-center mb-4">
                    <img
                      src={profilePhoto}
                      alt=""
                      className="md:w-[205px] md:h-[205px] w-[130px] h-[130px] object-cover rounded-full overflow-hidden border-[6px] border-white"
                    />
                  </div>
                  <div className="auth-user-profile-content">
                    <div className="mb-4">
                      <h1 className="text-dark-gray tracking-wide sm:text-26 text-xl font-bold">
                        {nickName}
                      </h1>
                    </div>
                    <div className="sm:w-[437px] w-full mb-4">
                      <p className="text-thin-light-gray sm:text-base  text-sm tracking-wide leading-2">
                        {description}
                      </p>
                    </div>
                    <div className="flex text-thin-light-gray sm:text-xl text-sm">
                      <p className="border-r pr-5  border-thin-light-gray">
                        <span className="font-bold mr-1 text-dark-gray">
                          49
                        </span>
                        좋아요
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-5 ml-0 sm:ml-10 lg:ml-0">
                  <Link
                    to="/settings"
                    className="text-white btn-shine text-base rounded-full tracking-wide bg-purple px-4 py-2.5 flex justify-center items-center"
                  >
                    <span>프로필 수정</span>
                  </Link>
                  <button type="button" className="bg-white rounded-full p-4">
                    <svg
                      width="23"
                      height="22"
                      viewBox="0 0 23 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.4922 5.51801C12.4922 5.43549 12.4922 5.37668 12.4922 5.31786C12.4908 3.80698 12.4894 2.2961 12.4881 0.784769C12.4876 0.460163 12.6709 0.18525 12.97 0.0626106C13.2823 -0.0654996 13.6374 0.00562209 13.8708 0.251813C14.1079 0.50165 14.3391 0.756959 14.5725 1.00999C16.9742 3.6114 19.3723 6.216 21.7827 8.80921C22.0863 9.13564 22.0863 9.7347 21.7863 10.0579C19.1471 12.9024 16.5188 15.7568 13.8868 18.608C13.6356 18.8802 13.3069 18.9586 12.9864 18.8264C12.6668 18.6947 12.4899 18.4006 12.4899 18.0404C12.4899 16.5204 12.4844 15 12.4803 13.48C12.4803 13.449 12.4735 13.418 12.4676 13.3706C12.4092 13.3706 12.3559 13.3697 12.3021 13.3706C9.96553 13.4216 7.82231 14.1082 5.8537 15.3506C4.32002 16.3185 3.04895 17.5544 2.11206 19.1177C1.60053 19.9712 1.23261 20.8826 1.02517 21.8573C1.01788 21.8915 1.00602 21.9248 0.984596 22C0.896606 21.7821 0.818646 21.6024 0.750715 21.4196C0.0700445 19.5905 -0.16338 17.7081 0.114724 15.7728C0.385533 13.8885 1.11088 12.1857 2.25521 10.6707C4.17459 8.12899 6.70944 6.52693 9.80642 5.8107C10.6271 5.62104 11.4623 5.52804 12.3053 5.51846C12.3591 5.51755 12.4133 5.51801 12.4922 5.51801Z"
                        fill="#374557"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="auth-tab-content relative mb-10">
                <div className="lg:flex justify-between">
                  <div style={{ transform: "translateY(-22px)" }}>
                    <Link
                      to="/upload-product"
                      className="btn-gradient lg:flex hidden w-[153px] h-[46px] rounded-full text-white justify-center items-center"
                    >
                      NFT 업로드
                    </Link>
                  </div>
                </div>
                <div className="hidden lg:block w-full h-[1px] bg-[#DCD5FE] absolute top-[42px] left-0" />
              </div>
            </div>

            <div className="tab-cotainer w-full mb-10">
            <OwnTab products={ownProducts} NFTBalance={NFTBalance}/>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
