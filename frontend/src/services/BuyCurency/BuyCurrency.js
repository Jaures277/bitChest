import axiosInstance from "../axiosInstance/axiosInstance";

const baseUrl = import.meta.env.VITE_BASEURL

export async function getInfoBuyCurrency(id) {
  const  data = axiosInstance.get(`${baseUrl}/currency/${id}`);
  return data;
}
