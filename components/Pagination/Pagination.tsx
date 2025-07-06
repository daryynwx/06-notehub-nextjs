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
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel="<"
      containerClassName={styles.container}
      activeClassName={styles.active}
      pageClassName={styles.page}
      previousClassName={styles.arrow}
      nextClassName={styles.arrow}
    />
  );
}
