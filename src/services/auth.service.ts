import { api } from "@/lib/axios";

export type SignUpData = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export const authService = {
  async signup(data: SignUpData) {
    const response = await api.post("/auth/signup", data);
    return response.data;
  },

  async login(data: LoginData) {
    const response = await api.post("/auth/login", data);
    return response.data;
  },
};
