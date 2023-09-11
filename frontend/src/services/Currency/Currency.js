import axiosInstance, { getAuthorizationHeader } from "../axiosInstance/axiosInstance";
const baseUrl = import.meta.env.VITE_BASEURL

export async function getCurrencies() {
  const  data = axiosInstance.get(`${baseUrl}/currencies`, {
    headers: { Authorization: getAuthorizationHeader() }
});
  return data;
}
