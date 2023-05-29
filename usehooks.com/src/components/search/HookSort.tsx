import styles from "./HookSort.module.css";

export default function HookSort({
  setSort,
  value,
}: {
  setSort: (value: "name" | "popular") => void;
  value: "name" | "popular";
}) {
  return (
    <div className="hooks-sort flex items-center gap-2">
      <small>Sort:</small>
      <button
        onClick={() => setSort("popular")}
        className={`${styles.toggle} ${
          value === "popular" ? styles.active : ""
        }`}
      >
        Popular
      </button>
      <button
        onClick={() => setSort("name")}
        className={`${styles.toggle} ${value === "name" ? styles.active : ""}`}
      >
        Name
      </button>
    </div>
  );
}
