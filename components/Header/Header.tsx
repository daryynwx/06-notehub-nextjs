import styles from './Header.module.css';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={styles.navigation}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/notes">Notes</Link></li>
        </ul>
      </nav>
    </header>
  );
}