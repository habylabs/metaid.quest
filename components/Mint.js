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

const _getPrepareContractConfig = (isCharacter) => {
  if (isCharacter) {
    return {
      addressOrName: CHARACTER_CONTRACT_ADDRESS,
      contractInterface: CharacterJson.abi,
      functionName: 'mintPublic',
      args: [1],
      overrides: {
        value: ethers.utils.parseEther('0.04'),
      },
    }
  }

  // values here need to be updated for the Meta ID contract
  return {
    addressOrName: CHARACTER_CONTRACT_ADDRESS,
    contractInterface: CharacterJson.abi,
    functionName: 'mintPublic',
    args: [1],
    overrides: {
      value: ethers.utils.parseEther('0.04'),
    },
  }
}

function Mint({ free, isCharacter }) {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite(_getPrepareContractConfig(isCharacter))
  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <div className="column align-center justify-center">
      <p className={`monospace-font ${styles.mintPriceText}`}>
        {`${(!free || isCharacter) ? '0.04 ETH' : 'Free'} to Mint`}
      </p>
      <div className="row align-center justify-center">
        <Button 
          onClick={() => write()} 
          disabled={(!write || isLoading)}
        >
          {
            isLoading ?
            'Minting...' :
            `Mint ${isCharacter ? 'Character' : 'Meta ID'}`
          }
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
