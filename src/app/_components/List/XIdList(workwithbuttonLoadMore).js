// components/PostList.tsx

"use client";
import { getIds } from "@/actions/getIds";
import { Id_PER_PAGE } from "@/config/constants";

import { useState } from "react";
import IdCard from "./IdCard";

export default function IdList({ initialIds }) {
  const [offset, setOffset] = useState(Id_PER_PAGE);
  const [Ids, setIds] = useState(initialIds);
  const [hasMoreData, setHasMoreData] = useState(true);

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

  return (
    <>
      <div className="">
        {Ids?.map((id) => (
          <IdCard key={id.id} id={id} />
        ))}
      </div>
      <div className="text-center mt-5">
        {hasMoreData ? (
          <button
            className="px-4 py-3 bg-slate-500 hover:bg-slate-600 text-slate-50 rounded-md"
            onClick={loadMoreIds}
          >
            Load More Ids
          </button>
        ) : (
          <p className="text-slate-600">No more Ids to load</p>
        )}
      </div>
    </>
  );
}
