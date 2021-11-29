import axios from "axios";


const API_URL = "https://private-anon-ed37853152-pizzaapp.apiary-mock.com/";

const baseConfig = {
    baseURL: API_URL,
};

export const $api = axios.create(baseConfig);