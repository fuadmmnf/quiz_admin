import {api} from "boot/axios";

export async function getStudents(params = {}) {
  try {
    const { data, status } = await api.get("/students", {
      params,
    });
    console.log(params);

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
