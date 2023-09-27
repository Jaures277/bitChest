import axiosInstance, { getAuthorizationHeader } from "../axiosInstance/axiosInstance";

const baseUrl = import.meta.env.VITE_BASEURL

export async function getWallet(status) {
  const  data = axiosInstance.post(`${baseUrl}/dealings`, {state: status}, {
    headers: { Authorization: getAuthorizationHeader() }
  });
  return data;
}

export async function sellCurrencies(id) {
  const  data = axiosInstance.post(`${baseUrl}/sell/transaction/${id}`);
  return data;
}

export async function getInfoWallet() {
  const  data = axiosInstance.get(`${baseUrl}/wallet/client`, {
    headers: { Authorization: getAuthorizationHeader() }
});
  return data;
}

export async function getHistorikDealing() {
  const  data = axiosInstance.get(`${baseUrl}/all/dealings/user`, {
    headers: { Authorization: getAuthorizationHeader() }
  });
  return data;
}
