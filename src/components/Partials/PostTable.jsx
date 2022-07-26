import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PostTable({ className, title="게시물", datas, isNotice=false }) {
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

  return (
    <div
      className={`update-table w-full p-8 bg-white overflow-hidden rounded-2xl section-shadow ${
        className || ""
      }`}
    >
      <div className="header w-full flex justify-between items-center mb-5">
        <div className="flex space-x-2 items-center">
          <h1 className="text-xl font-bold text-dark-gray tracking-wide">
          {title}
          </h1>
        </div>
        {isNotice ? (
          <Link to="/notice" className="text-sm text-dark-gray">
          More...
       </Link>
        ) : (
          <Link to="/blog" className="text-sm text-dark-gray">
           More...
        </Link>
        )}
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
                    <td className="py-4 text-center">{data.userName}</td>
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
