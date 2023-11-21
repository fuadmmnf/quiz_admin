import { api } from "boot/axios";


export async function loadFaculties(params = {}) {
  try {
    const { data, status } = await api.get("/categories/faculty?limit=0", {
      params,
    });

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function loadInstitution(params = {}) {
  try {
    const { data, status } = await api.get(
      "/categories/institution?limit=0",
      {
        params,
      }
    );

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

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
