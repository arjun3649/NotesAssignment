import api from "./axiosConfig";
import useAuthStore from "../src/store/authStore";


export interface User {
  user_id: string;
  user_name: string;
  user_email: string;
  last_update: string;
  created_on: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginCredentials {
  user_email: string;
  password: string;
}

export interface SignupData {
  user_name: string;
  user_email: string;
  password: string;
}


export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/users/login", credentials);

  if (response.data.access_token) {
    useAuthStore.getState().login(response.data.access_token);
  }

  return response.data;
};

export const signup = async (
  userData: SignupData
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/users/signup", userData);
  return response.data;
};
