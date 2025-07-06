'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import styles from '@/styles/NotesPage.module.css';
import { NotesResponse } from '@/types/note';

type Props = {
  initialNotes: NotesResponse;
};

export default function NotesClient({ initialNotes }: Props) {
  const { data = initialNotes, isLoading, error } = useQuery<NotesResponse>({
    queryKey: ['notes'],
    queryFn: fetchNotes,
    initialData: initialNotes,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <main className={styles.container}>
      <NoteForm />
      <NoteList notes={data.notes} />
    </main>
  );
}
