import React, { useContext, useEffect, useState } from "react";
import "../Style/QueryPage.css";
import Contact from "./Contact";
import SidebarBackground from "./SidebarBackground";
import TrendingSidebar from "./TrendingSidebar";
import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom";
import view from "../Assets/view.png";
import like from "../Assets/like.png";
import {
  fetchArticlesNumber,
  fetchArticlesTitleByLimit,
} from "./FetchAPI";

const QueryPage = (props) => {
  //Page state
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 8;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const {queryContent} = useParams();
  console.log('content: '+queryContent);


  //path name (get list type -> latest , recommended , query)
  const searchContent = window.location.pathname.replace("/query/", ""); //get querycontent

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //get the articles for a specific pages
  const fetchArticlesTitleByLimitPath = `/articles/title/${searchContent}/${indexOfFirstArticle}/${articlesPerPage}`;
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["articles", fetchArticlesTitleByLimitPath],
    queryFn: fetchArticlesTitleByLimit,
  });

  //get total number of articles for determine how many pages
  const {
    isLoading: totalNumberLoading,
    isError: totalNumberIsError,
    data: totalNumberData,
    error: totalNumberError,
  } = useQuery({
    queryKey: ["articles", `/articles/total/${searchContent}`],
    queryFn: fetchArticlesNumber,
  });
  const totalPages = Math.ceil(totalNumberData / articlesPerPage);

  
  // 格式化日期时间函数
  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  if (isError) {
    console.error("Error fetching articles:", error);
    return <div>Error: Unable to fetch article.</div>;
  }

  if(isLoading){
    return <h2>Is Loading...</h2>
  }

  if(data){
    console.log(data);
  }

  if (data) {
    return (
      <>
        <div className="home-container">
          <div className="article-section">
            <div className="result">
              <p>
                {data.length <= 0 ? 'Nothing...' : "Result:"}
              </p>
            </div>
            <div className="article-list">
              {data.map((article) => (
                <div className="article-card" key={article.id}>
                  <NavLink to={`/articles/${article.articleId}`}>
                    <h3>{article.title}</h3>
                    <p>{article.content.slice(0, 30)}...</p>
                    <p className="authorInfo">
                      <p>{article.authorId}</p>
                      <p>
                        <img src={view} />
                        {article.views}
                      </p>
                      <p>
                        <img src={like} />
                        {article.likes}
                      </p>
                      <p>{formatDate(article.publicationDate)}</p>
                    </p>
                  </NavLink>
                </div>
              ))}
            </div>
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={currentPage === index + 1 ? "active-page" : "page"}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
        <TrendingSidebar />
        <Contact />
        <SidebarBackground />
      </>
    );
  }
};

export default QueryPage;
