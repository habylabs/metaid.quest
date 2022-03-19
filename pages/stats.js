import { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Stats
} from '../components';

export default function StatsPage() {
  const [windowReady, setWindowReady] = useState(false);

  useEffect(() => {
    setWindowReady(true);
  }, []);

  return (
    <>
      <Head>
        <title>Adventure: Enter the Lootverse</title>
      </Head>
      {windowReady ? <Stats /> : null}
    </>
  );
}
