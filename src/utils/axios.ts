import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_POKEMON_API_URL,
  timeout: 10 * 60 * 1000,
  withCredentials: false,
  headers: {
    "Content-type": "application/json",
    "X-Api-Key": import.meta.env.VITE_POKEMON_API_KEY,
  },
});

export default instance;
