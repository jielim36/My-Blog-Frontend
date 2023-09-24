import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../Style/ArticlePage.css";
import Contact from "./Contact";
import { useState, useEffect } from "react";
import axios from "axios";

//create axios object
const controller = new AbortController();

const axObj = axios.create({
  // method: 'GET',
  baseURL: "http://localhost:8080/",
  signal: controller.signal,
});

const ArticlePage = () => {
  const path = window.location.pathname;

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);

    axObj
      .get(path)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const article = data;

  if (isLoading) {
    return <h2>Is loading...</h2>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
