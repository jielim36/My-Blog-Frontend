import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';

import '../../Style/CreatorHubPage/UploadArticle.css';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createNewArticle } from '../FetchAPI';

export default function UploadArticle() {
  const [userInput, setUserInput] = useState('');
  const param = useParams();
  const [articleForm , setArticleForm] = useState({
    articleId: null,
    title: "my new article!",
    content: userInput,
    authorId: param.userId,
    publication_date: "",
    tag: "",
    views: 0,
    likes: 0,
    comments: 0
  });

  // 处理用户输入变化的函数
  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

  SyntaxHighlighter.registerLanguage('javascript', js);
  SyntaxHighlighter.registerLanguage('jsx', jsx);
  SyntaxHighlighter.registerLanguage('java', java);

  useEffect(()=>{
    setArticleForm({
      articleId: null,
      title: "my new article!",
      content: userInput,
      authorId: param.userId,
      publication_date: "",
      tag: "",
      views: 0,
      likes: 0,
      comments: 0
    });
  },[userInput])

  const postArticle = () =>{
    postArticleRequest.mutate(articleForm);
  }

  const postArticleRequest = useMutation({
    mutationFn: (articleForm)=>{
      return createNewArticle(articleForm);
    }
  });

  return (
    <>
      <div className='ArticleWriteContainer'>
        <div className='UserWritingContainer'>
          <textarea
            className='userWritterBox'
            value={userInput}
            onChange={handleUserInputChange}
            placeholder="在这里输入文章内容..."
          />
        </div>
        <div className='ArticleRenderContainer'>
          <Markdown
            children={userInput}
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
              }
            }}
          />
        </div>
      </div>
        <div className='tools' >
          <button className='postButton' onClick={postArticle}>Post</button>
        </div>
    </>
  );
}
