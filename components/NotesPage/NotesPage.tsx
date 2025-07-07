// components/NotePage/NotePage.tsx
'use client';

import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import { NotesResponse } from '@/types/note';
import styles from './NotePage.module.css';

interface Props {
  notes: NotesResponse;
}

export default function NotePage({ notes }: Props) {
  return (
    <main className={styles.container}>
      <NoteForm />
      <NoteList notes={notes.notes} />
    </main>
  );
}
