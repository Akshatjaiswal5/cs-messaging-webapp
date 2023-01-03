import axios from "axios";
var API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export const getAllMessages = async () => {
  try {
    const response = await axios.get(API_URL + "/messages");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
