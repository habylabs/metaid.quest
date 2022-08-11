import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Select } from '@mantine/core';

import {
  contractNameMap
} from '../util/mapping'

import {
  getLuck,
} from '../util/stats'

import {
  getPfpEquipment,
} from '../util/equipment'

import {
  CHARACTER_CONTRACT_ADDRESS,
} from '../util/constants'

import {
  Button,
  MetaId,
  Mint,
  Rank,
  Withdraw
} from '.'

const getMainText = (isMinted, onboardingStep) => {
  if (isMinted) {
    switch (onboardingStep) {
      case 1:
        return 'Choose your PFP!'
      case 2:
        return 'You\'re missing a role and element. Mint a Character to get one and increase your bonus level!'
      case 3:
        return 'Choose your equipment!'
      case 4:
        return 'Share your Meta ID!'
      default:
        return 'Choose your PFP!'
    }
  }

  return 'Mint your Meta ID'
}

const MainText = ({ isMinted, isOnboardingDone, onboardingStep }) => {
  if (isMinted && isOnboardingDone) {
     return null
  }

  return (
    <div>
      {getMainText(isMinted, onboardingStep)}
    </div>
  )
}

const _getEquipmentItems = (pfp, equipment, lootEquipment) => {
  if (equipment) {
    return {
      weapon: lootEquipment[0],
      chestArmor: lootEquipment[1],
      headArmor: lootEquipment[2],
      waistArmor: lootEquipment[3],
      footArmor: lootEquipment[4],
      handArmor: lootEquipment[5],
      necklace: lootEquipment[6],
      ring: lootEquipment[7]
    }
  }

  if (pfp) {
    return getPfpEquipment(pfp)
  }

  return {
    weapon: '???',
    chestArmor: '???',
    headArmor: '???',
    waistArmor: '???',
    footArmor: '???',
    handAmor: '???',
    necklace: '???',
    ring: '???'
  }
}

const _getPfpSelectValue = (pfp) => (
  pfp.contract ? `${pfp.contract}-${pfp.id}` : null
)

const _getExtraCharSelectValue = (bonusChar) => (
  bonusChar.id ? `${CHARACTER_CONTRACT_ADDRESS}-${bonusChar.id}` : null
)

const _getEquipmentSelectValue = (equipment) => (
  equipment ? `${equipment.address}-${equipment.id}` : null
)

const PfpSelect = ({ pfp, identityNftOptions, onChange }) => (
  <Select
    searchable
    label="Identity"
    placeholder="Choose Your PFP"
    value={_getPfpSelectValue(pfp)}
    onChange={(value) => onChange(value)}
    data={identityNftOptions.map((nft) => ({
      value: `${nft.contract}-${nft.tokenId}`,
      label: `${contractNameMap[nft.contract] || nft.title || '???'} #${nft.tokenId}`
    }))}
  />
)

const BonusCharSelect = ({ bonusChar, characterNftOptions, onChange }) => (
  <Select
    clearable
    searchable
    label="Bonus Character"
    placeholder="Choose Your Bonus Character"
    value={_getExtraCharSelectValue(bonusChar)}
    onChange={(value) => onChange(value)}
    data={characterNftOptions.map((nft) => ({
      value: `${nft.contract}-${nft.tokenId}`,
      label: `${contractNameMap[nft.contract]} #${nft.tokenId}`
    }))}
  />
)

const EquipmentSelect = ({ equipment, equipmentNftOptions, onChange }) => (
  <Select
    clearable
    searchable
    label="Equipment"
    placeholder="Choose Your Equipment"
    value={_getEquipmentSelectValue(equipment)}
    onChange={(value) => onChange(value)}
    data={equipmentNftOptions.map((nft) => ({
      value: `${nft.contract}-${nft.tokenId}`,
      label: `${contractNameMap[nft.contract]} #${nft.tokenId}`
    }))}
  />
)

const SkipButton = ({ onClick }) => (
  <Button outline onClick={onClick}>
    Skip
  </Button>
)

