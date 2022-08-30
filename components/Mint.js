import { 
  useAccount,
  usePrepareContractWrite,
  useContractWrite, 
  useWaitForTransaction,
} from 'wagmi'
import { ethers } from 'ethers';
import Link from 'next/link';

import { Button } from '../components'
import {
  CHARACTER_CONTRACT_ADDRESS,
  META_ID_CONTRACT_ADDRESS
} from '../util/constants';
import CharacterJson from '../contracts/Character.json'
import MetaIdJson from '../contracts/MetaId.json'

import styles from '../styles/components/Mint.module.css'

const _getPrepareContractConfig = (
  isCharacter,
  isFree,
  address,
  identityNftOptions,
  characterNftOptions,
  equipmentNftOptions,
) => {
  if (isCharacter) {
    return {
      addressOrName: CHARACTER_CONTRACT_ADDRESS,
      contractInterface: CharacterJson.abi,
      functionName: 'mintPublic',
      args: [1],
      overrides: {
        value: ethers.utils.parseEther('0.02'),
      },
    }
  }

  if (isFree) {
    let contract
    let tokenId

    if (characterNftOptions.length > 0) {
      contract = CHARACTER_CONTRACT_ADDRESS
      tokenId = characterNftOptions[0].tokenId
    } else if (equipmentNftOptions.length > 0) {
      contract = equipmentNftOptions[0].contract
      tokenId = equipmentNftOptions[0].tokenId
    } else {
      contract = identityNftOptions[0].contract
      tokenId = identityNftOptions[0].tokenId
    }

    return {
      addressOrName: META_ID_CONTRACT_ADDRESS,
      contractInterface: MetaIdJson.abi,
      functionName: 'mintFree',
      args: [address, contract, tokenId],
    }
  }

  // values here need to be updated for the Meta ID contract
  return {
    addressOrName: META_ID_CONTRACT_ADDRESS,
    contractInterface: MetaIdJson.abi,
    functionName: 'mint',
    args: [address],
    overrides: {
      value: ethers.utils.parseEther('0.02'),
    },
  }
}

const _getErrorMessage = (isPrepareError, prepareError, isError, error) => {
  if (isPrepareError || isError) {
    return (
      <p className={`no-margin side-padding ${styles.mintError}`}>
        {(prepareError || error)?.message}
      </p>
    )
  }

  return null
}

const _getSuccessCharacterMessage = (isSuccess, isCharacter, transaction, transactionSuccess) => {
  if (isSuccess) {
    if (transaction.data) {
      const tokenId = parseInt(transaction.data.logs[0].topics[3], 16).toString()
      transactionSuccess(tokenId)
    }

    return (
      <p className={`no-margin ${styles.mintSuccess}`}>
        You successfully minted a {isCharacter ? 'Character' : 'Meta ID'}! 
      </p>
    )
  }  
}

const Mint = ({
  isFree = false,
  isCharacter = false,
  isDisabled = false,
  identityNftOptions = [],
  characterNftOptions = [],
  equipmentNftOptions = [],
  transactionSuccess = (n = 'Success') => {console.log(n)}
}) => {
  const { address } = useAccount()
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite(
    _getPrepareContractConfig(
      isCharacter,
      isFree,
      address,
      identityNftOptions,
      characterNftOptions,
      equipmentNftOptions
    )
  )
  const contractWrite = useContractWrite(config)
  const { data, error, isError, write } = contractWrite

  const transaction = useWaitForTransaction({
    hash: data?.hash,
  })
  const { isLoading, isSuccess } = transaction

  // if error message is cannot estimate gas; then it's not a valid error
  // need to build that logic in

  return (
    <div className="column align-center justify-center">
      <p className={`monospace-font ${styles.mintPriceText}`}>
        {`${(isCharacter || !isFree) ? '0.02 ETH' : 'Free'} to Mint`}
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
        ((!isFree && !isCharacter) || isSuccess || isPrepareError || isError) &&
        <div className={`column monospace-font white-text ${styles.mintMessagePadding}`}>
          {
            !isFree && !isCharacter && (
              <p className={styles.mintContext}>
                Meta ID will be <strong>free to mint</strong> for owners of{' '}
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
                </Link>, which you can mint for for 0.02 ETH.
              </p>
            )
          }
          {_getErrorMessage(isPrepareError, prepareError, isError, error)}
          {_getSuccessCharacterMessage(isSuccess, isCharacter, transaction, transactionSuccess)}
        </div>
      }
      
    </div>
  );
};

export default Mint;
