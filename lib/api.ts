// lib/api.ts
import axios from 'axios';
import { NotesResponse, Note } from '@/types/note';

export async function updateNoteById(
  id: number,
  data: { title: string; content: string }
): Promise<Note> {
  const response = await axios.patch(`${API_BASE}/notes/${id}`, data, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data;
};


const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes = async (): Promise<NotesResponse> => {
  const { data } = await axios.get<NotesResponse>(`${API_BASE}/notes`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const { data } = await axios.get<Note>(`${API_BASE}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return data;
};

export const deleteNote = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};

