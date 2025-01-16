// utils/getApirUrl.ts

import { API_URL } from "@/config/constants";

export const getApiUrl = (offset, limit) => {
  return `${API_URL}/${offset}/${limit}`;
  // return `${API_URL}/start=${offset}/limit=${limit}`;
};
