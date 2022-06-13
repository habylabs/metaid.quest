import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import styles from '../styles/components/Footer.module.css';
import HabyLabsLogo from '../public/logo.svg';

function Footer() {
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
          href="https://habylabs.notion.site/Meta-Id-4f87d1d22f4a4429bed314240ae5f02e"
          target="_blank"
          rel="noopener noreferrer"
          className={`link monospace-font ${styles.footerLink}`}
        >
          Roadmap
        </a>
        <a
          href="https://habylabs.notion.site/c9d5d38160b94ab4ad9a79c03f20ff07?v=a7d6642c6a384041b80b51a0f8bb3bc9"
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
        © 2021 - 2022 Haby, LLC. All rights reserved.
      </p>
    </footer>
  );
}
  
export default Footer;
