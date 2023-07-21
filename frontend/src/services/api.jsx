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

  getCourseById: async (id) => {
    try {
      const res = await instance.get(`/course/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
    return undefined;
  },

  getAllLessons: async () => {
    try {
      const res = await instance.get("/lesson");
      return res.data;
    } catch (error) {
      console.error(error);
    }
    return undefined;
  },

  getLessons: async (id) => {
    try {
      const res = await instance.get(`/course/${id}/lessons`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
    return undefined;
  },

  getLessonById: async (id) => {
    try {
      const res = await instance.get(`/lesson/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
    return undefined;
  },

  registerCourse: async (coursedata) => {
    // console.log(id)
    try {
      const res = await instance.post(`/course`, coursedata);
      return res.data;
    } catch (error) {
      console.error(error);
    }
    return undefined;
  },

  deleteCourse: async (id) => {
    try {
      const res = await instance.delete(`/course/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
    return undefined;
  },

  updateCourse: async (id, data) => {
    try {
      const res = await instance.put(`/course/${id}`, data);
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
