import axios from "axios";

export async function loginUser(user) {
  const  data  = axios.post(`http://127.0.0.1:8001/api/login`,{ email: user.email, password: user.password });
  return data;
}