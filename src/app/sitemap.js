import React from "react";
import { useAppProvider } from "./context/AppProvider";
import { getApiUrl } from "@/utils/getApiUrl";
import { Id_PER_PAGE } from "@/config/constants";
async function sitemap() {
  const response = await fetch(
    `http://localhost:3000/api/ads/get/sitemap/0/50`
  );
  const data = await response.json();
  let ids = [];
  if (data.status == 201) {
    ids = data?.idsCard.map((item) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/view/${item?.title}?id=${item?._id}`,
        lastModified: item?.updatedAt,
      };
    });
  }

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
