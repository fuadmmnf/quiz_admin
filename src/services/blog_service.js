import { api } from "boot/axios";


export async function updateBlog(id, blogData) {
  try {
    const { data, status } = await api.patch(
      `/blogs/${id}`,
      blogData
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
