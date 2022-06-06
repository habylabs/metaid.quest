import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

import styles from '../styles/components/Footer.module.css';

import DiscordLogo from '../public/discord-logo-white.svg';
import TwitterLogo from '../public/twitter-logo-white.svg';
import OpenSeaLogo from '../public/opensea-logo-transparent.svg';
import HabyLabsLogo from '../public/logo.svg';

function Footer() {
  const isMobile = useMediaQuery({ maxWidth: 480 });
  const isFlexRow = useMediaQuery({ minWidth: 700 });

  const getLinksSection = () => (
    <div className={styles.footerRightSection}>
      <div className={styles.footerRightSectionLinks}>
        <a
          href="https://habylabs.notion.site/FAQs-da5e0e5851d74d029b70007aa1e2ec61"
          target="_blank"
          rel="noopener noreferrer"
          className={`link monospace-font ${styles.footerLink}`}
        >
          FAQ
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

      <div className={styles.footerButtonsRow}>
        <div className={styles.footerIconButton}>
          <a
            href="https://discord.gg/TXgaBwYZep"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerIconButtonLink}
          >
            <Image src={DiscordLogo} className={styles.footerSvg} alt="Discord" />
          </a>
        </div>
        <div className={styles.footerIconButton}>
          <a
            href="https://twitter.com/HabyLabs"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerIconButtonLink}
          >
            <Image src={TwitterLogo} className={styles.footerSvg} alt="Twitter" />
          </a>
        </div>
        <div className={styles.footerIconButton}>
          <a
            href="https://opensea.io/HabyLabs?tab=created"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerIconButtonLink}
          >
            <Image src={OpenSeaLogo} className={styles.footerSvg} alt="Open Sea" />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <footer
      className={`${styles.appFooter} ${isMobile ? "side-padding-mobile" : "side-padding"} ${isFlexRow ? "row" : "column"}`}
    >
      {isFlexRow ? null : getLinksSection()}
      <div className={`${styles.footerLeftSection} ${isFlexRow ? "" : styles.footerLeftSectionColumnPadding}`}>
        <div className={styles.footerLeftSectionTop}>
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

        <p className={`monospace-font no-margin ${styles.copyright}`}>
          ©2021 Haby, LLC. All rights reserved.
        </p>
      </div>
      {isFlexRow ? getLinksSection() : null}
    </footer>
  );
}
  
export default Footer;
