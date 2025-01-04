import apiClient from "../Axios.js";

export const getNotes = () => {
  return apiClient
    .get("/notes")
    .then((response) => response.data.data.notes)
    .catch((error) => {
      console.error(
        "Notes access error:",
        error.response?.data || error.message,
      );
      throw error;
    });
};

export const createNote = ({ title, content }) => {
  const requestData = {
    title: title.trim(),
    content: content.trim() || null,
  };

  return apiClient
    .post("/notes", requestData)
    .then((response) => ({
      status: response.data.status,
      code: response.data.code,
      data: response.data.data,
    }))
    .catch((error) => {
      console.error(
        "Error creating note:",
        error.response?.data || error.message,
      );
      throw error;
    });
};

export const deleteNote = (noteId) => {
  return apiClient.delete(`/notes/${noteId}`);
};
