import axiosInstance from "../axiosInstance/axiosInstance";

const baseUrl = import.meta.env.VITE_BASEURL

export async function getWallet(status) {
  const  data = axiosInstance.post(`${baseUrl}/dealings`, {state: status});
  return data;
}
