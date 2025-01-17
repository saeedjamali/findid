// utils/getApirUrl.ts

import { API_URL } from "@/config/constants";

export const getApiUrl = (offset, limit) => {
  return `${API_URL}/${offset}/${limit}`;
  // /api/ads/get/all/${offset}/${limit}`;
};
