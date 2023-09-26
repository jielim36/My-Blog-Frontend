import React, { useState , createContext } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { fetchArticlesByTitle } from './FetchAPI';
import { NavLink, Navigate, useNavigate} from 'react-router-dom';

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
  const nav = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    // window.location.href = `/query/${query}`;
    nav(`/query/${query}`);
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
