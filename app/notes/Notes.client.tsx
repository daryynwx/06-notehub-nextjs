'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import styles from '@/styles/NotesPage.module.css';
import { NotesResponse } from '@/lib/api';
import useDebounce from '@/utils/useDebounce';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/NoteModal/NoteModal';
import NoteForm from '@/components/NoteForm/NoteForm';

type Props = {
  initialData: NotesResponse;
};

export default function NotesClient({ initialData }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const { data = initialData, isLoading, error } = useQuery({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes(page, debouncedSearch),
    initialData,
    placeholderData: previous => previous
  });

  const handlePageChange = (selected: { selected: number }) => {
    setPage(selected.selected + 1);
  };

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <main className={styles.container}>
      <div className={styles.toolbar}>
        <button className={styles.button} onClick={() => setShowModal(true)}>
          + Create Note
        </button>

        <SearchBox value={search} onChange={setSearch} />
      </div>

      {data.notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <NoteList notes={data.notes} />
      )}

      {data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          onPageChange={handlePageChange}
          forcePage={page - 1}
        />
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteForm onSuccess={() => setShowModal(false)} />
        </Modal>
      )}
    </main>
  );
}
