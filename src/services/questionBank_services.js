import { api } from "boot/axios";

export async function getQuestionBanks(params = {}) {
  try {
    const { data, status } = await api.get("/questionbanks", {
      params,
    });

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function addQuestionBank(questionBankData) {
  try {
    const { data, status } = await api.post("/questionbanks", questionBankData);
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function editQuestionBank(questionBankData) {
  try {
    const { data, status } = await api.patch(
      `/questionbanks/${questionBankData.id}`,
      questionBankData
    );
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}

export async function updateQuestionBankStatus(questionBankId, statusData) {
  try {
    const { data, status } = await api.patch(
      `/questionbanks/${questionBankId}/status`,
      statusData
    );
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
export async function deleteQuestionBank(questionBankId) {
  try {
    const { data, status } = await api.delete(
      `/questionbanks/${questionBankId}`
    );
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
