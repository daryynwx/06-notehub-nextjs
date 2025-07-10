'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import axios from 'axios';
import { useState, useEffect } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export default function EditNotePage() {
  const { id } = useParams();
  const router = useRouter();
  const noteId = Number(id);

  const { data: note, isLoading } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('Todo');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTag(note.tag);
    }
  }, [note]);

  const mutation = useMutation({
    mutationFn: async () => {
      await axios.patch(`${API_BASE}/notes/${noteId}`, {
        title,
        content,
        tag,
      }, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
    },
    onSuccess: () => router.push(`/notes/${noteId}`),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Note #{noteId}</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <br />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <br />
      <select value={tag} onChange={(e) => setTag(e.target.value)}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>
      <br />
      <button onClick={() => mutation.mutate()}>
        {mutation.isPending ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
}
