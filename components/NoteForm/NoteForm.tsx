'use client';

import { useState } from 'react';
import styles from './NoteForm.module.css';
import NoteModal from '@/components/NoteModal/NoteModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export default function NoteForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('Todo');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      await axios.post(
        `${API_BASE}/notes`,
        { title, content, tag },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      closeModal();
      setTitle('');
      setContent('');
      setTag('Todo');
    },
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <>
      <button className={styles.submitButton} onClick={openModal}>
        Create Note +
      </button>

      {isOpen && (
        <NoteModal onClose={closeModal}>
          <h2 className={styles.title}>Create Note</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Content</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                className={styles.textarea}
                required
              ></textarea>
            </div>

            <div className={styles.formGroup}>
              <label>Tag</label>
              <select
                value={tag}
                onChange={e => setTag(e.target.value)}
                className={styles.select}
              >
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
              </select>
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.submitButton}>
                Create Note
              </button>
              <button
                type="button"
                onClick={closeModal}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </NoteModal>
      )}
    </>
  );
}
