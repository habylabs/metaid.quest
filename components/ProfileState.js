import { useState } from 'react'
import { useContractReads } from 'wagmi'
import _ from 'lodash'

import {
  Loading,
  ProfileUI,
} from '.'

import {
  LOOT_CONTRACT_ADDRESS,
  MLOOT_CONTRACT_ADDRESS
} from '../util/constants'

import LootJson from '../contracts/Loot.json'
import MLootJson from '../contracts/TemporalLoot.json'

const getEquipmentContractInterface = (equipment) => {
  if (equipment && equipment.address.toLowerCase() === LOOT_CONTRACT_ADDRESS) {
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

const Profile = ({
  dbData,
  allNfts,
  identityNftOptions,
  characterNftOptions,
  equipmentNftOptions
}) => {
  const [ isMinted, setIsMinted ] = useState(false)
  const [ didMintToday, setDidMintToday ] = useState(false)
  const [ onboardingStep, setOnboardingStep ] = useState(6)
  const [ pfp, setPfp ] = useState(dbData.identity.pfp)
  const [ bonusChar, setBonusChar ] = useState(dbData.identity.character)
  const [ equipment, setEquipment ] = useState(dbData.equipment.contract)
  const [ stats, setStats ] = useState(dbData.stats)

  const handlePfpChange = (value) => {
    if (value) {
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
    } else {
      setPfp({
        contract: null,
        id: null,
        image: null,
        race: '???',
        role: '???',
        element: '???'
      })
    }
  }

  const handleBonusCharChange = (value) => {
    if (value) {
      const valueArray = value.split('-')
      const id = valueArray[1]
      setBonusChar({
        id,
        race: '',
        role: '',
        element: ''
      })
    } else {
      setBonusChar({
        id: null,
        race: null,
        role: null,
        element: null
      })
    }
  }

  const handleEquipmentChange = (value) => {
    if (value) {
      console.log(value)
      const valueArray = value.split('-')

      const contract = {
        address: valueArray[0],
        id: valueArray[1]
      }

      setEquipment(contract)
    } else {
      setEquipment(null)
    }
  }

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
      <ProfileUI
        pfp={pfp}
        handlePfpChange={handlePfpChange}
        bonusChar={bonusChar}
        handleBonusCharChange={handleBonusCharChange}
        equipment={equipment}
        handleEquipmentChange={handleEquipmentChange}
        allNfts={allNfts}
        identityNftOptions={identityNftOptions}
        characterNftOptions={characterNftOptions}
        equipmentNftOptions={equipmentNftOptions}
        rank={dbData.rank}
        isMinted={isMinted}
        setIsMinted={setIsMinted}
        didMintToday={didMintToday}
        setDidMintToday={setDidMintToday}
        onboardingStep={onboardingStep}
        setOnboardingStep={setOnboardingStep}
      />
    </div>
  )
}

export default Profile