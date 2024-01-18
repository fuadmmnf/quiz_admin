import {api} from "boot/axios";

export async function getCourses(params = {}) {
  try {
    const { data, status } = await api.get("/courses", {
      params,
    });

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function getLectureClasses(params = {}) {
  try {
    const {data, status, error} = await api.get(`/class-lectures`, {
      params,
    });

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function createLectureClass(params = {}) {
  try {
    const {data, status, error} = await api.post(`/class-lectures`, params);

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function editLectureClass(lectureId, params = {}) {
  try {
    const { data, status, error } = await api.patch(`/class-lectures/${lectureId}`, params);

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
