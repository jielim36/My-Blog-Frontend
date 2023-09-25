import React from "react";
import { NavLink} from 'react-router-dom';
import '../Style/TrendingSidebar.css';
import { useQuery } from "@tanstack/react-query";
import { fetchTrendingArticlesByLimit } from "./FetchAPI";

export default function TrendingSidebar() {

  //get the most popular article in the last week
  const {
    isLoading: fetchTrendingIsLoading,
    isError: fetchTrendingIsError,
    data: trendingArticlesData,
    error: fetchTrendingError,
  } = useQuery({
    queryKey: ['trendingArticles' , `/articles/trending/5`],
    queryFn: fetchTrendingArticlesByLimit,
  });

  if(fetchTrendingIsLoading){
    return <h2>Is loading...</h2>
  }

  return (
    <div className="sidebar">
      <h2>Trending</h2>
      <ul className="popular-articles">
        {trendingArticlesData.map((article,index) => (
          <li key={article.articleId}>
            <NavLink to={`/articles/${article.articleId}`} replace>
              <p>{index+1}</p>
              <p>
                {article.title.length > 32 ? `${article.title.slice(0, 32)}...` : article.title}
              </p>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
