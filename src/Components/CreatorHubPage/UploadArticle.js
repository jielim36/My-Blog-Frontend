import React, { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import '../../Style/CreatorHubPage/UploadArticle.css';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createNewArticle } from '../FetchAPI';

export default function UploadArticle() {
  const [articleTitle , setArticleTitle] = useState('');
  const [userInput, setUserInput] = useState('');
  const [ articleValid , setArticleValid] = useState(false);
  const param = useParams();
  const [articleForm , setArticleForm] = useState({
    articleId: null,
    title: articleTitle,
    content: userInput,
    authorId: param.userId,
    publication_date: "",
    tag: "",
    views: 0,
    likes: 0,
    comments: 0
  });

  const textAreaRef = useRef(null); // 创建一个 ref 对象

  // 处理用户输入变化的函数
  const handleUserInputChange = (event) => {
    const inputValue = event.target.value;
    setUserInput(inputValue);
  };

  const handleArticleTitleInputChange = (event) => {
    const inputValue = event.target.value;
    setArticleTitle(inputValue);
  };

  const handleTabKey = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault(); // 阻止默认的Tab行为
      const { selectionStart, selectionEnd } = textAreaRef.current;
      const newText =
        userInput.substring(0, selectionStart) + '\t' + userInput.substring(selectionEnd);
      setUserInput(newText);
    }
  };


  useEffect(()=>{
    if(articleTitle.length > 10 && articleTitle.length < 30){
      setArticleValid(true);
    }else{
      setArticleValid(false);
    }
  },[articleTitle,userInput])

  useEffect(()=>{
    setArticleForm({
      articleId: null,
      title: articleTitle,
      content: userInput,
      authorId: param.id,
      publication_date: "",
      tag: "",
      views: 0,
      likes: 0,
      comments: 0
    });
  },[userInput, param.id])

  const postArticle = () =>{
    console.log(articleValid);
    postArticleRequest.mutate(articleForm);
  }

  const postArticleRequest = useMutation({
    mutationFn: (articleForm)=>{
      return createNewArticle(articleForm);
    }
  });

  SyntaxHighlighter.registerLanguage('javascript', js);
  SyntaxHighlighter.registerLanguage('jsx', jsx);
  SyntaxHighlighter.registerLanguage('java', java);

  return (
    <>
      <div className='ArticleTitleContainer'>
        <span>Title:</span>
        <input 
          className='inputTitle'
          value={articleTitle}
          onChange={handleArticleTitleInputChange}
          placeholder='Title...'
        />
        <div className='tools' >
            <button className='postButton' 
                    onClick={postArticle}
                    disabled={!articleValid}
            >
              Post
            </button>
        </div>
      </div>
      <div className='ArticleWriteContainer'>
        <div className='UserWritingContainer'>
          <textarea
            ref={textAreaRef} // 将 ref 绑定到文本框
            className='userWritterBox'
            value={userInput}
            onChange={handleUserInputChange}
            onKeyDown={handleTabKey}
            placeholder="在这里输入文章内容..."
          />
        </div>
        <div className='ArticleRenderContainer'>
          <Markdown
            children={userInput}
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
                      // 添加你想要的样式属性，例如字体样式、颜色等
                      listStyleType: 'disc', // 使用实心圆点
                      display: "none",
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
      </div>
    </>
  );
}