const Cta = ({
  isMinted,
  isOnboardingDone,
  onboardingStep,
  pfp,
  handlePfpChange,
  bonusChar,
  handleBonusCharChange,
  equipment,
  handleEquipmentChange,
  hasFreeMint,
  identityNftOptions,
  characterNftOptions,
  equipmentNftOptions,
  handleOnboardingStep
}) => {
  if (!isMinted) {
    return (
      <div>
        <Mint free={hasFreeMint}/>
        {
          hasFreeMint && (
            <div>
              <p className='monospace-font'>
                Meta ID is free to print for owners of <a href=''>Eligible Projects</a>,
                including <strong>Character</strong>. You can mint a{' '}
                <strong>Character</strong> for 0.02 ETH.
              </p>
              <Mint isCharacter />
            </div>
          )
        }
      </div>
    )
  }

  if (!isOnboardingDone) {
    switch (onboardingStep) {
      case 1:
        return (
          <div>
            <PfpSelect
              pfp={pfp}
              identityNftOptions={identityNftOptions}
              onChange={handlePfpChange}
            />
          </div>
        )
      case 2:
        return (
          <div>
            <Mint isCharacter />
            <SkipButton onClick={handleOnboardingStep} />
          </div>
        )
      case 3:
        return (
          <div>
            <EquipmentSelect
              equipment={equipment}
              equipmentNftOptions={equipmentNftOptions}
              onChange={handleEquipmentChange}
            />
            <SkipButton onClick={handleOnboardingStep} />
          </div>
        )
      case 4:
        return (
          <div>
            <Button onClick={handleOnboardingStep}>
              Share Meta ID on Twitter
            </Button>
            <SkipButton onClick={handleOnboardingStep} />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className='row'>
      <PfpSelect
        pfp={pfp}
        identityNftOptions={identityNftOptions}
        onChange={handlePfpChange}
      />
      { characterNftOptions.length > 0 ?
        <BonusCharSelect
          bonusChar={bonusChar}
          characterNftOptions={characterNftOptions}
          onChange={handleBonusCharChange}
        /> :
        <Mint isCharacter />
      }
      <EquipmentSelect
        equipment={equipment}
        equipmentNftOptions={equipmentNftOptions}
        onChange={handleEquipmentChange}
      />
      <Button onClick={() => console.log('Update DB')}>
        Update
      </Button>
      <Button onClick={() => console.log('Share Meta ID')}>
        Share Meta ID
      </Button>
    </div>
  )
}

const ProfileUI = ({
  pfp,
  handlePfpChange,
  bonusChar,
  handleBonusCharChange,
  equipment,
  lootEquipment,
  handleEquipmentChange,
  hasFreeMint,
  identityNftOptions,
  characterNftOptions,
  equipmentNftOptions,
  stats,
  rank,
  isMinted,
  handleIsMinted,
  isOnboardingDone,
  handleOnboardingDone,
  onboardingStep,
  handleOnboardingStep,
}) => {
  // There are effectively 3 sections on the Profile page
  // 1. Main text
  // 2. Data content (Rank & Meta ID)
  // 3. CTA
  // All 3 sections always exist, but the exact content of each of them change
  // based on their mint and onboarding state.
  const equipmentItems =  _getEquipmentItems(pfp, equipment, lootEquipment)

  return (
    <div>
      <MainText
        isMinted={isMinted}
        isOnboardingDone={isOnboardingDone}
        onboardingStep={onboardingStep}
      />
      <Rank rank={rank}/>
      <MetaId
        empty={!isMinted}
        data={{
          identity: {
            pfp,
            character: bonusChar
          },
          equipment: equipmentItems,
          stats: {
            ...stats,
            luck: getLuck(
              {
                pfp,
                character: bonusChar
              },
              equipmentItems
            )
          }
        }}
      />
      <Cta
        isMinted={isMinted}
        isOnboardingDone={isOnboardingDone}
        onboardingStep={onboardingStep}
        pfp={pfp}
        handlePfpChange={handlePfpChange}
        bonusChar={bonusChar}
        handleBonusCharChange={handleBonusCharChange}
        equipment={equipment}
        handleEquipmentChange={handleEquipmentChange}
        hasFreeMint={hasFreeMint}
        identityNftOptions={identityNftOptions}
        characterNftOptions={characterNftOptions}
        equipmentNftOptions={equipmentNftOptions}
        handleOnboardingStep={handleOnboardingStep}
      />
      
      <ConnectButton />
      <Withdraw />
      <div className='row'>
        <Button small outline onClick={handleIsMinted}>
          Minted: {`${isMinted}`}
        </Button>

        <Button small outline onClick={handleOnboardingDone}>
          Onboarding Done: {`${isOnboardingDone}`}
        </Button>

        <Button small outline onClick={handleOnboardingStep}>
          Onboarding Step {onboardingStep}
        </Button>
      </div>
    </div>
  )
}

export default ProfileUI