import React from "react";
import { NavLink} from 'react-router-dom';
import '../Style/TrendingSidebar.css';

export default function TrendingSidebar(props) {
  return (
    <div className="sidebar">
      <h2>Trending</h2>
      <ul className="popular-articles">
        {props.articles.map((article) => (
          <li key={article.articleId}>
            <NavLink to={`/articles/${article.articleId}`} replace>
              <p>{article.articleId}</p>
              {article.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
