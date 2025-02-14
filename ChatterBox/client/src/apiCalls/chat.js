import { axiosInstance } from "./index";

export const getAllChats = async () => {
  try {
    const response = await axiosInstance.get("api/chat/get-all-chats");
    return response.data;
  } catch (err) {
    return err;
  }
};
