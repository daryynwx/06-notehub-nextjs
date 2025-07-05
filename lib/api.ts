// lib/api.ts
import axios from 'axios';
import type { NotesResponse, Note } from '@/types/note';

const isBrowser = typeof window !== 'undefined';

const baseURL = isBrowser
  ? '/api' // клієнт використовує proxy rewrite
  : process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL) {
  throw new Error('API baseURL is not defined');
}

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async (): Promise<NotesResponse> => {
  const response = await axiosInstance.get('/notes');
  const data = response.data;
  console.log('fetchNotes data:', data);

  return {
    results: Array.isArray(data) ? data : Array.isArray(data.notes) ? data.notes : [],
  };
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axiosInstance.get(`/notes/${id}`);
  return response.data;
};
