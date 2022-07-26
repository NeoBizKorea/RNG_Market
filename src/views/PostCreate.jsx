import axios from "axios";
import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Layout from "../components/Partials/Layout";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import ButtonSecondary from "../shared/Button/ButtonSecondary";
import { useAppSelector } from "../store/hooks";
import { selectCurrentLoginStatus } from "../store/loginStatus/loginStatus";

const PostCreate = () => {
	const [title, setTitle] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [annonymousId, setAnnonymousId] = React.useState("");
	const [annonymousPW, setAnnonymousPW] = React.useState("");
	const [categories, setCategories] = React.useState([]);
	const [currentCategory, setCurrentCategory] = React.useState({
		id: -1,
		name: "All",
	});
	const [content, setContent] = React.useState("");
	const [noticeChecked, setNoticeChecked] = React.useState(false);
	const [uploading, setUploading] = React.useState(false);
	const [file, setFile] = React.useState(null);
	const [fileName, setFileName] = React.useState("");
	const navigate = useNavigate();
	const currentLoginStatus = useAppSelector(selectCurrentLoginStatus);

	const handleGetCategory = () => {
		const url = `${process.env.REACT_APP_BASE_URL}/api/blogCategory/list`;
		axios.get(url).then((res) => {
			setCategories([...res.data.data.categoryList]);
			setCurrentCategory(res.data.data.categoryList[0]);
		});
	};
	
	useEffect(() => {
		handleGetCategory();
	}, [currentLoginStatus.state, navigate]);

	const fileUpload = async (file) => {
		const cookie = new Cookies();
		try {
			const formData = new FormData();
			formData.append("file", file);
			const response = await axios.post(
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
		if (noticeChecked) {
			if(currentLoginStatus.state === false) {
				alert("로그인이 필요합니다.");
				navigate("/login");
			} else {
				uploadNotice();
			}
		} else {
			uploadPost();
		}
	};

	const uploadFile = async (file) => {
		if (file) {
			setUploading(true);
			const fileLink = await fileUpload(file);
			setUploading(false);
			return fileLink;
		}
	};

	const uploadPost = async () => {
		if (!title == null || title === "") {
			alert("Title is required");
			return;
		}
		if (!content == null || content === "") {
			alert("Content is required");
			return;
		}

		if (!currentCategory == null || !currentCategory.id) {
			alert("Category is required");
			return;
		}

		const cookies = new Cookies();
		const token = cookies.get("token");

		let fileLink = null;
		if (file) {
			fileLink = await uploadFile(file);
		}

		const data = {
			title,
			description,
			content,
			fileLink,
			categoryId: currentCategory.id,
			annonymousId,
			annonymousPW
		};

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/api/blog/create`,
				data,
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			if (response.status === 200) {
				const id = response.data.data;
				navigate(`/blog-single?id=${id}`);
			}
		} catch (e) {
			if (e.response.status === 500) {
				alert("Server error");
				return;
			}
			if (e.response.status === 401) {
				alert("You must login to like this blog");
				return;
			}
			console.dir(e);
			alert("Unknown error");
		}
	};

	const handleSelectCategory = (id) => {
		setCurrentCategory(categories.find((item) => item.id == id));
	};

	const uploadNotice = async () => {
		if (!title == null || title === "") {
			alert("Title is required");
			return;
		}
		if (!content == null || content === "") {
			alert("Content is required");
			return;
		}

		const cookies = new Cookies();
		const token = cookies.get("token");

		let fileLink = null;
		if (file) {
			fileLink = await uploadFile(file);
		}

		const data = {
			title,
			description,
			content,
			fileLink,
		};

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/api/blog/create-notice`,
				data,
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			if (response.status === 200) {
				const id = response.data.data;
				navigate(`/blog-single?id=${id}`);
			}
		} catch (e) {
			if (e.response.status === 500) {
				alert("Server error");
				return;
			}
			if (e.response.status === 401) {
				alert("You must login to like this blog");
				return;
			}

			if (e.response.status === 400) {
				alert("Not Authorized");
				return;
			}
			console.dir(e);
			alert("Unknown error");
		}
	};

	const modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[
				{ list: "ordered" },
				{ list: "bullet" },
				{ indent: "-1" },
				{ indent: "+1" },
			],
			["link"],
			[{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
			["clean"],
		],
	};

	const formats = [
		// 'font',
		"header",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"indent",
		"link",
		"image",
		"align",
		"color",
		"background",
	];

	const onChange = (value) => {
		setContent(value);
	};

	const renderFileName = () => {
		if (fileName === "") {
			return "";
		}
		if (fileName.length > 10) {
			const fileNm = `${fileName.substring(0, 10)}...`;
			return fileNm;
		}
		return fileName;
	};

	const renderHeader = () => (
		<header className="container rounded-xl">
			<div className="max-w-screen-md mx-auto space-y-5">
				<select
					className="border-zinc-900 border-2 pl-10 bg-transparent w-full h-12 px-2 py-1 text-neutral-500 dark:text-neutral-400"
					onChange={(e) => handleSelectCategory(e.target.value)}>
					{categories.map((category) => (
						<option
							selected={currentCategory.id === category.id}
							key={category.id}
							value={category.id}>
							<span>{category.name}</span>
						</option>
					))}
				</select>
				<input
					className="block bg-inherit rounded w-full border-zinc-900 border-2 text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl"
					type="text"
					placeholder="Title"
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					className="block resize-none bg-inherit rounded w-full border-zinc-900 border-2 text-neutral-500 md:text-lg dark:text-neutral-400 pb-1"
					placeholder="Description"
					onChange={(e) => setDescription(e.target.value)}
				/>
				{currentLoginStatus.state ? null : (
					<div className="flex justify-between">
					<input type="text" value={annonymousId} onChange={(e) => setAnnonymousId(e.target.value)} placeholder="아이디" className="block bg-inherit rounded w-full border-zinc-900 border-2 text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl" />
					<input type="text" value={annonymousPW} onChange={(e) => setAnnonymousPW(e.target.value)} placeholder="비밀번호" className="block bg-inherit rounded w-full border-zinc-900 border-2 text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl" />
					</div>
				)}
				<div className="w-full border-b border-zinc-900 dark:border-neutral-800" />
			</div>
		</header>
	);

	const renderContent = () => (
		<div
			id="single-entry-content"
			className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-invert">
			<ReactQuill
				style={{ height: "600px" }}
				theme="snow"
				modules={modules}
				formats={formats}
				value={content}
				onChange={(_, __, ___, editor) => {
					setContent(editor.getHTML())
				}}
			/>
		</div>
	);

	return (
		<Layout>
		<div className="nc-PageSingle pt-8 lg:pt-16 ">
			{renderHeader()}

			<div className="nc-SingleContent container space-y-10 items-center">
				{renderContent()}
				<div className="flex justify-between items-center max-w-screen-md py-5 mx-auto border-b border-t border-zinc-900 dark:border-neutral-700">
					<label className={currentLoginStatus.admin ? "" : "opacity-0"}>
						<input
							className="mr-5"
							type="checkbox"
							name="notice"
							checked={noticeChecked}
							onChange={(e) => setNoticeChecked(e.target.checked)}
						/>
						Upload as Notice
					</label>
					<div>
						<span className="mr-3">{renderFileName()}</span>
						<ButtonSecondary sizeClass="relative px-4 py-2 sm:px-5 mr-3">
							File Upload
							<input
								className="absolute top-0 right-0 mt-2 mr-2 w-full h-full opacity-0"
								type="file"
								onChange={(e) => {
									if (e.target.files && e.target.files.length > 0) {
										setFile(e.target.files[0]);
										setFileName(e.target.files[0].name);
									}
								}}
							/>
						</ButtonSecondary>
						<ButtonPrimary
							sizeClass="px-4 py-2 sm:px-5 mr-3"
							onClick={uploading ? () => {} : handleSubmit}>
							Submit
						</ButtonPrimary>
						<Link to="/">
							<ButtonSecondary sizeClass="px-4 py-2 sm:px-5">
								Cancel
							</ButtonSecondary>
						</Link>
					</div>
				</div>
			</div>
		</div>
		</Layout>
	);
};

export default PostCreate;
