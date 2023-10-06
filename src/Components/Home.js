import React, { useContext, useEffect, useState } from "react";
import "../Style/Home.css";
import axios from "axios";
import Contact from "./Contact";
import welcome from "../Assets/welcome.png";
import SidebarBackground from "./SidebarBackground";
import TrendingSidebar from "./TrendingSidebar";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import view from "../Assets/view.png";
import like from "../Assets/like.png";
import {
  fetchArticlesByLimit,
  fetchArticlesNumber,
  fetchTrendingArticlesByLimit,
} from "./FetchAPI";
import SearchBar from "./SearchBar";

//create axios object
const controller = new AbortController();

const axObj = axios.create({
  // method: 'GET',
  baseURL: "http://localhost:8080/",
  signal: controller.signal,
});

const Home = () => {
  //Page state
  const [currentPage, setCurrentPage] = useState(1);
  const [recommended, setRecommended] = useState(true);
  const [latest, setLastest] = useState(false);
  const articlesPerPage = 8;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const [searchArticles , setSearchArticles] = useState();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //get the articles for a specific pages
  const listType = recommended ? "recommended" : "latest";
  const fetchArticlesByLimitPath = `/articles/${listType}/${indexOfFirstArticle}/${articlesPerPage}`;
  const {
    isLoading: articlesByLimitLoading,
    isError: articlesByLimitIsError,
    data: articlesByLimitData,
    error: articlesByLimitError,
  } = useQuery({
    queryKey: ["articles", fetchArticlesByLimitPath],
    queryFn: fetchArticlesByLimit,
  });

  useEffect(()=>{
    console.log(articlesByLimitData);
  },[articlesByLimitData])

  //get total number of articles for determine how many pages
  const {
    isLoading: totalNumberLoading,
    isError: totalNumberIsError,
    data: totalNumberData,
    error: totalNumberError,
  } = useQuery({
    queryKey: ["articles", `/articles/total`],
    queryFn: fetchArticlesNumber,
  });
  const totalPages = Math.ceil(totalNumberData / articlesPerPage);

  if (articlesByLimitLoading) {
    return <h2>Is loading...</h2>;
  }
  if (articlesByLimitIsError) {
    console.error("Error fetching articles:", articlesByLimitError);
    return <div>Error: Unable to fetch article.</div>;
  }

  if (totalNumberLoading || articlesByLimitLoading) {
    return <h2>Is loading...</h2>;
  }

  if (totalNumberIsError) {
    console.error("Error fetching article number:", totalNumberError);
    return <div>Error: Unable to fetch article.</div>;
  }

  const listActivated = (type) => {
    if (type === "recommended") {
      setRecommended(true);
      setLastest(false);
    } else {
      setRecommended(false);
      setLastest(true);
    }
  };

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

  const handleQueryFromSearch = (queryResult) => {
    articlesByLimitData = queryResult;
  }


  return (
    <>
      <div className="home-container">
        <div className="dashboard">
          <img src={welcome} alt="welcomePage" />
        </div>
        <div className="article-section">
          <div className="article-tabs">
            <div
              className={`listType ${recommended ? "listActivated" : ""}`}
              onClick={() => {
                listActivated("recommended");
              }}
            >
              <p>Recommended</p>
            </div>
            <div
              className={`listType ${latest ? "listActivated" : ""}`}
              onClick={() => {
                listActivated("latest");
              }}
            >
              <p>Latest</p>
            </div>
          </div>
          <div className="article-list">
        {articlesByLimitData.map((article) => (
          <div className="article-card" key={article.id}>
            <NavLink to={`/articles/${article.articleId}`}>
              <h3>{article.title}</h3>
              <p>{article.content.slice(0, 30)}...</p>
              <p className="authorInfo">
                <p>{article.authorName}</p>
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
};

export default Home;
