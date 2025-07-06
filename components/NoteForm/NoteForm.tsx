'use client';

import { useState } from 'react';
import styles from './NoteForm.module.css';
import NoteModal from '@/components/NoteModal/NoteModal';

export default function NoteForm() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button className={styles.createBtn} onClick={openModal}>
        Create Note
      </button>

      {isOpen && (
        <NoteModal onClose={closeModal}>
          <h2>Create Note</h2>
          <form className={styles.form}>
            <input
              type="text"
              placeholder="Title"
              className={styles.input}
            />
            <textarea
              placeholder="Content"
              className={styles.textarea}
            ></textarea>
            <div className={styles.actions}>
              <button type="submit" className={styles.submitBtn}>
                Create
              </button>
              <button type="button" onClick={closeModal} className={styles.closeBtn}>
                Cancel
              </button>
            </div>
          </form>
        </NoteModal>
      )}
    </>
  );
}
