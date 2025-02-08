import { notFound } from "next/navigation";
import React from "react";

async function sitemap() {
  const response = await fetch(`/api/ads/get/smap/0/50`, { cache: "no-store" });
  const data = await response.json();
  let ids = [];
  ids = data?.idsCard.map((item) => {
    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/view/${item?.title}?id=${item?._id}`,
      lastModified: item?.updatedAt,
    };
  });

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/view`,
      lastModified: new Date(),
    },
    ...ids,
  ];
}

export default sitemap;
