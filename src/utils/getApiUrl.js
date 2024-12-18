// utils/getApirUrl.ts

import { API_URL } from "@/config/constants";

export const getApiUrl = (offset, limit) => {
  return `${API_URL}?_start=${offset}&_limit=${limit}`;
};
