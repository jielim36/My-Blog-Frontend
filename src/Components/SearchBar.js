import React, { useState } from 'react';
import styled from 'styled-components';

// 使用 styled-components 创建一个带样式的搜索框容器
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  margin: 0 auto;
  border: 2px solid #2f54eb;
  border-radius: 25px;
`;

// 使用 styled-components 创建样式化的输入框
const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
`;

// 使用 styled-components 创建样式化的搜索按钮
const SearchButton = styled.button`
  background-color: #2f54eb;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 0 25px 25px 0;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  transform: translateX(2px);
`;

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // 在这里执行搜索逻辑，可以使用 query 变量来获取搜索关键字
    console.log('Searching for:', query);
  };

  return (
    <form onSubmit={handleSearch}>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchButton type="submit">
          Search
        </SearchButton>
      </SearchContainer>
    </form>
  );
};

export default SearchBar;
