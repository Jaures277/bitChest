import axiosInstance, { getAuthorizationHeader } from "../axiosInstance/axiosInstance";
const baseUrl = import.meta.env.VITE_BASEURL

export async function getCurrencies() {
  const  data = axiosInstance.get(`${baseUrl}/currencies`, {
    headers: { Authorization: getAuthorizationHeader() }
});
  return data;
}

export async function postBuyCurrency(id, quantity) {
  const  data = axiosInstance.post(`${baseUrl}/buy/currency/${id}`, {quantity} );
  return data;
}