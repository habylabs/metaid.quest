import React from 'react'
import { useMediaQuery } from 'react-responsive'
import Link from 'next/link'
import { Disconnect } from '../components'
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
          <a className={styles.headerLink}>Meta ID</a>
        </Link>
      </div>
      <div>
        <Link href='/leaderboard'>
          <a className={`${styles.headerLink} ${styles.navLink}`}>Leaderboard</a>
        </Link>
        <Link href='/castle'>
          <a className={`${styles.headerLink} ${styles.navLink}`}>Castle</a>
        </Link>
      </div>
      <div>
        <Disconnect />
      </div>
    </header>
  )
}

export default Header