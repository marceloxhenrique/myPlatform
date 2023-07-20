import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const instance = axios.create({
  baseURL: BACKEND_URL,
});

export const api = {
  getAllCourses: async () => {
    try {
      const res = await instance.get("/course");
      return res.data;
    } catch (error) {
      console.error(error);
    }
    return undefined;
  },
};

export default {
  api,
};
