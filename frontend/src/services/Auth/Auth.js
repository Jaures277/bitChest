import axios from "axios";
const baseUrl = import.meta.env.VITE_BASEURL

export async function loginUser(user) {
  const  data  = axios.post(`${baseUrl}/login`,{ email: user.email, password: user.password });
  return data;
}

