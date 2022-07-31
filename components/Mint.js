import { useState } from 'react'
import { 
  usePrepareContractWrite,
  useContractWrite, 
  useWaitForTransaction,
} from 'wagmi'
import { ethers } from 'ethers';
import { CHARACTER_CONTRACT_ADDRESS } from '../util/constants';
import { Button } from '../components'
import styles from '../styles/components/Mint.module.css'
import CharacterJson from '../contracts/Character.json'


function Mint() {
  const [ numToMint, setNumToMint ] = useState(1)

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    addressOrName: CHARACTER_CONTRACT_ADDRESS,
    contractInterface: CharacterJson.abi,
    functionName: 'mintPublic',
    args: [numToMint],
    overrides: {
      value: ethers.utils.parseEther(`${numToMint * 0.04}`),
    },
  })
  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

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
          onClick={() => write()} 
          disabled={(!write || numToMint < 1 || isLoading)}
        >
          {isLoading ? 'Minting...' : 'Mint'}
        </Button>
      </div>
      <div className={`monospace-font white-text ${styles.mintMessagePadding}`}>
        <p className={`no-margin ${styles.mintSuccess}`}>
          { 
            isSuccess && (
              <>
                Successfully minted a Character! Check it out on 
                <a
                  href="https://opensea.io/collection/adventure-character"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link monospace-font"
                >
                  OpenSea.
                </a>
              </>
            )
          }
        </p>
        <p className={`no-margin ${styles.mintError}`}>
          { (isPrepareError || isError) && (prepareError || error)?.message }
        </p>
      </div>
    </div>
  );
};

export default Mint;
