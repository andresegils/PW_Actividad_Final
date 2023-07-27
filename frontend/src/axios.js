import axios from "axios";

const baseURL = 'https://arcadestation.pythonanywhere.com/'

export const axiosInstance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer"
    },
    mode: 'no-cors'
})