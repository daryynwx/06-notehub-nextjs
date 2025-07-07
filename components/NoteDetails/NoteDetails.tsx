'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Link from 'next/link';
import styles from './NoteDetails.module.css';

export default function NoteDetailsClient() {
  const { id } = useParams();

  const noteId = Number(id);

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={styles.content}>{note.content}</p>
        <p className={styles.date}>{new Date(note.createdAt).toLocaleString()}</p>
        <div className={styles.actions}>
          <Link href={`/notes/${note.id}/edit`} className={styles.editBtn}>
            Edit card
          </Link>
        </div>
      </div>
    </div>
  );
}
