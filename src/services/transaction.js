import {api} from "boot/axios";

export async function getTransactions(params = {}) {
  try {
    const { data, status } = await api.get("/transactions", {
      params,
    });

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
