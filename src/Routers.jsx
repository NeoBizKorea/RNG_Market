import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Cookie from "universal-cookie";
import FourZeroFour from "./components/FourZeroFour";
import ScrollToTop from "./components/Helpers/ScrollToTop";
import MyCollection from "./components/MyCollection";
import Notification from "./components/Notification";
import { useAppDispatch } from "./store/hooks";
import { changeLoginStatus } from "./store/loginStatus/loginStatus";
import AcitveBidsPage from "./views/AcitveBidsPage";
import AuthProfilePage from "./views/AuthProfilePage";
import BlogPage from "./views/BlogPage";
import BlogSingle from "./views/BlogSingle";
import CategoryPage from "./views/CategoryPage";
import CollectionItemPage from "./views/CollectionItemPage";
import ForgotPasswordPages from "./views/ForgotPasswordPages";
import HistoryPage from "./views/HistoryPage";
import LoginPage from "./views/LoginPage";
import MarketPlacePage from "./views/MarketPlacePage";
import MyWalletPage from "./views/MyWalletPage";
import PostCreate from "./views/PostCreate";
import PostListPage from "./views/PostListPage";
import SavedPage from "./views/SavedPage";
import SellPage from "./views/SellPage";
import SettingsPage from "./views/SettingsPage";
import ShopDetailsPage from "./views/ShopDetailsPage";
import SignupPage from "./views/SignupPage";
import UpdatePasswordPages from "./views/UpdatePasswordPages";
import UploadProductPage from "./views/UploadProductPage";
import UserProfilePage from "./views/UserProfilePage";
import VerifyYouPages from "./views/VerifyYouPages";

export default function Routers() {
  const dispatch = useAppDispatch();
  useEffect(() => {
		const cookie = new Cookie();
		const token = cookie.get("token");
		if (token) {
			dispatch(changeLoginStatus({ state: true }));
		} else {
			dispatch(changeLoginStatus({ state: false }));
		}
	}, [dispatch]);

  return (
    <ScrollToTop>
      <Routes>
        {/* guest routes */}
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route
          exact
          path="/forgot-password"
          element={<ForgotPasswordPages />}
        />
        <Route
          exact
          path="/update-password"
          element={<UpdatePasswordPages />}
        />
        <Route exact path="/verify-you" element={<VerifyYouPages />} />

        {/* private route */}
          {/* <Route exact path="/" element={<HomePages />} /> */}
          <Route exact path="/" element={<PostListPage />} />
          <Route exact path="/active-bids" element={<AcitveBidsPage />} />
          <Route exact path="/notification" element={<Notification />} />
          <Route exact path="/market-place" element={<MarketPlacePage />} />
          <Route exact path="/shop-details" element={<ShopDetailsPage />} />
          <Route exact path="/my-wallet" element={<MyWalletPage />} />
          <Route exact path="/my-collection" element={<MyCollection />} />
          <Route
            exact
            path="/my-collection/collection-item"
            element={<CollectionItemPage />}
          />
          <Route exact path="/sell" element={<SellPage />} />
          <Route exact path="/saved" element={<SavedPage />} />
          <Route exact path="/notice" element={<HistoryPage />} />
          <Route exact path="/posts" element={<PostListPage />} />
          <Route exact path="/blog" element={<BlogPage />} />
          <Route exact path="/blog-single" element={<BlogSingle />} />f
          <Route exact path="/category" element={<CategoryPage />} />f
          <Route exact path="/post-create" element={<PostCreate />} />
          <Route exact path="/upload-product" element={<UploadProductPage />} />
          <Route exact path="/profile" element={<AuthProfilePage />} />
          <Route exact path="/user-profile" element={<UserProfilePage />} />
          <Route exact path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<FourZeroFour />} />
      </Routes>
    </ScrollToTop>
  );
}
