import { useWeb3React } from "@web3-react/core";
import { injectedConnector, walletConnectConnector } from "../util/connectors.js";
import { Button } from '../components';
import styles from '../styles/components/Connect.module.css';

function Connect() {
  const { activate } = useWeb3React();

  async function connectMetaMask() {
    try {
      await activate(injectedConnector)
    } catch (error) {
      console.log(error)
    }
  }

  async function connectWalletConnect() {
    try {
      await activate(walletConnectConnector)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="column">
      <p className={`monospace-font no-margin ${styles.connectText}`}>
        Connect Wallet
      </p>
      <div className="row align-center justify-center">
        <div className={styles.connectButtonContainer}>
          <Button onClick={connectMetaMask}>
            MetaMask
          </Button>
        </div>
        <div>
          <Button onClick={connectWalletConnect}>
            WalletConnect
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Connect;
