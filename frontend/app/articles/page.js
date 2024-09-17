"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";
import PanelBox from "../components/common/PanelBox";
import { useRouter } from "next/navigation";

const Articles = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
    getArticles();
  }, []);

  async function getArticles() {
    const response = await apiRequest("/get-articles", "GET");

    if (response?.data) {
      setArticles(response?.data);
    }
  }

  return (
    <div className="bg-white text-black w-full min-h-screen pt-[68px] px-20">
      <h1 className="text-[1.5rem]">
        <span className="font-semibold">{userName}</span>, Welcome back!
      </h1>
      <div className="mt-5">
        <h5 className="text-lg font-semibold text-center">Latest Articles</h5>

        {/* filters */}
        <div className="mt-5 w-full text-end">
          <span>Filters:</span>
          <select
            name="cars"
            id="cars"
            className="mx-5 bg-slate-50 px-3 py-2 rounded"
          >
            <option value="">Filter by arthur</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>

        {/* render data */}
        <div className="mt-5">
          {articles.map((el) => {
            return (
              <PanelBox className="m-3">
                <div className="cursor-pointer" onClick={() => router.push(`/articles/${el.id}`)}>
                  <h3 className="">{el.heading}</h3>
                  <div className="flex mt-2 gap-2">
                    <div className="bg-green-300 rounded-full px-2">
                      <span>category: </span>
                      <span>{el.category}</span>
                    </div>
                    <div className="bg-yellow-300 rounded-full px-2">
                      <span>source: </span>
                      <span>{el.source}</span>
                    </div>
                    <div className="bg-orange-300 rounded-full px-2">
                      <span>arthur: </span>
                      <span>{el.arthur}</span>
                    </div>
                  </div>
                </div>
              </PanelBox>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Articles;
