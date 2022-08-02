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
  if (equipment && equipment.contract.address.toLowerCase() === LOOT_CONTRACT_ADDRESS.toLowerCase()) {
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

const getEquipmentTokenId = (equipment) => (equipment ? parseInt(equipment.tokenId) : 0)

const getPfpSelectValue = (pfp) => (
  pfp.contract ? `${pfp.contract}-${pfp.id}` : null
)

const getExtraCharSelectValue = (extraChar) => (
  extraChar.id ? `${CHARACTER_CONTRACT_ADDRESS.toLowerCase()}-${extraChar.id}` : null
)

const getEquipmentSelectValue = (equipment) => (
  equipment ? `${equipment.address}-${equipment.id}` : null
)

const Profile = ({ dbData, identityNftOptions, equipmentNftOptions }) => {
  const [ isMinted, setIsMinted ] = useState(false)
  const [ pfp, setPfp ] = useState(dbData.identity.pfp)
  const [ extraChar, setExtraChar ] = useState(dbData.identity.character)
  const [ equipment, setEquipment ] = useState(dbData.equipment.contract)
  
  console.log(pfp)

  const equipmentContract = getEquipmentContractInterface(equipment)
  const { data } = useContractReads({
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
  console.log(data)

  return (
    <div>
      <Button onClick={() => setIsMinted(!isMinted)}>
        Changed Minted Status
      </Button>
      <ConnectButton />
      <Mint />
      <Withdraw />
      {isMinted && <MetaId empty />}
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
        label="Additional Identity"
        placeholder="Choose Your Character"
        value={getExtraCharSelectValue(extraChar)}
        onChange={(value) => {
          const valueArray = value.split('-')
          const id = valueArray[1]
          setExtraChar({
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
          const contract = valueArray[0]
          const id = valueArray[1]
          const arrayIndex = _.findIndex(identityNftOptions, (nft) => (
            ((nft.contract.address === contract) && nft.tokenId === id)
          ))
          setEquipment({
            contract: {},
            items: {}
          })
        }}
        data={equipmentNftOptions.map((nft) => ({
          value: `${nft.contract.address}-${nft.tokenId}`,
          label: `${contractNameMap[nft.contract.address]} #${nft.tokenId}`
        }))}
        disabled={!data}
      />
    </div>
  )
}

export default Profile