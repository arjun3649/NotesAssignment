import api from "./axiosConfig";

export const getNotes = async () => {
  const response = await api.get("/notes/");
  return response.data.notes;
};

export const getNoteById = async (id) => {
  const response = await api.get(`/notes/${id}`);
  return response.data.note;
};

export const createNote = async (noteData) => {
  const response = await api.post("/notes/new_note", noteData);
  return response.data;
};

export const updateNote = async ({ id, noteData }) => {
  const response = await api.put(`/notes/edit/${id}`, noteData);
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};
