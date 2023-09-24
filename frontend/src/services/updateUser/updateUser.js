import axiosInstance from "../axiosInstance/axiosInstance";
const baseUrl = import.meta.env.VITE_BASEURL

export const updateUser = async(id, user)=> {
  const  data = await axiosInstance.post(`${baseUrl}/user/${id}`,{ user });
  return data;
}

export async function getUsers() {
  const  data = axiosInstance.get(`${baseUrl}/users`);
  return data;
}

