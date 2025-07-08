'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchNoteById, updateNoteById } from '@/lib/api';
import { useState, useEffect } from 'react';

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

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const mutation = useMutation({
    mutationFn: () => updateNoteById(noteId, { title, content }),
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
      <button onClick={() => mutation.mutate()}>Save</button>
    </div>
  );
}
