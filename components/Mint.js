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
import Link from 'next/link';

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

const _getErrorMessage = (isPrepareError, prepareError, isError, error) => {
  if (isPrepareError || isError) {
    return (
      <p className={`no-margin ${styles.mintError}`}>
        {(prepareError || error)?.message}
      </p>
    )
  }

  return null
}

const _getSuccessCharacterMessage = (isSuccess, isCharacter) => (
  isSuccess && isCharacter &&
  <p className={`no-margin ${styles.mintSuccess}`}>
    Successfully minted a Character! Check it out on 
    <a
      href="https://opensea.io/collection/adventure-character"
      target="_blank"
      rel="noopener noreferrer"
      className="link monospace-font"
    >
      OpenSea.
    </a>
  </p>
)

const Mint = ({ free, isCharacter, isDisabled = false }) => {
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
          disabled={(!write || isLoading || isDisabled)}
        >
          {
            isLoading ?
            'Minting...' :
            `Mint ${isCharacter ? 'Character' : 'Meta ID'}`
          }
        </Button>
      </div>
      {
        ((!free && !isCharacter) || isSuccess || isPrepareError || isError) &&
        <div className={`monospace-font white-text ${styles.mintMessagePadding}`}>
          {
            !free && !isCharacter && (
              <p className={styles.mintContext}>
                Meta ID is coming soon and will be <strong>free to mint</strong> for owners of{' '}
                <a
                  href='https://docs.metaid.quest/overview/identity/eligible-projects'
                  target='_blank'
                  rel='noreferrer'
                  className='link'
                >
                  Eligible Projects
                </a>, including{' '}
                <Link href='/character'>
                  <a className='link-bright'>
                    Character
                  </a>
                </Link>. which you can mint for for 0.04 ETH.
              </p>
            )
          }
          {_getSuccessCharacterMessage(isSuccess, isCharacter)}
          {_getErrorMessage(isPrepareError, prepareError, isError, error)}
        </div>
      }
      
    </div>
  );
};

export default Mint;
