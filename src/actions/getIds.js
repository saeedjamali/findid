// actions/getPosts.ts

"use server";
import { getApiUrl } from "@/utils/getApiUrl";
import { handleError } from "@/utils/handleError";

export const getIds = async (offset, limit) => {
  const url = getApiUrl(offset, limit);

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Data is --->", data);
    if (!response.ok) {
      throw await handleError(response);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`An error happened: ${error}`);
  }
};
