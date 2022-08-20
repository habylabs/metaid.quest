import React from 'react';
import {
  getDefaultWallets,
  lightTheme,
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
import { MantineProvider } from '@mantine/core';
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
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          accentColor: '#f46692',
          borderRadius: 'small',
          overlayBlur: 'small',
        })}
        coolMode
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: 'light',
          }}
        >
          <Page>
            <Component {...pageProps} />
          </Page>
        </MantineProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
};

export default MyApp;
