import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../Style/ArticlePage.css";
import Contact from "./Contact";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchArticleById, updateArticleById } from "./FetchAPI";
import axios from "axios";

const ArticlePage = () => {
  const path = window.location.pathname;
  const {
    isLoading,
    isError,
    data: article,
    error,
  } = useQuery({
    queryKey: ["articles", path],
    queryFn: fetchArticleById,
  });

  
  useEffect(()=>{

    const updateView_json = {
      views: 1,
    };

    axios.put(`http://localhost:8080${path}`, updateView_json);
    
  },[])

  
  if (isLoading) {
    return <h2>Is loading...</h2>;
  }

  if (isError) {
    console.error("Error fetching article:", error);
    return <div>Error: Unable to fetch article.</div>;
  }

  return (
    <div className="article-container">
      <div className="article-header">
        <h1 className="title">{article.title}</h1>
        <div className="author-info">
          <span className="author">Author: {article.authorId}</span>
          <span></span>
          <span className="date">
            Published Date: {article.publicationDate}
          </span>
        </div>
      </div>
      <div className="article-content">{article.content}</div>
      <Contact />
    </div>
  );
};

export default ArticlePage;
