// components/PostListInfinite.tsx

"use client";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { Id_PER_PAGE } from "@/config/constants";
import { getIds } from "@/actions/getIds";
import IdCard from "./IdCard";
import IdCard2 from "./IdCard2";
import { messengers } from "@/config/constants";

export default function IdListInfinite({ initialIds }) {
  const [offset, setOffset] = useState(Id_PER_PAGE);
  const [ids, setIds] = useState(initialIds);
  const [hasMoreData, setHasMoreData] = useState(true);
  const scrollTrigger = useRef(null);

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
    <div >
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8">
        {messengers?.map((item) => (
          <Suspense key={item.id} fallback={<p>Ey babababa</p>}>
            <IdCard key={item.id} id={item} />
          </Suspense>
        ))}
      </div> */}
  
      <div className="grid grid-cols-1 xl:grid-cols-2  w-full gap-8 container mx-auto ">
        {messengers?.map((item) => (
          <Suspense key={item.id} fallback={<p>Ey babababa</p>}>
            <IdCard2 key={item.id} id={item} />
          </Suspense>
        ))}
      </div>

      <div className="text-center text-slate-600 mt-5">
        {hasMoreData ? (
          <div ref={scrollTrigger}>در حال دریافت ...</div>
        ) : (
          <p className="text-slate-600">کل آیدی ها دریافت شد</p>
        )}
      </div>
    </div>
  );
}
