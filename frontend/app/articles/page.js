"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api"

const Articles = () => {
  const [userName, setUserName] = useState("");
  const [articles, setArticles] = useState([])

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
    getArticles()
  }, []);

  async function getArticles() {
    const response = await apiRequest('/getArticles', 'GET')
    console.log('response => ', response)
  }

  return (
    <div className="bg-white text-black w-full h-screen pt-[68px] px-20">
      <h1 className="text-[1.5rem]">
        <span className="font-semibold">{userName}</span>, Welcome back!
      </h1>
      <div className="mt-5">
        <span className="text-lg">Latest Articles</span>
        <div>

        </div>
      </div>
    </div>
  );
};
export default Articles;
