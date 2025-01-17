// components/PostListInfinite.tsx

"use client";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { Id_PER_PAGE } from "@/config/constants";
import { getIds } from "@/actions/getIds";
import IdCard from "./IdCard";
import IdCard2 from "./IdCard2";
import { messengers } from "@/config/constants";
import { off } from "process";
import LOADING from "../pages/LOADING";
import { useAppProvider } from "@/app/context/AppProvider";

export default function IdListInfinite({ initialIds, bookmarksId }) {
  const [offset, setOffset] = useState(Id_PER_PAGE);
  const [ids, setIds] = useState(initialIds);
  const [userBookmarks, setUserBookmarks] = useState(bookmarksId);
  const [hasMoreData, setHasMoreData] = useState(true);
  const scrollTrigger = useRef(null);
  const { filterList } = useAppProvider();
  console.log("filterList 111--->", filterList);

  useEffect(() => {
    setIds(() => initialIds.filter((item) => item.messenger == 1));
  }, [filterList]);

  const loadMoreIds = async () => {
    if (hasMoreData) {
      const apiIds = await getIds(offset, Id_PER_PAGE);

      if (!apiIds.length) {
        setHasMoreData(false);
      }

      setIds((prevIds) => [...prevIds, ...apiIds]);
      setOffset((prevOffset) => prevOffset + Id_PER_PAGE);
    }
  };

  useEffect(() => {
    console.log("filterList Effect--->", filterList);
  }, []);
  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreIds();
        }
      },
      { threshold: 0.5 }
    );

    if (scrollTrigger.current) {
      observer.observe(scrollTrigger.current);
    }

    return () => {
      if (scrollTrigger.current) {
        observer.unobserve(scrollTrigger.current);
      }
    };
  }, [hasMoreData, offset]);

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2  w-full gap-8 container mx-auto ">
        {ids?.map((item) => (
          <Suspense
            key={item._id}
            fallback={
              <p className="w-full flex items-center justify-center">
                در انتظار دریافت
              </p>
            }
          >
            <IdCard2 key={item._id} item={item} bookmarks={bookmarksId} />
          </Suspense>
        ))}
      </div>

      <div className="text-center text-slate-600 mt-5">
        {hasMoreData ? (
          <div ref={scrollTrigger}>
            <LOADING />
          </div>
        ) : (
          <p className="text-slate-600">کل آیدی ها دریافت شد</p>
        )}
      </div>
    </div>
  );
}
