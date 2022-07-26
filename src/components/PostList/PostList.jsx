/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React from "react";
import Layout from "../Partials/Layout";
import PostTable from "../Partials/PostTable";

export default function PostList({ className }) {
  const [blogContents, setBlogContents] = React.useState([]);
  const [noticeContents, setNoticeContents] = React.useState([]);
	const limit = 5;

const init = () => {
		axios
			.get(
				`${
					process.env.REACT_APP_BASE_URL
				}/api/blog/list-notice?offset=${
					1 * limit
				}&limit=${limit}`
			)
			.then((res: any) => {
				setNoticeContents(res.data.data.contents);
			});

      axios
			.get(
				`${
					process.env.REACT_APP_BASE_URL
				}/api/blog/list?offset=${
					1 * limit
				}&limit=${limit}&isPopular=${true}`
			)
			.then((res: any) => {
				setBlogContents(res.data.data.contents);
			});
	};

  React.useEffect(() => {
		init();
	}, []);


  return (
	<Layout>
    <div
      className={`update-table w-full p-8 bg-white overflow-hidden rounded-2xl section-shadow ${
        className || ""
      }`}
    >
      <PostTable datas={noticeContents} numberOfdatas={5} title="공지사항"/>
      <PostTable datas={blogContents} numberOfdatas={5} title="인기게시글"/>
    </div>
	</Layout>
  );
}
