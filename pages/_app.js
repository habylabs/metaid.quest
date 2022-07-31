import React from 'react';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { Page } from '../components';

import '@rainbow-me/rainbowkit/styles.css';
import '../styles/global.css';

const { chains, provider } = configureChains(
  [chain.mainnet],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Meta ID',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} coolMode>
        <Page>
          <Component {...pageProps} />
        </Page>
      </RainbowKitProvider>
    </WagmiConfig>
  )
};

export default MyApp;
