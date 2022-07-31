import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useEnsName } from 'wagmi'
import { useMediaQuery } from 'react-responsive'
import Link from 'next/link'
import styles from '../styles/components/Header.module.css'

function formatAddress(address) {
  return `${address.slice(0,4)}...${address.slice(address.length - 4)}`
}

function Header() {
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
          <a className={styles.headerLink}>Meta ID</a>
        </Link>
      </div>
      <div>
        <Link href='/character'>
          <a className={`${styles.headerLink} ${styles.navLink}`}>Character</a>
        </Link>
        <a 
          href='https://docs.metaid.quest/'
          target='_blank'
          rel='noreferrer'
          className={`${styles.headerLink} ${styles.navLink}`}
        >
          Docs
        </a>
      </div>
      <div>
        {isConnected && (
          <Link href='/profile'>
            <a className={`${styles.headerLink} ${styles.navLink}`}>{ensName ?? formatAddress(address)}</a>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header