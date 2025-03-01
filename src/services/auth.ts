import axios, { AxiosResponse } from "axios";

export const login = async (credentials: LoginFormValues) => {
  try {
    const loginResponse = await axios.get("/mock/account.json") as AxiosResponse<User>;
    const user = loginResponse.data;
    if (user.phone !== credentials.phone || user.password !== credentials.password) {
      throw new Error("Invalid Phone or Password");
    }

    return user;
  }
  catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};