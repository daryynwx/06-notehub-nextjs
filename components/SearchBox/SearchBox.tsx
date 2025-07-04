'use client';
import { useState } from 'react';
import styles from './SearchBox.module.css';

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: Props) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search notes..."
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Search</button>
    </form>
  );
}
