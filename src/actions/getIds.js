// actions/getPosts.ts

"use server";
import { getApiUrl } from "@/utils/getApiUrl";
import { handleError } from "@/utils/handleError";

export const getIds = async (offset, limit) => {
  const url = getApiUrl(offset, limit);
  // console.log("filterList--->", filterList);
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log("Data is --->", data);
    if (!response.ok) {
      throw await handleError(response);
    }
    const idsCard = data.idsCard;

    return idsCard;
  } catch (error) {
    console.error(error);
    throw new Error(`An error happened: ${error}`);
  }
};
