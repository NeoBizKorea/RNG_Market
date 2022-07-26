/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React from "react";
import NoticeTable from "../Partials/NoticeTable";

export default function TableNotice({ className }) {
  const [contents, setContents] = React.useState([]);
	const [total, setTotal] = React.useState(0);
	const [page, setPage] = React.useState(0);
	const limit = 10;

const init = () => {
		axios
			.get(
				`${
					process.env.REACT_APP_BASE_URL
				}/api/blog/list-notice?isASC=${false}&offset=${
					page * limit
				}&limit=${limit}`
			)
			.then((res: any) => {
				setContents(res.data.data.contents);
				setTotal(res.data.data.total);
			});
	};

  React.useEffect(() => {
		init();
	}, []);

	React.useEffect(() => {
		init();
	}, [page]);

	React.useEffect(() => {}, [contents]);

  const datas = [
    {
      title: "test blog title",
      userName: "testUser",
      createdAt: "2020-01-01",
      views: "100",
      likes: "100",
    },
    {
      title: "test blog title",
      userName: "testUser",
      createdAt: "2020-01-01",
      views: "100",
      likes: "100",
    },
    {
      title: "test blog title",
      userName: "testUser",
      createdAt: "2020-01-01",
      views: "100",
      likes: "100",
    },
    {
      title: "test blog title",
      userName: "testUser",
      createdAt: "2020-01-01",
      views: "100",
      likes: "100",
    },
    {
      title: "test blog title",
      userName: "testUser",
      createdAt: "2020-01-01",
      views: "100",
      likes: "100",
    },
  ]

  return (
    <div
      className={`update-table w-full p-8 bg-white overflow-hidden rounded-2xl section-shadow min-h-[520px] ${
        className || ""
      }`}
    >
      <NoticeTable datas={contents} numberOfdatas={5}/>
    </div>
  );
}
