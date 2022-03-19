import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from "ethers";
import { Layout } from '../components';
import '../styles/global.css';

function getLibrary(provider, connector) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Web3ReactProvider>
  )
};

export default MyApp;
