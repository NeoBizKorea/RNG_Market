import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";

export default function BlogTable({ className, title="게시물", datas, numberOfdatas, categories, isNotice, setCurrentCategory, currentCategory }) {
  const navigate = useNavigate();
  const renderDate = (date) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    const second = dateObj.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  const renderPostButton = () => (
        <Link to="/post-create">
          <ButtonPrimary>게시물 작성</ButtonPrimary>
        </Link>
      )

  return (
    <div
      className={`update-table w-full p-8 bg-white overflow-hidden rounded-2xl section-shadow min-h-[520px] ${
        className || ""
      }`}
    >
      <div className="header w-full flex justify-between items-center mb-5">
        <div className="flex space-x-2 items-center">
          <h1 className="text-xl font-bold text-dark-gray tracking-wide">
          {title}
          </h1>
        </div>
        <div>
        <select
										className="pl-10 bg-transparent border-none h-12 px-2 py-1 text-neutral-500 dark:text-neutral-400"
										onChange={(e) => setCurrentCategory(e.target.value)}>
										{categories.map((category) => (
												<option
													selected={
														currentCategory.id === category.id
													}
													key={category.id}
													value={category.id}>
													<span>{category.name}</span>
												</option>
											))}
									</select>
        {renderPostButton()}
        </div>
      </div>
      <div className="relative w-full overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="text-base text-thin-light-gray whitespace-nowrap border-b default-border-bottom ">
            <td className="py-4 pr-4"/>
              <td className="py-4">번호</td>
              <td className="py-4 text-center">제목</td>
              <td className="py-4 text-center">글쓴이</td>
              <td className="py-4 text-center">작성일</td>
              <td className="py-4 text-center">조회</td>
              <td className="py-4 text-center">추천</td>
            </tr>
            {datas.map((data, index) => (
                <tr className="text-base text-thin-black whitespace-nowrap border-b default-border-bottom " key={index} onClick={() => navigate(`/blog-single?id=${data.id}`)}>
                  <td className="h-12 pr-4">
                    <img className="h-full w-full object-cover" src={data.thumbnail} alt={`thumb_${index}`} />
                    </td>
                    <td className="py-4">{index + 1}</td>
                    <td className="py-4 text-center">{data.title}</td>
                    <td className="py-4 text-center">{data.userName && data.userName != null ? data.userName : data.annonymousId}</td>
                    <td className="py-4 text-center">{renderDate(data.createdAt)}</td>
                    <td className="py-4 text-center">{data.views}</td>
                    <td className="py-4 text-center">{data.likes}</td>
                </tr>
            ))}

      
          </tbody>
        </table>
      </div>
    </div>
  );
}
