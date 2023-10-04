import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchArticlesByAuthorId } from '../FetchAPI';
import '../../Style/CreatorHubPage/ArticlesManage.css';
import like from '../../Assets/like.png';
import view from '../../Assets/view.png'

export default function ArticlesManage() {
  const param = useParams();
    const [articles , setArticles] = useState();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["creatorhub", `/articles/author/${param.id}`],
    queryFn: fetchArticlesByAuthorId,
  });

  const showToken = ()=>{
    // console.log(localStorage.getItem('token'));
    // fetchArticlesByAuthorId();
  }

  useEffect(()=>{
    setArticles(data);
  },[data])

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

  if(localStorage.getItem('token')){
      return (
        <div className="articlesManageContainer">
            <h1>Content</h1>
            <ul>
                {articles ? articles.map((article, index) => (
                    <div className='articleCard' key={article.articleId}>
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
                      <button>Edit</button>
                      <button>Delete</button>
                    </div>
                )) : ''}
            </ul>
        </div>
      );
  }

  return <h2>nothing...</h2>
}
