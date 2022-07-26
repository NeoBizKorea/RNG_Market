/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import Cookie from "universal-cookie";
import profile from "../../assets/images/profile-info-profile.png";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeLoginStatus, selectCurrentLoginStatus } from "../../store/loginStatus/loginStatus";
import Layout from "../Partials/Layout";
import PersonalInfoTab from "./Tabs/PersonalInfoTab";

export default function Settings() {
  const [profileImg, setProfileImg] = useState(profile);
  const [file, setFile] = useState();
	const [nickName, setNickName] = useState("");
	const [description, setDescription] = useState("");
	const [profilePhoto, setProfilePhoto] = useState("");
  const { isAuthenticated, logout } = useMoralis();
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

  const openFile = (inputFile) => {
		const input = inputFile.target;

		const reader = new FileReader();
		reader.onload = function () {
			const dataURL = reader.result;
			setProfilePhoto(dataURL);
		};
		setFile(input.files[0]);
		reader.readAsDataURL(input.files[0]);
	};

  const fileUpload = async (files) => {
    const cookie = new Cookie();

    try {
      const formData = new FormData();
      formData.append("file", files);
      const response: any = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/file/upload`,
        formData,
        {
          headers: { Authorization: `Bearer ${cookie.get("token")}` },
        }
      );
      return response.data.data.fileLink;
    } catch (e) {
      console.dir(e);
      throw e;
    }
  };

  const handleSubmit = async () => {
		if (!nickName) {
			alert("Please enter a nickname");
			return;
		}
		const cookie = new Cookie();
		const token = cookie.get("token");

		try {
			
			let newProfilePhoto = ""
			if(file) {
				newProfilePhoto = await fileUpload(file);
			} else{
				newProfilePhoto = profilePhoto;
			}
			await axios.post(
				`${process.env.REACT_APP_BASE_URL}/api/user/update`,
				{
					userName: nickName,
					description,
					filePath: newProfilePhoto,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			navigate("/profile");
		} catch (e) {
			console.log(e);
			alert("Something went wrong");
			cookie.remove("token");
			dispatch(changeLoginStatus({ state: false }));
			dispatch(changeLoginStatus({ admin: false }));
			if (isAuthenticated) {
				logout();
			}
			navigate("/login");
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
	}, [currentLoginStatus.status]);

  return (
    <>
      <Layout>
        <div className="settings-wrapper w-full relative mb-10">
          <div className="main-wrapper w-full">
            {/* heading */}
            <div className="heading w-full mb-6">
              <h1 className="text-26 font-bold text-dark-gray antialiased">
                정보 수정
              </h1>
            </div>
            <div className="content-container w-full pt-10 rounded-2xl bg-white">
              <div className="content-heading w-full mb-8 lg:px-10 px-4">
                <h1 className="text-xl font-bold text-dark-gray antialiased">
                  정보 수정
                </h1>
              </div>
              <div className="content-body w-full lg:flex lg:px-10 px-4">
                <div className="content-body-items flex-1">
                <div className="tab-item">
                      <PersonalInfoTab
                        profileImg={profileImg}
                        profileImgInput={profileImg}
                        profileImgChangHandler={setProfileImg}
                        nickName={nickName}
                        setNickName={setNickName}
                        description={description}
                        setDescription={setDescription}
                        profileImage={file}
                        setProfileImage={openFile}
                        imgPreview={profilePhoto}
                        handleSubmit={handleSubmit}
                      />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
