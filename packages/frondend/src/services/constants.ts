export const $NODE_ENV = process.env.NODE_ENV;
export const IS_DEV = $NODE_ENV === "development";
export const API_URL = process.env.API_URL;
export const BASE_URL = process.env.BASE_PATH;
export const HTTP_CREDENTIALS = process.env.HTTP_CREDENTIALS;
export const HTTP_MODE = process.env.HTTP_MODE;
export const API_PATH = "api";
export const WEATHER_API_KEY= process.env.WEATHER_API_KEY;
export const BASE_API_PATH = `${API_URL}/${API_PATH}`;

