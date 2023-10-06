import "../Style/ArticlePage.css";
import Contact from "./Contact";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchArticleById, updateArticleById } from "./FetchAPI";
import axios from "axios";
import ArticleInteraction from "./ArticleInteraction";
import Login from "./Login";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';

const ArticlePage = () => {
  const path = window.location.pathname;
  const {
    isLoading,
    isError,
    data: article,
    error,
  } = useQuery({
    queryKey: ["articles", path],
    queryFn: fetchArticleById,
  });

  
  useEffect(()=>{

    const updateView_json = {
      views: 1,
    };

    axios.put(`http://localhost:8080${path}`, updateView_json);
    
  },[])

  
  if (isLoading) {
    return <h2>Is loading...</h2>;
  }

  if (isError) {
    console.error("Error fetching article:", error.response.status);
    return <div>Error: Unable to fetch article.</div>;
  }

  SyntaxHighlighter.registerLanguage('javascript', js);
  SyntaxHighlighter.registerLanguage('jsx', jsx);
  SyntaxHighlighter.registerLanguage('java', java);

  return (
    <>
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
        <div className="article-content">
        <Markdown
            children={article.content}
            remarkPlugins={[remarkGfm]} 
            components={{
              code(props) {
                const {children, className, node, ...rest} = props
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    children={String(children).replace(/\n$/, '')}
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                )
              },
              blockquote: (props) => {
                return (
                  <blockquote
                    style={{
                      // 添加你想要的样式属性，例如字体样式、颜色等
                      borderLeft: '2px solid #ccc',
                      margin: "0px",
                      paddingLeft: "1em"
                    }}
                  >
                    {props.children}
                  </blockquote>
                );
              },
              ul: (props) => {
                return (
                  <ul
                    style={{
                      display: "block",
                      listStyleType: 'disc', // 使用实心圆点
                    }}
                  >
                    {props.children}
                  </ul>
                );
              },
              ol: (props) => {
                return (
                  <ol
                    style={{
                      // 添加你想要的样式属性，例如字体样式、颜色等
                      listStyleType: 'decimal', // 使用数字
                    }}
                  >
                    {props.children}
                  </ol>
                );
              },
            }}
          />
        </div>
        <Contact />
        <ArticleInteraction />
      </div>
    </>
  );
};

export default ArticlePage;
