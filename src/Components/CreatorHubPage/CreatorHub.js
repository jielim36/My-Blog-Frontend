import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticlesByAuthorId } from "../FetchAPI";
import '../../Style/CreatorHubPage/CreatorHub.css';
import uploadIcon from '../../Assets/upload_white.png';
import homeIcon from '../../Assets/home.png';
import articlesManageIcon from '../../Assets/articlesManage.png';
import dataViewIcon from '../../Assets/data-view.png';
import fansIcon from '../../Assets/fans.png';
import homeIcon_Activate from '../../Assets/home_activated.png';
import articlesManageIcon_Activate from '../../Assets/articlesManage_activated.png';
import dataViewIcon_Activate from '../../Assets/data-view_activated.png';
import fansIcon_Activate from '../../Assets/fans_activated.png';
import CreatorHome from "./CreatorHome";
import ArticlesManage from "./ArticlesManage";
import FansManage from "./FansManage";
import DataView from "./DataView";

export default function CreatorHub() {
    const param = useParams();
    const [articles , setArticles] = useState();
    const [navStat,setNavStat] = useState(1);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["creatorhub", `/articles/author/${param.id}`],
    queryFn: fetchArticlesByAuthorId,
  });

  useEffect(()=>{
    setArticles(data);
  },[data])

  const content = ()=>{
    switch (navStat) {
      case 1:
        return <CreatorHome />;
      case 2:
        return <ArticlesManage />;
      case 3:
        return <DataView />;
      case 4:
          return <FansManage />;
      default:
        break;
    }
  }

  if(localStorage.getItem('token')){
      return (
        <div class="creatorContainer">
        <nav class="navigator">
            <ul>
                <li>
                  <button onClick={()=>{}}>
                  <img src={uploadIcon} alt="uploadIcon"/>
                    Upload
                  </button>
                </li>
                <li onClick={()=>{setNavStat(1)}} className={`${navStat === 1 ? 'navActivated' : ''}`}>
                  <img src={`${navStat === 1 ? homeIcon_Activate : homeIcon}`} alt="homeIcon"/>
                  Home
                </li>
                <li onClick={()=>{setNavStat(2)}} className={`${navStat === 2 ? 'navActivated' : ''}`}>
                  <img src={`${navStat === 2 ? articlesManageIcon_Activate : articlesManageIcon}`} alt="articlesManage"/>
                  Articles
                </li>
                <li onClick={()=>{setNavStat(3)}} className={`${navStat === 3 ? 'navActivated' : ''}`}>
                  <img src={`${navStat === 3 ? dataViewIcon_Activate : dataViewIcon}`} alt="dataViewIcon"/>
                  Data Analysis
                </li>
                <li onClick={()=>{setNavStat(4)}} className={`${navStat === 4 ? 'navActivated' : ''}`}>
                  <img src={`${navStat === 4 ? fansIcon_Activate : fansIcon}`} alt="fansIcon"/>
                  Follower
                </li>
            </ul>
        </nav>
        <main class="content">
            {content()}
        </main>
    </div>
      );
  }

  return <h2>nothing...</h2>
}
