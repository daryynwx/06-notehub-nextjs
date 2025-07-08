'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import Pagination from '@/components/Pagination/Pagination';
import styles from '@/styles/NotesPage.module.css';
import { NotesResponse } from '@/types/note';


type Props = {
  initialData: NotesResponse;
};

export default function NotesClient({ initialData }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data = initialData, isLoading, error } = useQuery({
    queryKey: ['notes', page],
    queryFn: () => fetchNotes(page),
    initialData,
  });

  const filteredNotes = useMemo(() => {
    if (!data) return [];
    return data.notes.filter(note =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const handlePageChange = (selected: { selected: number }) => {
    setPage(selected.selected + 1);
  };

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <main className={styles.container}>
      <div className={styles.toolbar}>
        <NoteForm />
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <NoteList notes={filteredNotes} />

      {data.totalPages > 1 && (
        <Pagination pageCount={data.totalPages} onPageChange={handlePageChange} />
      )}
    </main>
  );
}