import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticlesByAuthorId } from "./FetchAPI";

export default function CreatorHub() {
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


  if(localStorage.getItem('token')){
      return (
        <div>
            <h1>==Your Articles==</h1>
            <button onClick={showToken}>show</button>
            <ul>
                {articles ? articles.map((item, index) => (
                    <li key={index}>{item.title}</li>
                )) : ''}
            </ul>
        </div>
      );
  }

  return <h2>nothing...</h2>
}
