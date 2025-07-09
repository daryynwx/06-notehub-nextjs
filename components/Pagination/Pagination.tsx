'use client';

import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  forcePage: number;
}

export default function Pagination({
  pageCount,
  onPageChange,
  forcePage,
}: PaginationProps) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={onPageChange}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      forcePage={forcePage}
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
