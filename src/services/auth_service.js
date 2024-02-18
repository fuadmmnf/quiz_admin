import {api} from "boot/axios";

export async function getUsers(params = {}) {
  try {
    const { data, status } = await api.get("/users", {
      params,
    });

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function getActivityLogs(params = {}) {
  try {
    const { data, status } = await api.get("/activity_logs", {
      params,
    });

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function deleteUser(id) {
  try {
    const { status } = await api.delete(`/users/${id}`);
    return { status, error: null };
  } catch (error) {
    console.error("Error in deleteUser:", error);
    return { status: null, error };
  }
}
