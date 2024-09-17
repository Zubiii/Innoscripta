"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";
import PanelBox from "../components/common/PanelBox";
import Select from "../components/common/Select";
import { useRouter } from "next/navigation";

const Articles = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [articles, setArticles] = useState([]);

  const [arthurs, setArthurs] = useState([]);
  const [sources, setSource] = useState([]);
  const [categories, setCategories] = useState([]);

  const [filterArthur, setFilterArthur] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSource, setFilterSource] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
    getArticles();
  }, []);

  async function getArticles() {
    const response = await apiRequest("/get-articles", "GET");

    if (response?.data) {
      const _articles = response.data;
      setArticles(_articles);

      // get values for filter
      _articles.forEach((el) => {
        // fetch arthur's name
        if (el?.arthur && !arthurs.find((name) => name === el?.arthur)) {
          setArthurs((prevArthurs) => [...prevArthurs, el?.arthur]);
        }

        // fetch categories
        if (el?.category && !categories.find((name) => name === el?.category)) {
          setCategories((preCategories) => [...preCategories, el?.category]);
        }

        // fetch sources name
        if (el?.source && !sources.find((name) => name === el?.source)) {
          setSource((preSources) => [...preSources, el?.source]);
        }
      });
    }
  }

  const filteredArticles = () => {
    let _filteredArticles = articles;

    if (filterArthur.length > 0)
      _filteredArticles = _filteredArticles.filter(
        (el) => el.arthur === filterArthur
      );

    if (filterCategory.length > 0)
      _filteredArticles = _filteredArticles.filter(
        (el) => el.category === filterCategory
      );

    if (filterSource.length > 0)
      _filteredArticles = _filteredArticles.filter(
        (el) => el.source === filterSource
      );

    return _filteredArticles;
  };

  const getFilterArthur = (v) => {
    setFilterArthur(v);
  };
  const getFilterCategory = (v) => {
    setFilterCategory(v);
  };
  const getFilterSource = (v) => {
    setFilterSource(v);
  };

  return (
    <div className="bg-white text-black w-full min-h-screen pt-[68px] px-20">
      <h1 className="text-[1.5rem]">
        <span className="font-semibold">{userName}</span>, Welcome back!
      </h1>
      <div className="mt-5">
        <h5 className="text-lg font-semibold text-center">Latest Articles</h5>

        {/* filters */}
        <div className="mt-5 w-full text-center">
          <span>Filters:</span>
          <Select
            label="Filter by arthur"
            options={arthurs}
            onChange={getFilterArthur}
          />
          <Select
            label="Filter by Category"
            options={categories}
            onChange={getFilterCategory}
          />
          <Select
            label="Filter by Source"
            options={sources}
            onChange={getFilterSource}
          />
        </div>

        {/* render data */}
        <div className="mt-5">
          {filteredArticles().map((el) => {
            return (
              <PanelBox className="m-3" key={el.id}>
                <div
                  className="cursor-pointer"
                  onClick={() => router.push(`/articles/${el.id}`)}
                >
                  <h3 className="">{el.heading}</h3>
                  <div className="flex mt-2 gap-2">
                    {el.category && (
                      <div className="bg-green-300 rounded-full px-2">
                        <span>category: </span>
                        <span>{el.category}</span>
                      </div>
                    )}

                    {el.source && (
                      <div className="bg-yellow-300 rounded-full px-2">
                        <span>source: </span>
                        <span>{el.source}</span>
                      </div>
                    )}
                    {el.arthur && (
                      <div className="bg-orange-300 rounded-full px-2">
                        <span>arthur: </span>
                        <span>{el.arthur}</span>
                      </div>
                    )}
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
