import axios from "axios";

export const BASE_URL='https://emsbymohit-production.up.railway.app';

export const myAxios =axios.create({
    baseURL:BASE_URL
});