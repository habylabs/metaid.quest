import { useEffect, useState } from 'react';
import styles from '../styles/components/Page.module.css';
import { Header, Footer } from '.'

export default function Page({ children }) {
  const [windowReady, setWindowReady] = useState(false);
  
  useEffect(() => {
    setWindowReady(true);
  }, []);

  function loadingScreen() {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <>
      <main>
        <div className={styles.pageContainer}>
          {windowReady ? <Header /> : null}
          {windowReady ? children : loadingScreen()}
        </div>
      </main>
      {windowReady ? <Footer /> : null}
    </>
  )
};
