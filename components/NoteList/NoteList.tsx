import { Note } from '@/types/note';
import styles from './NoteList.module.css';
import Link from 'next/link';

type Props = {
  notes: Note[];
};

export default function NoteList({ notes }: Props) {
  if (!Array.isArray(notes) || notes.length === 0) {
    return <p>No notes found.</p>;
  }

  return (
    <ul className={styles.list}>
      {notes.map(note => (
        <li className={styles.item} key={note.id}>
          <div className={styles.header}>
            <h3>{note.title}</h3>
            <span className={styles.tag}>{note.tag}</span>
          </div>
          <p className={styles.content}>{note.content}</p>
          <p className={styles.date}>{new Date(note.createdAt).toLocaleString()}</p>
          <div className={styles.actions}>
            <Link className={styles.viewBtn} href={`/notes/${note.id}`}>
              View details
            </Link>
            <button className={styles.deleteBtn}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
