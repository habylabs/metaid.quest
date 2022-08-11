import { useState } from 'react'
import { useContractReads } from 'wagmi'
import _ from 'lodash'

import {
  Loading,
  ProfileUI,
} from '.'

import {
  getGuild
} from '../util/identity'

import {
  LOOT_CONTRACT_ADDRESS,
  MLOOT_CONTRACT_ADDRESS
} from '../util/constants'

import LootJson from '../contracts/Loot.json'
import MLootJson from '../contracts/TemporalLoot.json'

const _getPfp = (pfp, identityNftOptions) => {
  if (pfp.contract) {
    const arrayIndex = _.findIndex(identityNftOptions, (nft) => (
      ((nft.contract === pfp.contract) && nft.tokenId === pfp.id)
    ))

    return {
      ...pfp,
      attributes: identityNftOptions[arrayIndex].metaData.attributes
    }
  }

  return {
    ...pfp,
    attributes: null
  }
}

const _getEquipmentContractInterface = (equipment) => {
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

const _getEquipmentTokenId = (equipment) => (equipment ? parseInt(equipment.id) : 0)

const Profile = ({
  dbData,
  hasFreeMint,
  identityNftOptions,
  characterNftOptions,
  equipmentNftOptions
}) => {
  const [ isMinted, setIsMinted ] = useState(false)
  const [ isOnboardingDone, setIsOnboardingDone ] = useState(true)
  const [ onboardingStep, setOnboardingStep ] = useState(4)
  const [ pfp, setPfp ] = useState(_getPfp(dbData.identity.pfp))
  const [ bonusChar, setBonusChar ] = useState(dbData.identity.character)
  const [ equipment, setEquipment ] = useState(dbData.equipment.contract)

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
    // The user just set their PFP
    if (onboardingStep === 1) {
      // If the user has a Character NFT, skip step 2
      if (characterNftOptions.length > 0) {
        // The user has a valid Equipment NFT so let them choose one
        // Otherwise move to step 4 to share
        if (equipmentNftOptions.length > 0) {
          setOnboardingStep(3)
        } else {
          setOnboardingStep(4)
        }

        setBonusChar({
          id: characterNftOptions[0].tokenId,
          race: characterNftOptions[0].race,
          role: characterNftOptions[0].role,
          element: characterNftOptions[0].element,
        })
      } else {
        setOnboardingStep(2)
      }
    } else if (onboardingStep === 4) {
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
      const arrayIndex = _.findIndex(identityNftOptions, (nft) => (
        ((nft.contract === contract) && nft.tokenId === id)
      ))

      setPfp({
        contract,
        id,
        guild: getGuild(contract, identityNftOptions[arrayIndex].title),
        image: identityNftOptions[arrayIndex].media[0].gateway,
        race: identityNftOptions[arrayIndex].race,
        role: identityNftOptions[arrayIndex].role,
        element: identityNftOptions[arrayIndex].element,
        attributes: identityNftOptions[arrayIndex].metaData.attributes
      })

      if (!isOnboardingDone) {
        handleOnboardingStep()
      }
    } else {
      setPfp({
        contract: null,
        id: '???',
        guild: null,
        image: null,
        race: null,
        role: null,
        element: null,
        attributes: null
      })
    }
  }

  const handleBonusCharChange = (value) => {
    if (value) {
      const valueArray = value.split('-')
      const contract = valueArray[0]
      const id = valueArray[1]

      const arrayIndex = _.findIndex(characterNftOptions, (nft) => (
        ((nft.contract === contract) && nft.tokenId === id)
      ))

      setBonusChar({
        id,
        race: characterNftOptions[arrayIndex].race,
        role: characterNftOptions[arrayIndex].role,
        element: characterNftOptions[arrayIndex].element,
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

  const equipmentContract = _getEquipmentContractInterface(equipment)
  const lootData = useContractReads({
    contracts: [
      {
        ...equipmentContract,
        functionName: 'getWeapon',
        args: [_getEquipmentTokenId(equipment)]
      },
      {
        ...equipmentContract,
        functionName: 'getChest',
        args: [_getEquipmentTokenId(equipment)]
      },
      {
        ...equipmentContract,
        functionName: 'getHead',
        args: [_getEquipmentTokenId(equipment)]
      },
      {
        ...equipmentContract,
        functionName: 'getWaist',
        args: [_getEquipmentTokenId(equipment)]
      },
      {
        ...equipmentContract,
        functionName: 'getFoot',
        args: [_getEquipmentTokenId(equipment)]
      },
      {
        ...equipmentContract,
        functionName: 'getHand',
        args: [_getEquipmentTokenId(equipment)]
      },
      
      {
        ...equipmentContract,
        functionName: 'getNeck',
        args: [_getEquipmentTokenId(equipment)]
      },
      ,
      {
        ...equipmentContract,
        functionName: 'getRing',
        args: [_getEquipmentTokenId(equipment)]
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
        lootEquipment={equipment ? lootData.data : null}
        handleEquipmentChange={handleEquipmentChange}
        hasFreeMint={hasFreeMint}
        identityNftOptions={identityNftOptions}
        characterNftOptions={characterNftOptions}
        equipmentNftOptions={equipmentNftOptions}
        stats={dbData.stats}
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