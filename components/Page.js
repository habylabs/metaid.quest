import { useEffect, useState } from 'react';
import styles from '../styles/components/Page.module.css';
import { Header, Footer } from '.'

export default function Page({ children }) {
  const [windowReady, setWindowReady] = useState(false);
  
  useEffect(() => {
    setWindowReady(true);
  }, []);

  return (
    <>
      <main>
        <div className={styles.layoutContainer}>
          {windowReady ? <Header /> : null}
          {children}
        </div>
      </main>
      {windowReady ? <Footer /> : null}
    </>
  )
};
