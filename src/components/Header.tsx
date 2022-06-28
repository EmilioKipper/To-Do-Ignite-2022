import rocket from '../assets/rocket.svg'

import styles from './Header.module.css'

export function Header() { 
  return (
    <header className={styles.container}>
      <img src={rocket} alt="Foguete" />
      <span className={styles.todo}>to</span>
    </header>
  )
}
