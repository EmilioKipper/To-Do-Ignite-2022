import { Trash } from "phosphor-react";
import { ChangeEvent, useState } from "react";

import styles from "./ListItem.module.css";

interface ListItemProps {
  text: string
  onDelete: (text: string) => void
  onCheckedChange: (text: string,checked: boolean) => void
}

export function ListItem({ text, onDelete, onCheckedChange }: ListItemProps) {
  const [checked, setChecked] = useState(false)

  function handleDelete() {
    onDelete(text)
  }

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked)
    onCheckedChange(text, e.target.checked)
  }

  return (
    <div className={styles.container}>
      <label className={styles.checkboxContainer}>
        <input type="checkbox" onChange={handleCheckboxChange} />
        <span className={styles.checkmark} />
      </label>

      <p className={checked ? styles.strikeText : ''}>{text}</p>

      <button className={styles.deleteButton} onClick={handleDelete}>
        <Trash size={24} />
      </button>
    </div>
  );
}
