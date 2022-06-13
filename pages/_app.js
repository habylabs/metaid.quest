import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from "ethers";
import { Page } from '../components';
import '../styles/global.css';

function getLibrary(provider, connector) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </Web3ReactProvider>
  )
};

export default MyApp;
