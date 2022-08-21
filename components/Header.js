import { useAccount, useEnsName } from 'wagmi'
import { useMediaQuery } from 'react-responsive'
import { useRouter } from 'next/router'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link'

import { formatAddress } from '../util/identity'
import styles from '../styles/components/Header.module.css'

const LeaderboardLink = () => (
  <Link href='/leaderboard'>
    <a className={`${styles.headerLink} ${styles.navLinkPadding}`}>Leaderboard</a>
  </Link>
)

const CharacterLink = () => (
  <Link href='/character'>
    <a className={`${styles.headerLink} ${styles.navLinkPadding}`}>Character</a>
  </Link>
)

const AppsLink = () => (
  <Link href='/apps'>
    <a className={styles.headerLink}>Apps</a>
  </Link>
)

const Header = () => {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })

  const isMobile = useMediaQuery({ maxWidth: 480 })
  const paddingClass = isMobile ? 'side-padding-mobile' : 'side-padding'
  const router = useRouter()

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
        {isMobile ? null : <LeaderboardLink />}
        {isMobile ? null : <CharacterLink />}
        {isMobile ? null : <AppsLink />}
      </div>
      <div>
        {isConnected && (
          <Link href={`/profile/${address}`}>
            <a className={`${styles.headerLink} ${styles.navLink}`}>{ensName ?? formatAddress(address)}</a>
          </Link>
        )}
        {!isConnected && router.pathname != '/' && <ConnectButton />}
      </div>      
    </header>
  )
}

export default Header