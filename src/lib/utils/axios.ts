import axios from "axios";


export const serverInstance = axios.create({
    baseURL: process.env.SERVER_URL,
});