import styles from './HookCard.module.css';

export default function HookCard({
  name,
  tagline,
}: {
  name: string;
  tagline: string;
}) {
  return (
    <li className={styles.hook}>
      <a href={`/${name.toLowerCase()}`}>
        <h3 className={styles["card-title"]}>{name}</h3>
        <p className={styles["card-description"]}>{tagline}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles.arrow}
          viewBox="0 0 36 24"
        >
          <path
            fill="none"
            stroke="#12b2e2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1.86 12h30.18M21.31 1.15 34.14 12 21.31 22.85"
          />
        </svg>
      </a>
    </li>
  );
}
