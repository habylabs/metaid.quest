import React from 'react'
import { useAccount, useEnsName } from 'wagmi'
import { useMediaQuery } from 'react-responsive'
import Link from 'next/link'

import { formatAddress } from '../util/identity'
import styles from '../styles/components/Header.module.css'

const Header = () => {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const isMobile = useMediaQuery({ maxWidth: 480 })
  const paddingClass = isMobile ? 'side-padding-mobile' : 'side-padding'

  return (
    <header
      className={`monospace-font ${paddingClass} ${styles.headerContainer}`}
    >
      <div>
        <Link href='/'>
          <a className={`${styles.headerLink} ${styles.navLink}`}>Meta ID</a>
        </Link>
      </div>
      <div>
        <Link href='/leaderboard'>
          <a className={`${styles.headerLink} ${styles.navLink}`}>Leaderboard</a>
        </Link>
        <Link href='/character'>
          <a className={`${styles.headerLink} ${styles.navLink}`}>Character</a>
        </Link>
        <Link href='/apps'>
          <a className={`${styles.headerLink} ${styles.navLink}`}>Apps</a>
        </Link>
      </div>
      <div>
        {isConnected && (
          <Link href={`/profile/${address}`}>
            <a className={`${styles.headerLink} ${styles.navLink}`}>{ensName ?? formatAddress(address)}</a>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header