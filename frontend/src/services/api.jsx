import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const instance = axios.create({
  withCredentials: true,
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

  registerLesson: async (formData) => {
    try {
      const res = await instance.post("/lesson", formData);
      return res.data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },

  getUserInfo: async (id) => {
    try {
      const res = await instance.get(`/users/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },
  editUser: async (id, data) => {
    try {
      const res = await instance.put(`/users/${id}`, data);
      return res.data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },
  updateProfilePicture: async (id, data) => {
    try {
      const res = await instance.put(`/upload/avatar/${id}`, data);
      return res.data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },
  getFinishedLessons: async (id) => {
    try {
      const res = await instance.get(`/finishedlesson/userid/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },
  getCurrentUser: async () => {
    try {
      const res = await instance.get(`/currentuser`);
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        await api.refreshToken();
        const res = await instance.get(`/currentuser`);
        return res.data;
      }
      return undefined;
    }
  },

  refreshToken: async () => {
    try {
      const res = await instance.post(`/refresh`);
      return res.data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },
};

export default {
  api,
};
