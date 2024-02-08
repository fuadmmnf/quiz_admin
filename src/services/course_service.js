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

export async function createClassMaterial(params = {}) {
  try {
    const {data, status, error} = await api.post(`/class-materials`, params);

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function editClassMaterial(material_id, params = {}) {
  try {
    const { data, status, error } = await api.patch(`/class-materials/${material_id}`, params);

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
