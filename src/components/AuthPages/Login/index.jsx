import axios from "axios";
import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookie from "universal-cookie";
import titleShape from "../../../assets/images/shape/title-shape.svg";
import { useAppDispatch } from "../../../store/hooks";
import { changeLoginStatus } from "../../../store/loginStatus/loginStatus";

import InputCom from "../../Helpers/Inputs/InputCom";
import AuthLayout from "../AuthLayout";

export default function Login() {
  const [checked, setValue] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const rememberMe = () => {
    setValue(!checked);
  };
  // const history = useHistory();

  // email
  const [email, setMail] = useState("");
  const handleEmail = (e) => {
    setMail(e.target.value);
  };
  // password
  const [password, setPassword] = useState("");
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    setLoginLoading(true)
		if (email && password) {
			try {
				const response = await axios.post(
					`${process.env.REACT_APP_BASE_URL}/api/user/verify`,
					{
						userEmail: email,
						password,
					}
				);

				if (response.status === 200) {
					const cookie = new Cookie();
					cookie.set("token", response.data.data.token);
					dispatch(changeLoginStatus({ state: true }));
					if (response.data.data.isAdmin) {
						dispatch(changeLoginStatus({ admin: true }));
					} else {
						dispatch(changeLoginStatus({ admin: false }));
					}
						navigate("/");
				}
        setLoginLoading(false)
			} catch (e) {
        setLoginLoading(false)
        console.dir(e);
				if (e.response.status === 400) {
					if (e.response.data.error_code === "1") {
						alert("Please enter all text fields");
					}
					if (e.response.data.error_code === "2") {
						alert("Login failed");
					}
				}
				if (e.response.status === 500) {
					alert("Server error");
				}
			}
		}
	};

  return (
    <>
      <AuthLayout
        slogan="Welcome to  Nftmax
Admin Panel"
      >
        <div className="content-wrapper w-full  flex justify-center items-center xl:bg-white 2xl:w-[828px] xl:w-[500px] 2xl:h-[818px] xl:h-[600px] rounded-xl 2xl:px-[164px] xl:px-[56px] sm:px-7 px-5 ">
          <div className="w-full">
            <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
              <h1 className="text-5xl font-bold leading-[74px] text-dark-gray">
                Log In
              </h1>
              <div className="shape -mt-5">
                <img src={titleShape} alt="shape" />
              </div>
            </div>
            <div className="input-area">
              <div className="input-item mb-5">
                <InputCom
                  value={email}
                  inputHandler={setMail}
                  placeholder="example@quomodosoft.com"
                  label="Email Address"
                  name="email"
                  type="email"
                  iconName="message"
                />
              </div>
              <div className="input-item mb-5">
                <InputCom
                  value={password}
                  inputHandler={setPassword}
                  placeholder="● ● ● ● ● ●"
                  label="Password"
                  name="password"
                  type="password"
                  iconName="password"
                />
              </div>
              <div className="forgot-password-area flex justify-between items-center mb-7">
                <div className="remember-checkbox flex items-center space-x-2.5">
                  <button
                    onClick={rememberMe}
                    type="button"
                    className="w-5 h-5 text-dark-gray flex justify-center items-center border border-light-gray"
                  >
                    {checked && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  <span
                    onClick={rememberMe}
                    className="text-base text-dark-gray"
                  >
                    Remember Me
                  </span>
                </div>
                <a href="/forgot-password" className="text-base text-purple">
                  Forgot Password
                </a>
              </div>
              <div className="signin-area mb-3.5">
                <div className="flex justify-center">
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className={`btn-login  rounded-[50px] mb-6 text-xl text-white font-bold flex justify-center bg-purple items-center ${
                      loginLoading ? "active" : ""
                    }`}
                  >
                    {loginLoading ? (
                      <div className="signup btn-loader" />
                    ) : (
                      <span>Sign In</span>
                    )}
                  </button>
                </div>
              </div>
              <div className="signup-area flex justify-center">
                <p className="sm:text-lg text-sm text-thin-light-gray font-normal">
                  Dont’t have an aceount ?
                  <a href="/signup" className="ml-2 text-dark-gray">
                    Sign up free
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
