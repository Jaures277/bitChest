import axios from "axios";

export async function loginUser(user) {
  const  data  = axios.post(`${process.env.BASE_URL}/login`,{ email: user.email, password: user.password });
  return data;
}