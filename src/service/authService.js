import axios from "./axiosInstance";

export const login = (credentials) =>
  axios.post("/auth/login", credentials);

export const register = (userData) =>
  axios.post("/auth/register", userData);
