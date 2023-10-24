import HomePage from './components/Pages/HomePage';
import styles from './page.module.scss';

export default function Home(): JSX.Element {
  return (
    <main className={styles.main}>
      <HomePage />
    </main>
  );
}
