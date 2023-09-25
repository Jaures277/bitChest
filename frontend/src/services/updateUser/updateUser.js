import axios from "axios";
import axiosInstance, { getAuthorizationHeader } from "../axiosInstance/axiosInstance";
const baseUrl = import.meta.env.VITE_BASEURL

export const updateUser = async(id, user)=> {
  const  data = await axiosInstance.put(`${baseUrl}/user/${id}`,{ ...user }, {
    headers: { Authorization: getAuthorizationHeader() }
  });
  return data;
}

export async function getUsers() {
  const  data = axios.get(`${baseUrl}/users`, {
    headers: { Authorization: getAuthorizationHeader() }
  });
  return data;
}

export async function addnewUsers(user) {
  const  data = axiosInstance.post(`${baseUrl}/user`,{ first_name: user.first_name, last_name: user.last_name, email: user.email, password: user.password, status: user.status });
  return data;
}

export const getInfoUser = async(id)=> {
  const  data = await axiosInstance.get(`${baseUrl}/user/${id}`);
  return data;
}

export const updateInfoUser = async(id, user)=> {
  const  data = await axiosInstance.put(`${baseUrl}/user/${id}`, {...user});
  return data;
}

export const deleteUser = async(id)=> {
  const  data = await axiosInstance.delete(`${baseUrl}/user/${id}`);
  return data;
}


