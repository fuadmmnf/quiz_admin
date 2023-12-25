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

export async function loadSubjects(params = {}) {
  try {
    const { data, status } = await api.get(
      "/categories/subject?limit=0",
      {
        params,
      }
    );

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function editCategory(categoryId, categoryData) {
  try {
    const { data, status } = await api.patch(`/categories/${categoryId}`, categoryData);
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function addCategory(categoryData) {
  try {
    const { data, status } = await api.post("/categories", categoryData);
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}


