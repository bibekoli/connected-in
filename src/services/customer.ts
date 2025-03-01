import axios, { AxiosResponse } from "axios";

export const getCustomersData = async () => {
  try {
    const customerResponse = await axios.get("/mock/customers.json") as AxiosResponse<User[]>;
    const customers = customerResponse.data;
    return customers;
  }
  catch (error) {
    console.error("Get customers error:", error);
    throw error;
  }
};