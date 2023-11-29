import {api} from "boot/axios";

export async function getExams(params = {}) {
  try {
    const { data, status } = await api.get("/exams", {
      params,
    });

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
