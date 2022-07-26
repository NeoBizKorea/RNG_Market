/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import queryString from "query-string";
import React from "react";
import BlogTable from "../Partials/BlogTable";

export default function TableBlog({ className }) {
	const [contents, setContents] = React.useState([]);
	const [categories, setCategories] = React.useState([]);
	const [currentCategory, setCurrentCategory] = React.useState({
		id: -1,
		name: "All",
	});
	const [total, setTotal] = React.useState(0);
	const [page, setPage] = React.useState(0);
	const limit = 10;

	const getQueryId = () => {
		const query = queryString.parse(window.location.search);
		if (query && query.id) {
			return query.id;
		} 
			return null;
		
	};

  const handleGetCategory = () => {
		const url = `${process.env.REACT_APP_BASE_URL}/api/blogCategory/list`;
		axios.get(url).then((res: any) => {
			res.data.data.categoryList.unshift({
				id: -1,
				name: "All",
			});
			setCategories(res.data.data.categoryList);
			const currentCategoryId = getQueryId();
			if(currentCategoryId) {
				setCurrentCategory(res.data.data.categoryList.find(category => category.id == currentCategoryId));
			}
		});
	};

const init = () => {
  let url = "";
  if (currentCategory.id === -1) {
    url = `${
      process.env.REACT_APP_BASE_URL
    }/api/blog/list?isASC=${false}&offset=${page * limit}&limit=${limit}`;
  } else {
    url = `${
      process.env.REACT_APP_BASE_URL
    }/api/blog/list?isASC=${false}&offset=${
      page * limit
    }&limit=${limit}&categoryId=${currentCategory.id}`;
  }
  axios.get(url).then((res: any) => {
    setContents(res.data.data.contents);
    setTotal(res.data.data.total);
    handleGetCategory();
  });
	};

  React.useEffect(() => {
		init();
	}, []);

	React.useEffect(() => {
		init();
	}, [page, currentCategory]);

	React.useEffect(() => {}, [contents]);

  const handleSelectCategory = (id) => {
		setCurrentCategory(categories.find((item) => item.id == id));
	};

  return (
    <div
      className={`update-table w-full p-8 bg-white overflow-hidden rounded-2xl section-shadow min-h-[520px] ${
        className || ""
      }`}
    >
      <BlogTable datas={contents} numberOfdatas={5} contents={contents}
					total={total}
					limit={limit}
					page={page}
					currentCategory={currentCategory}
					setCurrentCategory={handleSelectCategory}
					categories={categories}
					setPage={setPage}/>
    </div>
  );
}
