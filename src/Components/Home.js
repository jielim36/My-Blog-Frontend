import React, { useEffect, useState } from 'react'
import '../Style/Home.css';
import { NavLink} from 'react-router-dom';
import axios from "axios";
import Contact from './Contact';
import welcome from '../Assets/welcome.png';
import SidebarBackground from './SidebarBackground';
import TrendingSidebar from './TrendingSidebar';

//create axios object
const controller = new AbortController();

const axObj = axios.create({
    // method: 'GET',
    baseURL: 'http://localhost:8080/',
    signal: controller.signal,
});

const Home = () => {

  //Page state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles , setTotalArticles] = useState(0);
  const [recommended , setRecommended] = useState(false);
  const [latest , setLastest] = useState(true);
  const articlesPerPage = 8;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  // const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(totalArticles / articlesPerPage);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //Request
  const [data , setData] = useState();
  const [isLoading , setIsLoading] = useState(true);
  const [error , setError] = useState('');

  //get the number of total articles
  useEffect(()=>{
    setIsLoading(true);

    axObj.get(`articles/total`)
      .then(response => {
        console.log("get total number:");
        console.log(response.data);
        setTotalArticles(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  },[]);


  //when click page button
  useEffect(()=>{
    setIsLoading(true);

    axObj.get(`articles/latest/${indexOfFirstArticle}/${articlesPerPage}`)
      .then(response => {
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  },[currentPage]);

  

  if(isLoading){
    return <h2>Is loading...</h2>;
  }

  const listActivated = (type) => {
    if(type === 'recommended'){
      setRecommended(true);
      setLastest(false);
    }else{
      setRecommended(false);
      setLastest(true);
    }
  }

  return (
    <>
      <div className="home-container">
        <div className="dashboard">
          <img src={welcome} alt='welcomePage'/>
        </div>
        <div className="article-section">
          <div className="article-tabs">
            <div className={`listType ${recommended ? 'listActivated' : ''}`} onClick={()=>{listActivated('recommended')}}>
              <p>Recommended</p>
            </div>
            <div className={`listType ${latest ? 'listActivated' : ''}`} onClick={()=>{listActivated('latest')}}>
              <p>Latest</p>
            </div>
          </div>
          <div className="article-list">
            {data.map((article) => (
              <div className="article-card" key={article.id}>
                <NavLink to={`/articles/${article.articleId}`} >
                  <h3>{article.title}</h3>
                  <p className='authorInfo'>
                    {article.authorId} | {article.publicationDate}
                  </p>
                  <p>{article.content.slice(0, 30)}...</p>
                </NavLink>
              </div>
            ))}
          </div>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? 'active-page' : 'page'}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <TrendingSidebar articles={data} />
      < Contact />
      <SidebarBackground />
    </>
  );
};

export default Home;
