import axios from "axios"

export const getToken = () => localStorage.getItem("accessToken")
    ? JSON.parse(localStorage.getItem("accessToken"))?.token
    : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

const baseUrl = import.meta.env.VITE_BASEURL
console.log(baseUrl, 'uuuuuuuuuuuuuuuuuuuuuuuu')
const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 1000,
    headers: {
        'Accept': 'application/json',
        'Authorization': getAuthorizationHeader(), // Remplacez 'token' par votre token valide
    },
});


/*axiosInstance.interceptors.request.use(
    (request) => {
        if (request.headers) {
            //request.headers.common['Accept'] = 'application/json';
            request.headers.common['Authorization'] = getAuthorizationHeader();
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
)*/

export default axiosInstance;