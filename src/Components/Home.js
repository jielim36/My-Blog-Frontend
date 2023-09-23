import React, { useState } from 'react'
import '../Style/Home.css';
import { NavLink} from 'react-router-dom';
import Contact from './Contact';
import backgrount_keyboard from '../Assets/background_keyboard.jpg';
import background01 from '../Assets/background01.jpg';
import background03 from '../Assets/background03.jpg';
import background04 from '../Assets/background04.jpg';
import welcome from '../Assets/welcome.png';
import sidebar01 from '../Assets/sidebar_background01.png';
import sidebar02 from '../Assets/sidebar_background02.jpg';
import SidebarBackground from './SidebarBackground';



// Dummy data for articles and sidebar
const articles = [
    {
      id: 1,
      title: 'Article 1',
      author: 'John Doe',
      date: '2023-09-20',
      content: 'This is the content of article 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 2,
      title: 'Article 2',
      author: 'Jane Smith',
      date: '2023-09-21',
      content: 'This is the content of article 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 3,
      title: 'Article 3',
      author: 'Bob Johnson',
      date: '2023-09-22',
      content: 'This is the content of article 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 4,
      title: 'Article 4',
      author: 'Alice Brown',
      date: '2023-09-23',
      content: 'This is the content of article 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 5,
      title: 'Article 5',
      author: 'Eve Wilson',
      date: '2023-09-24',
      content: 'This is the content of article 5. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 6,
      title: 'Article 6',
      author: 'Michael Davis',
      date: '2023-09-25',
      content: 'This is the content of article 6. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 7,
      title: 'Article 7',
      author: 'Olivia Miller',
      date: '2023-09-26',
      content: 'This is the content of article 7. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 8,
      title: 'Article 8',
      author: 'David Jones',
      date: '2023-09-27',
      content: 'This is the content of article 8. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 9,
      title: 'Article 9',
      author: 'Sophia White',
      date: '2023-09-28',
      content: 'This is the content of article 9. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 10,
      title: 'Article 10',
      author: 'Liam Brown',
      date: '2023-09-29',
      content: 'This is the content of article 10. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 11,
      title: 'Article 11',
      author: 'YYY GmGod',
      date: '2023-09-20',
      content: 'This is the content of article 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 12,
      title: 'Article 12',
      author: 'Jane Smith',
      date: '2023-09-21',
      content: 'This is the content of article 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 13,
      title: 'Article 13',
      author: 'Bob Johnson',
      date: '2023-09-22',
      content: 'This is the content of article 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 14,
      title: 'Article 14',
      author: 'Alice Brown',
      date: '2023-09-23',
      content: 'This is the content of article 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 15,
      title: 'Article 15',
      author: 'Eve Wilson',
      date: '2023-09-24',
      content: 'This is the content of article 5. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 16,
      title: 'Article 16',
      author: 'Michael Davis',
      date: '2023-09-25',
      content: 'This is the content of article 6. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 17,
      title: 'Article 17',
      author: 'Olivia Miller',
      date: '2023-09-26',
      content: 'This is the content of article 7. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 18,
      title: 'Article 18',
      author: 'David Jones',
      date: '2023-09-27',
      content: 'This is the content of article 8. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 19,
      title: 'Article 19',
      author: 'Sophia White',
      date: '2023-09-28',
      content: 'This is the content of article 9. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 20,
      title: 'Article 20',
      author: 'Liam Brown',
      date: '2023-09-29',
      content: 'This is the content of article 10. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    
  ];

const popularArticles = [
  {
    ranked:1,
    id: 1,
    title: 'Popular Article 1',
    author: 'Jane Smith',
    date: '2023-09-18',
  },
  {
    ranked:2,
    id: 2,
    title: 'Article 2',
    author: 'Jane Smith',
    date: '2023-09-21',
    content: 'This is the content of article 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  },
  {
    ranked:3,
    id: 3,
    title: 'Article 3',
    author: 'Bob Johnson',
    date: '2023-09-22',
    content: 'This is the content of article 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  },
  {
    ranked:4,
    id: 4,
    title: 'Article 4',
    author: 'Alice Brown',
    date: '2023-09-23',
    content: 'This is the content of article 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  }
  // Add more popular articles here
];

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 8;

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handlePageChange = (page) => {
    console.log(22);
    setCurrentPage(page);
  };

  return (
    <>
      <div className="home-container">
        <div className="dashboard">
          <img src={welcome} />
        </div>
        <div className="article-section">
          <div className="article-tabs">
            <NavLink to="" 
            className="tab-button" 
            style={({isActive})=> {return isActive ? {borderBottomColor:"#2f54eb" , color:'black'} : null}}>
              Recommended
            </NavLink>
            <NavLink to="/home/recommended" 
            className="tab-button" 
            style={({isActive})=> {return isActive ? {borderBottomColor:"1px solid #2f54eb"} : null}}>
              Latest
            </NavLink>
          </div>
          <div className="article-list">
            {currentArticles.slice(currentArticles, articlesPerPage).map((article) => (
              <div className="article-card" key={article.id}>
                <NavLink to={`/article/${article.id}`}>
                  <h3>{article.title}</h3>
                  <p>
                    {article.author} | {article.date}
                  </p>
                  <p>{article.content.slice(0, 20)}...</p>
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
        <div className="sidebar">
          <h2>Trending</h2>
          <ul className="popular-articles">
            {popularArticles.map((article) => (
              <li key={article.id}>
                <NavLink to={`/article/${article.id}`}>
                  <p>  
                    {article.ranked}
                  </p>
                  {article.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      < Contact />
      <SidebarBackground />
    </>
  );
};

export default Home;
