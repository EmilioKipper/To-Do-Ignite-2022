import styles from "./Counter.module.css";

export function Counter({ times }: { times: number | string }) {
  return <span className={styles.counter}>{times}</span>;
}
