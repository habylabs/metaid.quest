import { useState } from 'react'
import { useAccount, useContractReads } from 'wagmi'
import Head from 'next/head'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Select } from '@mantine/core';
import _ from 'lodash'

import {
  Button,
  Loading,
  MetaId,
  Mint,
  Rank,
  Withdraw,
} from '.'

import {
  contractNameMap
} from '../util/mapping'

import {
  CHARACTER_CONTRACT_ADDRESS,
  LOOT_CONTRACT_ADDRESS,
  MLOOT_CONTRACT_ADDRESS
} from '../util/constants'

import LootJson from '../contracts/Loot.json'
import MLootJson from '../contracts/TemporalLoot.json'

const getEquipmentContractInterface = (equipment) => {
  if (equipment && equipment.address.toLowerCase() === LOOT_CONTRACT_ADDRESS.toLowerCase()) {
    return {
      addressOrName: LOOT_CONTRACT_ADDRESS,
      contractInterface: LootJson.abi
    }
  }

  return {
    addressOrName: MLOOT_CONTRACT_ADDRESS,
    contractInterface: MLootJson.abi
  }
}

const getEquipmentTokenId = (equipment) => (equipment ? parseInt(equipment.id) : 0)

const getPfpSelectValue = (pfp) => (
  pfp.contract ? `${pfp.contract}-${pfp.id}` : null
)

const getExtraCharSelectValue = (bonusChar) => (
  bonusChar.id ? `${CHARACTER_CONTRACT_ADDRESS.toLowerCase()}-${bonusChar.id}` : null
)

const getEquipmentSelectValue = (equipment) => (
  equipment ? `${equipment.address}-${equipment.id}` : null
)

const Profile = ({ dbData, identityNftOptions, equipmentNftOptions }) => {
  const [ isMinted, setIsMinted ] = useState(false)
  const [ didMintToday, setDidMintToday ] = useState(false)
  const [ onboardingStep, setOnboardingStep ] = useState(6)
  const [ pfp, setPfp ] = useState(dbData.identity.pfp)
  const [ bonusChar, setBonusChar ] = useState(dbData.identity.character)
  const [ equipment, setEquipment ] = useState(dbData.equipment.contract)
  const [ stats, setStats ] = useState(dbData.stats)

  const equipmentContract = getEquipmentContractInterface(equipment)
  const lootData = useContractReads({
    contracts: [
      {
        ...equipmentContract,
        functionName: 'getWeapon',
        args: [getEquipmentTokenId(equipment)]
      },
      {
        ...equipmentContract,
        functionName: 'getChest',
        args: [getEquipmentTokenId(equipment)]
      },
      {
        ...equipmentContract,
        functionName: 'getHead',
        args: [getEquipmentTokenId(equipment)]
      },
      {
        ...equipmentContract,
        functionName: 'getWaist',
        args: [getEquipmentTokenId(equipment)]
      },
      {
        ...equipmentContract,
        functionName: 'getFoot',
        args: [getEquipmentTokenId(equipment)]
      },
      {
        ...equipmentContract,
        functionName: 'getHand',
        args: [getEquipmentTokenId(equipment)]
      },
      
      {
        ...equipmentContract,
        functionName: 'getNeck',
        args: [getEquipmentTokenId(equipment)]
      },
      ,
      {
        ...equipmentContract,
        functionName: 'getRing',
        args: [getEquipmentTokenId(equipment)]
      },
    ]
  })

  if (lootData.error) return <div>Failed to load</div>
  if (!lootData.data) return <Loading />

  return (
    <div>
      <div>Text to entice people</div>
      <Rank rank={dbData.rank}/>
      <MetaId empty={!isMinted} data={{}} example={isMinted} />
      {!isMinted && <Mint />}
      
      <Select
        label="Identity"
        placeholder="Choose Your PFP"
        value={getPfpSelectValue(pfp)}
        onChange={(value) => {
          const valueArray = value.split('-')
          const contract = valueArray[0]
          const id = valueArray[1]
          const arrayIndex = _.findIndex(identityNftOptions, (nft) => (
            ((nft.contract.address === contract) && nft.tokenId === id)
          ))
          setPfp({
            contract,
            id,
            image: identityNftOptions[arrayIndex].metaData.image,
            race: '',
            role: '',
          })
        }}
        data={identityNftOptions.map((nft) => ({
          value: `${nft.contract.address}-${nft.tokenId}`,
          label: `${contractNameMap[nft.contract.address]} #${nft.tokenId}`
        }))}
      />
      <Select
        label="Bonus Character"
        placeholder="Choose Your Bonus Character"
        value={getExtraCharSelectValue(bonusChar)}
        onChange={(value) => {
          const valueArray = value.split('-')
          const id = valueArray[1]
          setBonusChar({
            id,
            race: '',
            role: '',
            element: ''
          })
        }}
        data={identityNftOptions.map((nft) => ({
          value: `${nft.contract.address}-${nft.tokenId}`,
          label: `${contractNameMap[nft.contract.address]} #${nft.tokenId}`
        }))}
      />
      <Select
        label="Equipment"
        placeholder="Choose Your Equipment"
        value={getEquipmentSelectValue(equipment)}
        onChange={(value) => {
          const valueArray = value.split('-')

          // Add an if statement to see if contract should be set as null
          // if the equipment being used is from the PFP project
          const contract = {
            address: valueArray[0],
            id: valueArray[1]
          }

          setEquipment(contract)
        }}
        data={equipmentNftOptions.map((nft) => ({
          value: `${nft.contract.address}-${nft.tokenId}`,
          label: `${contractNameMap[nft.contract.address]} #${nft.tokenId}`
        }))}
      />
      <ConnectButton />
      <Withdraw />
      <div className='row'>
        <Button small outline onClick={() => setIsMinted(!isMinted)}>
          Minted: {`${isMinted}`}
        </Button>

        <Button small outline onClick={() => {
          setDidMintToday(!didMintToday)
          setOnboardingStep(0)
        }}>
          Minted Today: {`${didMintToday}`}
        </Button>

        <Button
          small outline 
          onClick={() => setOnboardingStep(onboardingStep === 6 ? 6 : ++onboardingStep)}
        >
          Onboarding Step {onboardingStep}
        </Button>
      </div>
    </div>
  )
}

export default Profile