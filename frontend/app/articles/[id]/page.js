"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "../../utils/api";
import { useParams, useRouter } from "next/navigation";

const article = () => {
  const { id } = useParams();
  const router = useRouter();

  const [article, setArticle] = useState();

  useEffect(() => {
    fetchArticle();
  }, []);

  async function fetchArticle() {
    const payload = {
      id,
    };
    const response = await apiRequest("/article", "POST", payload);
    if (response?.data) {
      setArticle(response?.data);
    }
  }

  return (
    <div className="bg-white text-black w-full min-h-screen pt-[68px] px-20">
      <div className="flex justify-between items-baseline">
        <h1 className="text-[24px]">{article?.heading}</h1>
        <span
          className="cursor-pointer bg-black text-white rounded-full px-3 my-1"
          onClick={() => router.back()}
        >
          Go Back
        </span>
      </div>
      {article && (
        <>
          <div className="flex mt-2 gap-2">
            <div className="bg-green-300 rounded-full px-2">
              <span>category: </span>
              <span>{article?.category}</span>
            </div>
            <div className="bg-yellow-300 rounded-full px-2">
              <span>source: </span>
              <span>{article?.source}</span>
            </div>
            <div className="bg-orange-300 rounded-full px-2">
              <span>arthur: </span>
              <span>{article?.arthur}</span>
            </div>
          </div>
          <span>
            {new Date(article?.updated_at).toLocaleDateString("en-GB")}
          </span>
        </>
      )}
      <div>{article?.description}</div>
    </div>
  );
};
export default article;
