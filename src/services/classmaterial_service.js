import { api } from "boot/axios";


export async function updateClassMaterialStatus(classMaterialId, statusData) {
  try {
    const { data, status } = await api.patch(
      `/class-materials/${classMaterialId}`,
      statusData
    );
    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error };
  }
}
// export async function deleteQuestionBank(questionBankId) {
//   try {
//     const { data, status } = await api.delete(
//       `/questionbanks/${questionBankId}`
//     );
//     return { data, status, error: null };
//   } catch (error) {
//     return { data: null, status: null, error };
//   }
// }
