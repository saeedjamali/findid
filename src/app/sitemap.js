import { notFound } from "next/navigation";
import React from "react";

async function sitemap() {
  const response = await fetch(`https://findid.ir/api/ads/get/smap/0/50`, { cache: "no-store" });
  const data = await response.json();
  let ids = [];
  ids = data?.idsCard.map((item) => {
    return {
      url: `https://findid.ir/view/${item?.title}?id=${item?._id}`,
      lastModified: item?.updatedAt,
    };
  });

  return [
    {
      url: `https://findid.ir`,
      lastModified: new Date(),
    },
    {
      url: `https://findid.ir/view`,
      lastModified: new Date(),
    },
    ...ids,
  ];
}

export default sitemap;
