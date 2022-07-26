/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import queryString from "query-string";
import React, { useEffect } from "react";
import Cookie from "universal-cookie";
import Layout from "../components/Partials/Layout";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import Textarea from "../shared/Textarea/Textarea";
import Comment from "./Comment";

export default function BlogSingle() {
  const [title, setTitle] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [content, setContent] = React.useState("");
	const [userEmail, setUserEmail] = React.useState("");
	const [blogId, setBlogId] = React.useState("");
	const [thumbnail, setThumbnail] = React.useState("");
	const [comments, setComments] = React.useState([]);
	const [counts, setCounts] = React.useState(0);
	const [likes, setLikes] = React.useState(0);
	const [views, setViews] = React.useState(0);
	const [isLike, setIslike] = React.useState(false);
	const [current, setCurrent] = React.useState(null);

	const [commentText, setCommentText] = React.useState("");

	const init = () => {
		const id = getQueryId();
		if (id) {
			const cookie = new Cookie();
			axios
				.get(`${process.env.REACT_APP_BASE_URL}/api/blog/info?id=${id}`, {
					headers: { Authorization: `Bearer ${cookie.get("token")}` },
				})
				.then((res: any) => {
					setBlogId(res.data.data.id);
					setTitle(res.data.data.title);
					setDescription(res.data.data.description);
					setContent(res.data.data.content);
					setUserEmail(res.data.data.userEmail);
					setViews(res.data.data.views);
					setThumbnail(res.data.data.thumbnail);
					if (res.data.data.isLiked && res.data.data.isLiked === 1) {
						setIslike(true);
					} else {
						setIslike(false);
					}
					getComments(res.data.data.id);
					getLikes(res.data.data.id);
				});
		}
	};

	var getComments = (blogId: any) => {
		axios
			.get(
				`${process.env.REACT_APP_BASE_URL}/api/comment/list?blogId=${blogId}`
			)
			.then((res: any) => {
				const {comments} = res.data.data;
				const {subComments} = res.data.data;

				for (let j = 0; j < comments.length; j++) {
					comments[j].subComments = [];
				}
				for (let i = 0; i < subComments.length; i++) {
					for (let j = 0; j < comments.length; j++) {
						if (subComments[i].cgroup === comments[j].id) {
							comments[j].subComments.push(subComments[i]);
						}
					}
				}

				setComments(res.data.data.comments);
			});
		axios
			.get(
				`${process.env.REACT_APP_BASE_URL}/api/comment/count?blogId=${blogId}`
			)
			.then((res: any) => {
				setCounts(res.data.data);
			});
	};

	var getLikes = (blogId: any) => {
		axios
			.get(`${process.env.REACT_APP_BASE_URL}/api/like/count?blogId=${blogId}`)
			.then((res: any) => {
				setLikes(res.data.data);
			});
	};

	const handleLike = () => {
		const cookie = new Cookie();
		axios
			.post(
				`${process.env.REACT_APP_BASE_URL}/api/like/create`,
				{
					blogId,
				},
				{
					headers: { Authorization: `Bearer ${cookie.get("token")}` },
				}
			)
			.then((res: any) => {
				getLikes(blogId);
				setIslike(true);
			})
			.catch((err: any) => {
				if (err.response.status === 401) {
					alert("You must login to like this blog");
				}
			});
	};

	const handleUnlike = () => {
		const cookie = new Cookie();
		axios
			.post(
				`${process.env.REACT_APP_BASE_URL}/api/like/delete`,
				{
					blogId,
				},
				{
					headers: { Authorization: `Bearer ${cookie.get("token")}` },
				}
			)
			.then((res: any) => {
				getLikes(blogId);
				setIslike(false);
			})
			.catch((err: any) => {
				if (err.response.status === 401) {
					alert("You must login to like this blog");
				}
			});
	};

	const handleSubmitComment = () => {
		if (commentText.length > 0) {
			const body = {
				blogId,
				content: commentText,
			};
			const cookie = new Cookie();

			axios
				.post(`${process.env.REACT_APP_BASE_URL}/api/comment/create`, body, {
					headers: { Authorization: `Bearer ${cookie.get("token")}` },
				})
				.then((res: any) => {
					getComments(blogId);
					setCommentText("");
				})
				.catch((err: any) => {
					if (err.response.status === 401) {
						alert("You must login to like this blog");
					}
				});
		}
	};

	const handleSubmitSubComment = (comment: string, motherId?: any) => {
		if (comment.length > 0) {
			const body = {
				blogId,
				content: comment,
				commentId: motherId || current,
			};
			const cookie = new Cookie();

			axios
				.post(
					`${process.env.REACT_APP_BASE_URL}/api/comment/create-sub`,
					body,
					{
						headers: { Authorization: `Bearer ${cookie.get("token")}` },
					}
				)
				.then((res: any) => {
					getComments(blogId);
					setCommentText("");
					setCurrent(null);
				})
				.catch((err: any) => {
					if (err.response.status === 401) {
						alert("You must login to like this blog");
					}
				});
		}
	};

	const getQueryId = () => {
		const query = queryString.parse(window.location.search);
		if (query.id) {
			return query.id;
		} 
			return null;
		
	};

  useEffect(() => {
		init();
	}, []);

  const renderHeader = () => (
			<header className="container rounded-xl">
				<div className="max-w-screen-md mx-auto space-y-5">
					<h1
						className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl max-w-4xl "
						title="Quiet ingenuity: 120,000 lunches and counting">
						{title}
					</h1>
					<span className="block text-base text-neutral-500 md:text-lg pb-1">
						{description}
					</span>

					<div className="w-full border-b border-neutral-100" />
				</div>
			</header>
		);

	const renderContent = () => (
			<div
				id="single-entry-content"
				className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto">
				<div className="w-full h-96 overflow-hidden">
					{thumbnail && thumbnail !== "" ? (
						<img
							className="object-cover w-full h-full"
							src={thumbnail}
							alt="thumbnail"
						/>
					) : null}
				</div>
				<div dangerouslySetInnerHTML={{ __html: content }} />
			</div>
		);

	const renderAuthor = () => (
			<div className="max-w-screen-md mx-auto">
				{isLike ? (
					<div className="flex justify-between pb-5">
						<ButtonPrimary onClick={handleUnlike} type="button">
							UnLike
						</ButtonPrimary>
						<div>
							<span className="mr-5">likes: {likes}</span>
							<span>views: {views}</span>
						</div>
					</div>
				) : (
					<div className="flex justify-between pb-5">
						<ButtonPrimary onClick={handleLike} type="button">
							Like
						</ButtonPrimary>
						<div>
							<span className="mr-5">likes: {likes}</span>
							<span>views: {views}</span>
						</div>
					</div>
				)}
				<div className="nc-SingleAuthor flex">
					{/* <Avatar sizeClass="w-11 h-11 md:w-24 md:h-24" /> */}
					<div className="flex flex-col ml-3 max-w-lg sm:ml-5 space-y-1">
						<span className="text-xs text-neutral-400 uppercase tracking-wider">
							WRITEN BY
						</span>
						<h2 className="text-lg font-semibold text-neutral-900">
							<a href="/ncmaz/author/the-demo-author-slug">{userEmail}</a>
						</h2>
					</div>
				</div>
			</div>
		);

	const renderCommentForm = () => (
			<div className="max-w-screen-md mx-auto pt-5">
				<h3 className="text-xl font-semibold text-neutral-800">
					Responses ({counts})
				</h3>
				<form className="nc-SingleCommentForm mt-5">
					<Textarea
						onChange={(e: any) => {
							setCommentText(e.target.value);
						}}
					/>
					<div className="mt-2 space-x-3">
						<ButtonPrimary onClick={handleSubmitComment} type="button">
							Submit
						</ButtonPrimary>
						{/* <ButtonSecondary>Cancel</ButtonSecondary> */}
					</div>
				</form>
			</div>
		);

	const renderCommentLists = () => (
			<div className="max-w-screen-md mx-auto">
				<ul className="nc-SingleCommentLists space-y-5">
					{comments.map((comment: any) => (
							<>
								<Comment
									item={comment}
									key={comment.id}
									onSubmit={handleSubmitSubComment}
									setCurrent={setCurrent}
									current={current}
								/>
								{comment.subComments.map((subComment: any) => (
										<ul className="pl-4 mt-5 space-y-5 md:pl-11">
											<li>
												<Comment
													item={subComment}
													key={subComment.id}
													onSubmit={handleSubmitSubComment}
													isSmall
													setCurrent={setCurrent}
													current={current}
												/>
											</li>
										</ul>
									))}
							</>
						))}
				</ul>
			</div>
		);

	return (
    <Layout>
		<div className="nc-PageSingle pt-8 lg:pt-16 ">
			{renderHeader()}
			<div className="nc-SingleContent container space-y-10">
				{renderContent()}
				<div className="max-w-screen-md mx-auto border-b border-t border-neutral-100" />
				{renderAuthor()}
				{renderCommentForm()}
				{renderCommentLists()}
			</div>
		</div>
    </Layout>
	);
}
