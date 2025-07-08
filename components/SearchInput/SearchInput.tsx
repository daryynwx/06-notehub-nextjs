'use client';

import { ChangeEvent } from 'react';
import styles from './SearchInput.module.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search notes..."
      value={value}
      onChange={handleChange}
      className={styles.input}
    />
  );
}
