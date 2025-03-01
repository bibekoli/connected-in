import axios from "axios";

export const getRegistrationData = async () => {
  try {
    const response = await axios.get("/mock/registration.json");
    return response.data;
  }
  catch (error) {
    console.error("Get registration data error:", error);
    throw error;
  }
};

export const getDailyActiveUsersData = async () => {
  try {
    const response = await axios.get("/mock/active-users-daily.json");
    return response.data;
  }
  catch (error) {
    console.error("Get daily active users error:", error);
    throw error;
  }
};

export const getMessagesSentData = async () => {
  try {
    const response = await axios.get("/mock/daily-messages.json");
    return response.data;
  }
  catch (error) {
    console.error("Get messages sent error:", error);
    throw error;
  }
};

export const getUsersByAge = async () => {
  try {
    const response = await axios.get("/mock/user-by-age.json");
    return response.data;
  }
  catch (error) {
    console.error("Get users by age error:", error);
    throw error;
  }
};

export const getActiveTimeData = async () => {
  try {
    const response = await axios.get("/mock/hourly-active-users.json");
    return response.data;
  }
  catch (error) {
    console.error("Get active time error:", error);
    throw error;
  }
};

export const getTotalUsersData = async () => {
  try {
    const response = await axios.get("/mock/user-by-gender.json");
    return response.data;
  }
  catch (error) {
    console.error("Get total users error:", error);
    throw error;
  }
}

export const getUserByMessages = async () => {
  try {
    const response = await axios.get("/mock/user-by-messages.json");
    return response.data;
  }
  catch (error) {
    console.error("Get user by messages error:", error);
    throw error;
  }
}