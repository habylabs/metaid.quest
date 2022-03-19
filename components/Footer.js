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
          href="https://habylabs.notion.site/Mission-Values-1b099b95a05d4139b070f4e8d14a4dda"
          target="_blank"
          rel="noopener noreferrer"
          className={`link monospace-font ${styles.footerLink}`}
        >
          Values
        </a>
        <a
          href="https://etherscan.io/address/0xe600afed52558f0c1f8feeeb128c9b932b7ae4e3"
          target="_blank"
          rel="noopener noreferrer"
          className={`link monospace-font ${styles.footerLink}`}
        >
          Contract
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
