import React from "react";
import axios from "axios";

const axObj = axios.create({
  baseURL: "http://localhost:8080",
});

export const fetchArticleById = async ({queryKey}) => {
  const [_key, path] = queryKey;
  const response = await axObj.get(path);
  return response.data;
};

export const fetchArticlesByLimit = async ({ queryKey }) => {
  const [_key, fetchArticlesByLimitPath] = queryKey;
  const response = await axObj.get(fetchArticlesByLimitPath)
  return response.data;
};

export const fetchArticlesNumber = async ({queryKey}) => {
    const [_key, path] = queryKey;
    const response = await axObj.get(path);
    return response.data;
};

export const updateArticleById = async ({newData}) => {
    const {path , updateData} = newData;
    console.log(`http://localhost:8080${path}`);
    console.log(updateData);
    const response = await axObj.put(path,updateData);
    return response.data;
};

export const fetchTrendingArticlesByLimit = async ({ queryKey }) => {
  const [_key, fetchArticlesByLimitPath] = queryKey;
  const response = await axObj.get(fetchArticlesByLimitPath)
  return response.data;
};

export const fetchArticlesByContent = async ({ queryKey }) => {
  const [_key, Path] = queryKey;
  const response = await axObj.get(Path)
  return response.data;
};

export const fetchArticlesTitleByLimit = async ({ queryKey }) => {
  const [_key, Path] = queryKey;
  const response = await axObj.get(Path)
  return response.data;
};

export const fetchUserById = async ({queryKey}) => {
  const [_key, path] = queryKey;
  const response = await axObj.get(path);
  return response.data;
};