import React, { useState } from "react";
import axios from "axios";
import Login from "./Login";

const BASE_URL = "http://localhost:8080";
const controller = new AbortController();
export const axObj = axios.create({
  baseURL: BASE_URL,
  signal: controller.signal,
});

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token') || ""}`,
    "Content-Type": "application/json",
  },
};

axObj.interceptors.request.use(
  (config) => {
    // 在这里查看请求的所有信息
    console.log("Request Config:", config);

    // 返回配置，以便请求继续发送
    return config;
  },
  (error) => {
    // 请求错误时执行
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// // 响应拦截器：在响应被处理之前执行
// axObj.interceptors.response.use(
//   (response) => {
//     // 在这里查看响应的所有信息
//     console.log("Response Data:", response.data);
//     console.log("Response Status:", response.status);
//     console.log("Response Headers:", response.headers);

//     // 返回响应，以便继续处理
//     return response;
//   },
//   (error) => {
//     // 响应错误时执行
//     console.error("Response Error:", error);
//     return Promise.reject(error);
//   }
// );

export const fetchArticleById = async ({ queryKey }) => {
  const [_key, path] = queryKey;
  const response = await axObj.get(path);
  return response.data;
};

export const fetchArticlesByLimit = async ({ queryKey }) => {
  const [_key, fetchArticlesByLimitPath] = queryKey;
  const response = await axObj.get(fetchArticlesByLimitPath);
  return response.data;
};

export const fetchArticlesNumber = async ({ queryKey }) => {
  const [_key, path] = queryKey;
  const response = await axObj.get(path);
  return response.data;
};

export const updateArticleById = async ({ newData }) => {
  const { path, updateData } = newData;
  console.log(`http://localhost:8080${path}`);
  console.log(updateData);
  const response = await axObj.put(path, updateData);
  return response.data;
};

export const fetchTrendingArticlesByLimit = async ({ queryKey }) => {
  const [_key, fetchArticlesByLimitPath] = queryKey;
  const response = await axObj.get(fetchArticlesByLimitPath);
  return response.data;
};

export const fetchArticlesByContent = async ({ queryKey }) => {
  const [_key, Path] = queryKey;
  const response = await axObj.get(Path);
  return response.data;
};

export const fetchArticlesTitleByLimit = async ({ queryKey }) => {
  const [_key, Path] = queryKey;
  const response = await axObj.get(Path);
  return response.data;
};

export const fetchArticlesByAuthorId = async ({ queryKey }) => {
  const [_key, data] = queryKey;
  try {
    const response = await axObj.get(data, config);
    return response.data;
  } catch (error) {
    return { redirectTo: '/home', renderComponent: <Login /> };
  }
};

export const fetchUserById = async ({ queryKey }) => {
  const [_key, data] = queryKey;
  const response = await axObj.get(data);
  return response.data;
};

export const loginRequest = async (data) => {
  const response = await axObj.post("/users/login", data);
  // localStorage.setItem('token',response.data);
  return response;
};

export const fetchUserByToken = async({queryKey}) =>{
  const [_key, path] = queryKey;
  const response = await axObj.get(path, config);
  return response.data;
}

export const createNewArticle = async(data) => {
  const response = await axObj.post("/users/login", data);
  return response;
}