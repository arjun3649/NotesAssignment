import api from "./axiosConfig";
import useAuthStore from "../src/store/authStore";

export const login = async (credentials) => {
  const response = await api.post("/users/login", credentials);
  if (response.data.access_token) {
    useAuthStore.getState().login(response.data.access_token);
  }
  return response.data;
};

export const signup = async (userData) => {
  const response = await api.post("/users/signup", userData);
  return response.data;
};
