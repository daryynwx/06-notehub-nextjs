'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import { Note } from '@/types/note';
import styles from './NoteList.module.css';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  if (!Array.isArray(notes) || notes.length === 0) {
    return <p>No notes found.</p>;
  }

  return (
    <ul className={styles.list}>
      {notes.map(note => (
        <li className={styles.listItem} key={note.id}>
          <div className={styles.header}>
            <h3 className={styles.title}>{note.title}</h3>
            <span className={styles.tag}>{note.tag}</span>
          </div>

          <p className={styles.content}>{note.content}</p>
          <p className={styles.date}>
            {new Date(note.createdAt).toLocaleString()}
          </p>

          <div className={styles.footer}>
            <Link className={styles.viewBtn} href={`/notes/${note.id}`}>
              View details
            </Link>
            <button
              className={styles.deleteBtn}
              onClick={() => mutate(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
