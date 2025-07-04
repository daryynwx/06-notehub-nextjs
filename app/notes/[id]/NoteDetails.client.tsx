'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import styles from '@/styles/NoteDetails.module.css';

export default function NoteDetailsClient() {
  const params = useParams();
  const id = Number(params?.id);

  const { data: note, isLoading, error } = useQuery({ queryKey: ['note', id], queryFn: () => fetchNoteById(id) });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.header}>
          <h2>{note.title}</h2>
          <button className={styles.editBtn}>Edit note</button>
        </div>
        <p className={styles.content}>{note.content}</p>
        <p className={styles.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}