import React from 'react'
import { useMediaQuery } from 'react-responsive'
import Link from 'next/link'
import styles from '../styles/components/Header.module.css'

function Header() {
  const isMobile = useMediaQuery({ maxWidth: 480 })
  const paddingClass = isMobile ? 'side-padding-mobile' : 'side-padding'

  return (
    <header
      className={`monospace-font ${paddingClass} ${styles.headerContainer}`}
    >
      <div>
        <Link href='/'>
          <a className={styles.headerLink}>Loot Adventure</a>
        </Link>
      </div>
      <div>
        <Link href='/stats'>
          <a className={`${styles.headerLink} ${styles.navLink}`}>Stats</a>
        </Link>
        <a
          href="https://habylabs.notion.site/Adventure-4f87d1d22f4a4429bed314240ae5f02e"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.headerLink} ${styles.navLink}`}
        >
          Roadmap
        </a>
        <a
          href="https://habylabs.notion.site/FAQs-da5e0e5851d74d029b70007aa1e2ec61"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.headerLink} ${styles.navLink}`}
        >
          FAQ
        </a>
      </div>
    </header>
  )
}

export default Header