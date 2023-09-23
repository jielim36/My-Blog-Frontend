import { useLocation, useNavigate, useParams } from "react-router-dom";
import '../Style/ArticlePage.css';
import Contact from "./Contact";

const articles = [
  {
    id: 1,
    title: 'Article 1',
    author: 'John Doe',
    date: '2023-09-20',
    content: 'React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library[3][4] for building user interfaces based on components. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies.[5][6][7] React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality.[8][9] ',
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

const ArticlePage = () => {
    
    const {id} = useParams();//获取路径参数： /路径/参数
    const URL = useLocation();//获取请求信息
    console.log(URL.pathname);

    const nav = useNavigate();
    console.log(nav);//这是一个跳转页面的方法函数代码
    const clickHandler = () => {
        nav('/home' , {replace: true});
    }


    const article = articles.find(item => item.id === +id);
    
    return (
        <div className="article-container">
          <div className="article-header">
            <h1 className="title">{article.title}</h1>
            <div className="author-info">
              <span className="author">Author: {article.id}</span>
              <span className="date">Published Date: {article.date}</span>
            </div>
          </div>
          <div className="article-content">
            {article.content}
          </div>
          <Contact />
        </div>
    );

}

export default ArticlePage;