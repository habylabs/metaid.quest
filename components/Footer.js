import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'
import Link from 'next/link'

import styles from '../styles/components/Footer.module.css'
import HabyLabsLogo from '../public/logo.svg'

const Footer = () => {
  const isMobile = useMediaQuery({ maxWidth: 480 });

  return (
    <footer className={`${styles.appFooter} ${isMobile ? "side-padding-mobile" : "side-padding"} column`}>
      <div className={styles.footerLogoContainer}>
        <div className={styles.habyLabsLogo}>
          <div className={styles.habyLogoFooterSvg}>
            <Image src={HabyLabsLogo} layout="responsive" alt="logo" />
          </div>
          <p className={`monospace-font no-margin ${styles.habyLogoText}`}>
            <strong>Haby Labs</strong>
          </p>
        </div>
        <p className={`monospace-font no-margin ${styles.habyDescription}`}>
          Come explore the metaverse with us.
        </p>
      </div>

      <div className={styles.footerLinksContainer}>
        <Link href='/leaderboard'>
          <a className={`link monospace-font ${styles.footerLink}`}>Leaderboard</a>
        </Link>
        <Link href='/character'>
          <a className={`link monospace-font ${styles.footerLink}`}>Character</a>
        </Link>
        <Link href='/apps'>
          <a className={`link monospace-font ${styles.footerLink}`}>Apps</a>
        </Link>
      </div>

      <div className={styles.footerLinksContainer}>
        <a
          href="https://discord.gg/TXgaBwYZep"
          target="_blank"
          rel="noopener noreferrer"
          className={`link monospace-font ${styles.footerLink}`}
        >
          Discord
        </a>
        <a
          href="https://twitter.com/HabyLabs"
          target="_blank"
          rel="noopener noreferrer"
          className={`link monospace-font ${styles.footerLink}`}
        >
          Twitter
        </a>
        <a
          href="https://docs.metaid.quest/"
          target="_blank"
          rel="noopener noreferrer"
          className={`link monospace-font ${styles.footerLink}`}
        >
          Docs
        </a>
        <a
          href="https://docs.metaid.quest/for-developers/smart-contracts"
          target="_blank"
          rel="noopener noreferrer"
          className={`link monospace-font ${styles.footerLink}`}
        >
          Contracts
        </a>
        <a
          href="https://github.com/haby-llc/adventure.haby.io"
          target="_blank"
          rel="noopener noreferrer"
          className={`link monospace-font ${styles.footerLink}`}
        >
          Source Code
        </a>
      </div>

      <p className={`monospace-font no-margin ${styles.copyright}`}>
        © 2021 - 2022 Haby, LLC
      </p>
    </footer>
  )
}
  
export default Footer
