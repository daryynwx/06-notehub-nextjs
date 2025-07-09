'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import styles from './NoteForm.module.css';

interface NoteFormProps {
  onSuccess: () => void;
}

interface NoteFormValues {
  title: string;
  content: string;
  tag: string;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  content: Yup.string(), // Optional
  tag: Yup.string().required('Tag is required'),
});

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export default function NoteForm({ onSuccess }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (values: NoteFormValues) => {
      await axios.post(
        `${API_BASE}/notes`,
        values,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onSuccess();
    },
  });

  const initialValues: NoteFormValues = {
    title: '',
    content: '',
    tag: 'Todo',
  };

  return (
    <div>
      <h2 className={styles.title}>Create Note</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: NoteFormValues, { resetForm }: any) => {
          mutation.mutate(values);
          resetForm();
        }}
      >
        <Form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <Field name="title" type="text" className={styles.input} />
            <ErrorMessage name="title" component="div" className={styles.error} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content">Content</label>
            <Field as="textarea" name="content" className={styles.textarea} />
            <ErrorMessage name="content" component="div" className={styles.error} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" name="tag" className={styles.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="div" className={styles.error} />
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.submitButton} disabled={mutation.isPending}>
              {mutation.isPending ? 'Creating...' : 'Create Note'}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
