import styles from "./HookSearch.module.css";

export default function HookSearch({
  handleChange,
  handleClear,
  value,
}: {
  handleClear: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) {
  return (
    <div className={styles["hooks-search"]}>
      <input
        onChange={handleChange}
        className={styles.input}
        value={value}
        type="search"
        id="search"
        placeholder="Search"
      />
      <button id="search-cancel" aria-label="Clear" onClick={handleClear}>
        ✕
      </button>
    </div>
  );
}
