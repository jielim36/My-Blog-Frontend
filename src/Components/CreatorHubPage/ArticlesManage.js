import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchArticlesByAuthorId } from '../FetchAPI';
import '../../Style/CreatorHubPage/ArticlesManage.css';
import like from '../../Assets/like.png';
import view from '../../Assets/view.png';
import edit from '../../Assets/edit.png';
import editActivated from '../../Assets/edit_activated.png';
import deleteIcon from '../../Assets/delete.png';
import deleteActivated from '../../Assets/delete_activated.png';

export default function ArticlesManage() {
  const param = useParams();
  const [articles, setArticles] = useState([]);
  const [hoveredEditButtons, setHoveredEditButtons] = useState({}); // 用于跟踪每个 Edit 按钮的悬停状态
  const [hoveredDeleteButtons, setHoveredDeleteButtons] = useState({}); // 用于跟踪每个 Delete 按钮的悬停状态

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["creatorhub", `/articles/author/${param.id}`],
    queryFn: fetchArticlesByAuthorId,
  });

  useEffect(() => {
    setArticles(data);
  }, [data]);

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

  const handleEditMouseEnter = (articleId) => {
    // 鼠标进入 Edit 按钮时执行的逻辑
    setHoveredEditButtons((prev) => ({ ...prev, [articleId]: true }));
  };

  const handleEditMouseLeave = (articleId) => {
    // 鼠标离开 Edit 按钮时执行的逻辑
    setHoveredEditButtons((prev) => ({ ...prev, [articleId]: false }));
  };

  const handleDeleteMouseEnter = (articleId) => {
    // 鼠标进入 Delete 按钮时执行的逻辑
    setHoveredDeleteButtons((prev) => ({ ...prev, [articleId]: true }));
  };

  const handleDeleteMouseLeave = (articleId) => {
    // 鼠标离开 Delete 按钮时执行的逻辑
    setHoveredDeleteButtons((prev) => ({ ...prev, [articleId]: false }));
  };

  if (localStorage.getItem('token')) {
    return (
      <div className="articlesManageContainer">
        <h1>Content</h1>
        <ul>
          {articles ? articles.map((article) => (
            <div className='articleCard' key={article.articleId}>
              <h3>{article.title}</h3>
              <p>{article.content.slice(0, 30)}...</p>
              <p className="authorInfo">
                <p>{article.authorId}</p>
                <p>
                  <img src={view} alt="View" />
                  {article.views}
                </p>
                <p>
                  <img src={like} alt="Like" />
                  {article.likes}
                </p>
                <p>{formatDate(article.publicationDate)}</p>
              </p>
              <div className='alterButton'>
                <button
                  onMouseEnter={() => handleEditMouseEnter(article.articleId)}
                  onMouseLeave={() => handleEditMouseLeave(article.articleId)}
                >
                  <img src={hoveredEditButtons[article.articleId] ? editActivated : edit} alt="Edit" />
                  Edit
                </button>
                <button
                  onMouseEnter={() => handleDeleteMouseEnter(article.articleId)}
                  onMouseLeave={() => handleDeleteMouseLeave(article.articleId)}
                >
                  <img src={hoveredDeleteButtons[article.articleId] ? deleteActivated : deleteIcon} alt="Delete" />
                  Delete
                </button>
              </div>
            </div>
          )) : ''}
        </ul>
      </div>
    );
  }

  return <h2>nothing...</h2>;
}
