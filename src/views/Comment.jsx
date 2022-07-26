import React from "react";
import Avatar from "../shared/Avatar/Avatar";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import Textarea from "../shared/Textarea/Textarea";

const Comment = ({
	isSmall,
	item,
	current,
	onSubmit,
	setCurrent,
}) => {
	const [commentText, setCommentText] = React.useState("");

	const renderDate = (createdAt: string) => {
		const date = new Date(createdAt);
		return date.toDateString();
	};

	return (
		<div className={isSmall ? "nc-CommentCard flex pl-4" : "nc-CommentCard flex"}>
			<div className="pt-1">
				<Avatar
					userName={item?.userName}
					imgUrl={
						item?.profilePhoto
							? item.profilePhoto
							: "http://www.clker.com/cliparts/3/c/9/0/15346636991003506792default_user.med.png"
					}
					sizeClass={`w-6 h-6 ${!isSmall ? "sm:h-8 sm:w-8 " : ""}`}
				/>
			</div>
			<div className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-xl sm:ml-3 sm:text-base">
				<div className="relative flex items-center pr-6">
					<a
						className="flex-shrink-0 font-semibold text-neutral-800"
						href="/ncmaz/author/the-demo-author-slug">
						{item?.userName}
					</a>
					<span className="mx-2">·</span>
					<span className="text-neutral-500 text-xs line-clamp-1 sm:text-sm">
						{renderDate(item?.createdAt)}
					</span>
				</div>
				<span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4">
					{item?.content}
				</span>
				{isSmall ? (
					<div>
						<button
							className="inline-flex items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-100 px-3 h-8 hover:bg-teal-50 hover:text-teal-600 focus:outline-none "
							title="Reply"
							onClick={() => setCurrent(item.id)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-[18px] w-[18px] mr-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
							</svg>
							<span className="text-xs leading-none text-neutral-900">
								Reply
							</span>
						</button>
						{current === item.id ? (
							<form className="nc-SingleCommentForm mt-5">
								<Textarea
									onChange={(e: any) => {
										setCommentText(e.target.value);
									}}
								/>
								<div className="mt-2 space-x-3">
									<ButtonPrimary
										onClick={() => {
											onSubmit(
												`@${item.userEmail} ${  commentText}`,
												item.cgroup
											);
											setCommentText("");
										}}
										type="button">
										Submit
									</ButtonPrimary>
									{/* <ButtonSecondary>Cancel</ButtonSecondary> */}
								</div>
							</form>
						) : null}
					</div>
				) : (
					<div>
						<button
							className="inline-flex items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-100 px-3 h-8 hover:bg-teal-50 hover:text-teal-600 focus:outline-none "
							title="Reply"
							onClick={() => setCurrent(item.id)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-[18px] w-[18px] mr-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
							</svg>
							<span className="text-xs leading-none text-neutral-900">
								Reply
							</span>
						</button>
						{current === item.id ? (
							<form className="nc-SingleCommentForm mt-5">
								<Textarea
									onChange={(e: any) => {
										setCommentText(e.target.value);
									}}
								/>
								<div className="mt-2 space-x-3">
									<ButtonPrimary
										onClick={() => {
											onSubmit(commentText);
											setCommentText("");
										}}
										type="button">
										Submit
									</ButtonPrimary>
									{/* <ButtonSecondary>Cancel</ButtonSecondary> */}
								</div>
							</form>
						) : null}
					</div>
				)}
			</div>
		</div>
	);
};

export default Comment;
