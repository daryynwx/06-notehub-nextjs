// components/NoteModal/NoteModal.tsx
'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './NoteModal.module.css';

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

export default function NoteModal({ onClose, children }: Props) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}