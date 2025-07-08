// components/Pagination/Pagination.tsx
'use client';

import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';

interface Props {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export default function Pagination({ pageCount, onPageChange }: Props) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={onPageChange}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      pageClassName={styles.page}
      previousClassName={styles.page}
      nextClassName={styles.page}
      breakClassName={styles.page}
      disabledClassName={styles.disabled}
    />
  );
}
