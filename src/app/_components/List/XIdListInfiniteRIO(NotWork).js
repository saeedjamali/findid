// components/PostListInfiniteRIO.tsx

"use client";
import { useEffect, useState } from "react";
import { getIds } from "@/actions/getIds";

import { useInView } from "react-intersection-observer";
import { Id_PER_PAGE } from "@/config/constants";
import IdCard from "./IdCard";

export default function IdListInfiniteRIS({ initialIds }) {
  const [offset, setOffset] = useState(Id_PER_PAGE);
  const [ids, setIds] = useState(initialIds);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [scrollTrigger, isInView] = useInView();

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
    if (isInView && hasMoreData) {
      loadMoreIds();
    }
  }, [isInView, hasMoreData]);

  return (
    <>
      <div className="post-list [counter-reset: post-index]">
        {ids?.map((id) => (
          <IdCard key={id.id} id={id} />
        ))}
      </div>

      <div className="text-center text-slate-600 mt-5">
        {(hasMoreData && <div ref={scrollTrigger}>Loading...</div>) || (
          <p className="text-slate-600">No more Id to load</p>
        )}
      </div>
    </>
  );
}
