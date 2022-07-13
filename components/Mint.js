import { useState } from 'react';
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { Button } from '../components';
import styles from '../styles/components/Mint.module.css';
import CharacterJson from '../contracts/Character.json';


function Mint() {
  const [ numToMint, setNumToMint ] = useState(1);
  const [ contractStatus, setContractStatus ] = useState("");
  const [ contractError, setContractError ] = useState("");
  const { account, library } = useWeb3React();

  // Define Character contract
  const characterContractAddress = '0xE600AFed52558f0c1F8Feeeb128c9b932B7ae4e3';
  const ownerAddress = '0xa27999aEE6d546004fA37CfDf372a922aB1C7Eff';
  const characterContract = new ethers.Contract(characterContractAddress, CharacterJson.abi, library);
  const signerContract = characterContract.connect(library.getSigner());

  async function mint() {
    try {
      setContractStatus("Minting...");
      setContractError("");

      const mintPrice = await signerContract.getPrice();

      const transaction = await signerContract.mintPublic(
        numToMint,
        { value: ethers.utils.parseUnits((numToMint * mintPrice).toString(), "wei") }
      );
      await transaction.wait();

      setContractStatus("You've successfully minted a Character! Check it out on ");
    } catch (error) {
      console.error(error);

      if (error.message) {
        if (error.message.includes("insufficient funds")) {
          setContractError("Not enough ETH in wallet!");
        } else {
          setContractError(error.message);
        }
      } else {
        setContractError("There was an issue. Please try again!");
      }
      
      setContractStatus("");
    }
  }
  
  async function withdraw() {
    try {
      setContractStatus("Withdrawing...");
      setContractError("");

      const withdraw = await signerContract.withdraw();
      console.log(withdraw);
      setContractStatus("Withdraw complete!");
    } catch (error) {
      console.error(error);
      setContractError(error.message);
      setContractStatus("");
    }
  }

  return (
    <div className="column align-center justify-center">
      <p className={`monospace-font ${styles.mintPriceText}`}>
        0.04 ETH to Mint
      </p>
      <div className="row align-center justify-center">
        <input
          className={styles.mintNumInput} 
          type="number" 
          value={numToMint} 
          onChange={ e => setNumToMint(parseInt(e.target.value)) } 
          min="1"
        />
        <Button 
          onClick={mint} 
          disabled={(contractStatus === "Minting..." || numToMint < 1)}
        >
          Mint
        </Button>
      </div>
      <div className={`monospace-font white-text ${styles.mintMessagePadding}`}>
        <p className={`no-margin ${styles.mintSuccess}`}>
          { contractStatus }
          { 
            contractStatus === "You've successfully minted a Character! Check it out on " ? (
              <a
                href="https://opensea.io/collection/adventure-character"
                target="_blank"
                rel="noopener noreferrer"
                className="link monospace-font"
              >
                OpenSea.
              </a>
            ) : null
          }
        </p>
        <p className={`no-margin ${styles.mintError}`}>
          { contractError }
        </p>
      </div>
      { 
        account === ownerAddress ? (
          <Button onClick={withdraw} small outline disabled={(contractStatus === "Withdrawing...")}>
            Withdraw Funds
          </Button>
        ) : null
      }
    </div>
  );
};

export default Mint;
