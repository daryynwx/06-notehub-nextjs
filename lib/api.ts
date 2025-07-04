import axios from 'axios';
import type { NotesResponse, Note } from '@/types/note';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
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

  if (Array.isArray(data)) {
    return { results: data };
  }

  return {
    results: Array.isArray(data.notes) ? data.notes : [],
  };
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axiosInstance.get(`/notes/${id}`);
  return response.data;
};
