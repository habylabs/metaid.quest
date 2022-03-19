import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const { NEXT_PUBLIC_ALCHEMY_API_URL } = process.env;

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export const walletConnectConnector = new WalletConnectConnector({
  rpc: { 
    1: NEXT_PUBLIC_ALCHEMY_API_URL,
    3: NEXT_PUBLIC_ALCHEMY_API_URL,
    4: NEXT_PUBLIC_ALCHEMY_API_URL,
    5: NEXT_PUBLIC_ALCHEMY_API_URL,
    42: NEXT_PUBLIC_ALCHEMY_API_URL,
  },
  qrcode: true,
});
