import { STP_TOKEN } from "./config";

export const getDefaultHeaders = () => {
  const headers = {};

  headers["Content-Type"] = "application/json";

  return headers;
};
export const processError = (error) => {
  if (error.response && error.response.data) {
    if (error.response.status === 401) {
      localStorage.removeItem(STP_TOKEN);
      // window.location.href = "/auth";
    }

    return error.response.data;
  }

  return error;
};
