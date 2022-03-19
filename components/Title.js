import { useMediaQuery } from 'react-responsive';
import styles from '../styles/components/Title.module.css';

function Title() {
  const isMobile = useMediaQuery({ maxWidth: 480 });
  const need75WidthDescription = useMediaQuery({ minWidth: 800 });
  const need50WidthDescription = useMediaQuery({ minWidth: 1200 });

  let titleDescription = styles.titleDescription100;
  if (need50WidthDescription) {
    titleDescription = styles.titleDescription50;
  } else if (need75WidthDescription) {
    titleDescription = styles.titleDescription75;
  } 

  return (
    <div className={`${styles.title} ${isMobile ? "side-padding-mobile" : "side-padding"}`}>
      <div className={styles.titleHeader}>
        <h1 className={`no-margin serif-font ${styles.titleHeaderText}`}>
          Welcome Adventurer!
        </h1>
      </div>
      <div className={titleDescription}>
        <p className={`monospace-font ${styles.titleDescriptionText}`}>
          Mint your{' '}
          <a
            href="https://habylabs.notion.site/Character-0e4068e606a74f0195685e83564046d5"
            target="_blank"
            rel="noopener noreferrer"
            className="link monospace-font"
          >
            Character
          </a>{' '}
          and join a new world of adventure that is inspired by and built on top of{' '}
          <a
            href="https://www.lootproject.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="link monospace-font"
          >
            Loot
          </a>
          . Your character is randomly generated and stored on chain. Each 
          character will have{' '}
          <a
            href="https://habylabs.notion.site/Stats-8b5e87f09c974062b7ddc6930231ca36"
            target="_blank"
            rel="noopener noreferrer"
            className="link monospace-font"
          >
            Stats
          </a>{' '}
          and skills. Use them to challenge the{' '}
          <a
            href="https://habylabs.notion.site/Dungeon-Tower-5e1f20c2f53940eabddbee2af7ac9a31"
            target="_blank"
            rel="noopener noreferrer"
            className="link monospace-font"
          >
            Dungeon Tower
          </a>{' '}
          and conquer{' '}
          <a
            href="https://habylabs.notion.site/Castles-e07ac1d6e7c445f39192653eade5dd2b"
            target="_blank"
            rel="noopener noreferrer"
            className="link monospace-font"
          >
            Castles
          </a> 
          . Be the adventurer you were always born to be.
        </p>
      </div>
    </div>
  );
};

export default Title;
