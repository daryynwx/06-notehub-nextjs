// components/NotePage/NotePage.tsx
'use client';

import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import { NotesResponse } from '@/lib/api';
import styles from './NotePage.module.css';

interface Props {
  notes: NotesResponse;
}

export default function NotePage({ notes }: Props) {
  return (
    <main className={styles.container}>
      <NoteForm onSuccess={function (): void {
        throw new Error('Function not implemented.');
      } } />
      <NoteList notes={notes.notes} />
    </main>
  );
}
