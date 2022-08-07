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
  const [ isOnboardingDone, setIsOnboardingDone ] = useState(true)
  const [ onboardingStep, setOnboardingStep ] = useState(4)
  const [ pfp, setPfp ] = useState(dbData.identity.pfp)
  const [ bonusChar, setBonusChar ] = useState(dbData.identity.character)
  const [ equipment, setEquipment ] = useState(dbData.equipment.contract)
  const [ stats, setStats ] = useState(dbData.stats)

  const handleIsMinted = () => {
    if (!isMinted) {
      setIsOnboardingDone(false)
      setOnboardingStep(1)
    }

    setIsMinted(!isMinted)
  }

  const handleOnboardingDone = () => {
    setIsOnboardingDone(!isOnboardingDone)
    setOnboardingStep(1)
  }

  const handleOnboardingStep = () => {
    if (onboardingStep === 4) {
      setIsOnboardingDone(true)
    } else {
      setOnboardingStep(++onboardingStep)
    }
  }

  const handlePfpChange = (value) => {
    if (value) {
      const valueArray = value.split('-')
      const contract = valueArray[0]
      const id = valueArray[1]
      const arrayIndex = _.findIndex(allNfts, (nft) => (
        ((nft.contract === contract) && nft.tokenId === id)
      ))

      setPfp({
        contract,
        id,
        image: allNfts[arrayIndex].metaData.image,
        race: '',
        role: '',
      })

      if (!isOnboardingDone) {
        handleOnboardingStep()
      }
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

      if (!isOnboardingDone) {
        handleOnboardingStep()
      }
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
        handleIsMinted={handleIsMinted}
        isOnboardingDone={isOnboardingDone}
        handleOnboardingDone={handleOnboardingDone}
        onboardingStep={onboardingStep}
        handleOnboardingStep={handleOnboardingStep}
      />
    </div>
  )
}

export default Profile