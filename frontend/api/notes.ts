import api from "./axiosConfig";


export interface Note {
  note_id: string;
  user_id: string;
  note_title: string;
  note_content: string | null;
  last_update: string; 
  created_on: string;   
}


export const getNotes = async (): Promise<Note[]> => {
  const response = await api.get<{ notes: Note[] }>("/notes/");
  return response.data.notes;
};

export const getNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<{ note: Note }>(`/notes/${id}`);
  return response.data.note;
};

export const createNote = async (
  noteData: Pick<Note, "note_title" | "note_content">
): Promise<Note> => {
  const response = await api.post<Note>("/notes/new_note", noteData);
  return response.data;
};

export const updateNote = async ({
  id,
  noteData,
}: {
  id: string;
  noteData: Partial<Pick<Note, "note_title" | "note_content">>;
}): Promise<Note> => {
  const response = await api.put<Note>(`/notes/edit/${id}`, noteData);
  return response.data;
};

export const deleteNote = async (
  id: string
): Promise<{ success: boolean }> => {
  const response = await api.delete<{ success: boolean }>(`/notes/${id}`);
  return response.data;
};