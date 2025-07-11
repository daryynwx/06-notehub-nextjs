'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import NoteForm from '../NoteForm/NoteForm';
import styles from './NoteModal.module.css';

interface NoteModalProps {
  onClose: () => void;
}

export default function NoteModal({ onClose }: NoteModalProps) {
  // Закриття по Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Блокування прокрутки
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <NoteForm onSuccess={onClose} />
      </div>
    </div>,
    document.body
  );
}
