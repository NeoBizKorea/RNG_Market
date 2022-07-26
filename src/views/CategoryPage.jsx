/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect } from "react";
import Layout from "../components/Partials/Layout";

export default function CategoryPage() {
	const [categories, setCategories] = React.useState([]);

	const handleGetCategory = () => {
		const url = `${process.env.REACT_APP_BASE_URL}/api/blogCategory/list`;
		axios.get(url).then((res: any) => {
			res.data.data.categoryList.unshift({
				id: -1,
				name: "All",
			});
			setCategories(res.data.data.categoryList);
		});
	};

	useEffect(() => {
		handleGetCategory();
	}, [])

	return (
    <Layout>
		<div className="nc-PageSingle pt-8 lg:pt-16 ">
		<header className="container rounded-xl">
				<div className="max-w-screen-md mx-auto space-y-5">
					<h1
						className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl max-w-4xl "
						title="Quiet ingenuity: 120,000 lunches and counting">
						카테고리
					</h1>

					<div className="w-full border-b border-neutral-100" />
				</div>
			</header>
			<div className="max-w-screen-md mx-auto space-y-5">
				{categories.map((category: any) => (
						<div key={category.id} className="flex flex-col">
							<a href={`/blog?id=${category.id}`}>{category.name}</a>
						</div>
					))
				}
			</div>
		</div>
    </Layout>
	);
}
