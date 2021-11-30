import axios from "axios";


const API_URL = "https://private-anon-ed37853152-pizzaapp.apiary-mock.com/";

const API2_URL = "https://www.themealdb.com/api/json/v1/1/";

const baseConfig = {
    baseURL: API_URL,
};

const baseConfig2 = {
    baseURL: API2_URL,
};

export const $api = axios.create(baseConfig);

export const $apirecipes = axios.create(baseConfig2)