import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Icons from "../Helpers/Icons";

export default function Sidebar({ sidebar, action, logoutModalHandler }) {
  const [openSubMenu, setOpenSubMenu] = React.useState(false);

  useEffect(() => {
    const title = document.querySelectorAll(".menu-setting-items .heading");
    if (sidebar) {
      title.forEach((elm) => {
        elm.classList.add("active");
      });
    } else {
      title.forEach((elm) => {
        elm.classList.remove("active");
      });
    }
  });
  return (
    <div className="w-full h-full">
      {/* logo-area */}
      <div
        className={`w-full flex items-center transition-all duration-300 ease-in-out ${
          sidebar ? "justify-between  mb-14" : "justify-center"
        }`}
      >
        <div className={`sidebar-logo ${sidebar ? "enter" : ""}`}>
          <img src="" alt="nft logo" />
        </div>

        <span onClick={action}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="19"
            viewBox="0 0 25 19"
            fill="none"
          >
            <path
              d="M24.3544 8.45953L16.9855 0.271831C16.8283 0.0982522 16.6089 0 16.3763 0H11.4637C11.1411 0 10.848 0.189955 10.7153 0.484712C10.5843 0.781107 10.6384 1.12663 10.8545 1.36571L17.7306 9.00647L10.8545 16.6456C10.6384 16.8863 10.5827 17.2318 10.7153 17.5266C10.848 17.823 11.1411 18.0129 11.4637 18.0129H16.3763C16.6089 18.0129 16.8283 17.913 16.9855 17.7427L24.3544 9.55505C24.6344 9.24391 24.6344 8.76903 24.3544 8.45953Z"
              fill="url(#paint0_linear_159_67708)"
            />
            <path
              d="M13.7104 8.45953L6.34148 0.271831C6.18427 0.0982522 5.96484 0 5.73231 0H0.819691C0.497095 0 0.203976 0.189955 0.071335 0.484712C-0.0596682 0.781107 -0.00562942 1.12663 0.210526 1.36571L7.08656 9.00647L0.210526 16.6456C-0.00562942 16.8863 -0.0613058 17.2318 0.071335 17.5266C0.203976 17.823 0.497095 18.0129 0.819691 18.0129H5.73231C5.96484 18.0129 6.18427 17.913 6.34148 17.7427L13.7104 9.55505C13.9904 9.24391 13.9904 8.76903 13.7104 8.45953Z"
              fill="url(#paint1_linear_159_67708)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_159_67708"
                x1="10.644"
                y1="0"
                x2="28.9548"
                y2="13.8495"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F539F8" />
                <stop offset="0.416763" stopColor="#C342F9" />
                <stop offset="1" stopColor="#5356FB" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_159_67708"
                x1="0"
                y1="0"
                x2="18.3108"
                y2="13.8495"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F539F8" />
                <stop offset="0.416763" stopColor="#C342F9" />
                <stop offset="1" stopColor="#5356FB" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      </div>
      {/* menu and settings item */}
      <div className="menu-setting-items mb-11">
        {/* menus item */}
        <div
          className={`menu-item transition-all duration-300 ease-in-out ${
            sidebar ? "mb-14" : ""
          }`}
        >
          <div className="heading mb-5">
            <h1 className="title text-xl font-bold text-purple">Menu</h1>
          </div>
          <div className="items">
            <ul className="flex flex-col space-y-6">
              <li className="item group">
                <NavLink
                  className={`nav-item flex items-center ${
                    ((navData) => (navData.isActive ? "active" : ""),
                    sidebar ? "justify-start space-x-3.5" : "justify-center")
                  } `}
                  to="/upload-product"
                >
                  <span className="item-icon group-hover:bg-purple group-hover:text-white w-8 h-8 flex justify-center items-center transition-all duration-300 ease-in-out  bg-light-purple rounded-full text-dark-gray">
                    <Icons name="dashboard" />
                  </span>
                  <span
                    className={`item-content group-hover:text-purple text-[18px] transition-all duration-300 ease-in-out text-lighter-gray relative font-medium ${
                      sidebar ? "active flex-1" : "w-0"
                    }`}
                  >
                    NFT 등록
                  </span>
                </NavLink>
              </li>
              <li className="item group" onClick={() => setOpenSubMenu(!openSubMenu)}>
              <NavLink
                  className={`nav-item flex items-center ${
                    (
                    sidebar ? "justify-start space-x-3.5" : "justify-center")
                  } `}
                  to="#"
                >
                  <span className="item-icon group-hover:bg-purple group-hover:text-white w-8 h-8 flex justify-center items-center transition-all duration-300 ease-in-out  bg-light-purple rounded-full text-dark-gray">
                    <Icons name="market" />
                  </span>
                  <span
                    className={`item-content group-hover:text-purple text-[18px] transition-all duration-300 ease-in-out text-lighter-gray relative font-medium ${
                      sidebar ? "active flex-1" : "w-0"
                    }`}
                  >
                    NFT Shop
                  </span>
                  </NavLink>
                <ul className={openSubMenu ? "flex flex-col space-y-6" : "flex flex-col space-y-6 hidden"}>
                  <li className="item group pl-10">
                    <NavLink
                      className={`nav-item flex items-center ${
                        ((navData) => (navData.isActive ? "active" : ""),
                        sidebar ? "justify-start space-x-3.5" : "justify-center")
                      } `}
                      to="/market-place"
                    >
                      <span className="item-icon group-hover:bg-purple group-hover:text-white w-8 h-8 flex justify-center items-center transition-all duration-300 ease-in-out  bg-light-purple rounded-full text-dark-gray">
                        <Icons name="dashboard" />
                      </span>
                      <span
                        className={`item-content group-hover:text-purple text-[18px] transition-all duration-300 ease-in-out text-lighter-gray relative font-medium ${
                          sidebar ? "active flex-1" : "w-0"
                        }`}
                      >
                        구매
                      </span>
                    </NavLink>
                  </li>
                  <li className="item group pl-10">
                    <NavLink
                      className={`nav-item flex items-center ${
                        ((navData) => (navData.isActive ? "active" : ""),
                        sidebar ? "justify-start space-x-3.5" : "justify-center")
                      } `}
                      to="/profile"
                    >
                      <span className="item-icon group-hover:bg-purple group-hover:text-white w-8 h-8 flex justify-center items-center transition-all duration-300 ease-in-out  bg-light-purple rounded-full text-dark-gray">
                        <Icons name="dashboard" />
                      </span>
                      <span
                        className={`item-content group-hover:text-purple text-[18px] transition-all duration-300 ease-in-out text-lighter-gray relative font-medium ${
                          sidebar ? "active flex-1" : "w-0"
                        }`}
                      >
                        판매
                      </span>
                    </NavLink>
                  </li>
                  <li className="item group pl-10">
                    <NavLink
                      className={`nav-item flex items-center ${
                        ((navData) => (navData.isActive ? "active" : ""),
                        sidebar ? "justify-start space-x-3.5" : "justify-center")
                      } `}
                      to="/"
                    >
                      <span className="item-icon group-hover:bg-purple group-hover:text-white w-8 h-8 flex justify-center items-center transition-all duration-300 ease-in-out  bg-light-purple rounded-full text-dark-gray">
                        <Icons name="dashboard" />
                      </span>
                      <span
                        className={`item-content group-hover:text-purple text-[18px] transition-all duration-300 ease-in-out text-lighter-gray relative font-medium ${
                          sidebar ? "active flex-1" : "w-0"
                        }`}
                      >
                        크리에이터
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="item group">
                <NavLink
                  to="/posts"
                  className={`nav-item flex items-center ${
                    ((navData) => (navData.isActive ? "active" : ""),
                    sidebar ? "justify-start space-x-3.5" : "justify-center")
                  }`}
                >
                  <span className="item-icon group-hover:bg-purple group-hover:text-white w-8 h-8 flex justify-center items-center transition-all duration-300 ease-in-out  bg-light-purple rounded-full text-dark-gray">
                    <Icons name="wallet-two" />
                  </span>
                  <span
                    className={`item-content group-hover:text-purple text-[18px] transition-all duration-300 ease-in-out text-lighter-gray relative font-medium ${
                      sidebar ? "active flex-1" : "w-0"
                    }`}
                  >
                    게시글
                  </span>
                </NavLink>
              </li>
              <li className="item group">
                <NavLink
                  to="/category"
                  className={`nav-item flex items-center ${
                    ((navData) => (navData.isActive ? "active" : ""),
                    sidebar ? "justify-start space-x-3.5" : "justify-center")
                  }`}
                >
                  <span className="item-icon group-hover:bg-purple group-hover:text-white w-8 h-8 flex justify-center items-center transition-all duration-300 ease-in-out  bg-light-purple rounded-full text-dark-gray">
                    <Icons name="shop-card" />
                  </span>
                  <span
                    className={`item-content group-hover:text-purple text-[18px] transition-all duration-300 ease-in-out text-lighter-gray relative font-medium ${
                      sidebar ? "active flex-1" : "w-0"
                    }`}
                  >
                    전체 카테고리
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* signout area */}
    </div>
  );
}
