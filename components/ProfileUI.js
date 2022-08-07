import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Select } from '@mantine/core';

import {
  contractNameMap
} from '../util/mapping'

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
      case 0:
        return 'Onboarding Step 0'
      case 1:
        return 'Onboarding Step 1'
      case 2:
        return 'Onboarding Step 2'
      case 3:
        return 'Onboarding Step 3'
      case 4:
        return 'Onboarding Step 4'
      case 5:
        return 'Onboarding Step 5'
      case 6:
        return 'Onboarding Step 6'
      default:
        break;
    }
  }

  return 'Mint your Meta ID'
}

const MainText = ({ isMinted, didMintToday, onboardingStep }) => {
  if (isMinted && !didMintToday) {
     return null
  }

  return (
    <div>
      {getMainText(isMinted, onboardingStep)}
    </div>
  )
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
      label: `${contractNameMap[nft.contract]} #${nft.tokenId}`
    }))}
  />
)

const BonusCharSelect = ({ bonusChar, identityNftOptions, onChange }) => (
  <Select
    clearable
    searchable
    label="Bonus Character"
    placeholder="Choose Your Bonus Character"
    value={_getExtraCharSelectValue(bonusChar)}
    onChange={(value) => onChange(value)}
    data={identityNftOptions.map((nft) => ({
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

const _getCtaTitleText = () => {}

const Cta = ({
  isMinted,
  didMintToday,
  onboardingStep,
  pfp,
  handlePfpChange,
  bonusChar,
  handleBonusCharChange,
  equipment,
  handleEquipmentChange,
  identityNftOptions,
  characterNftOptions,
  equipmentNftOptions
}) => {
  if (!isMinted) {
    return <Mint free={identityNftOptions.length > 0 || characterNftOptions.length > 0}/>
  }

  return (
    <div className='row'>
      <PfpSelect
        pfp={pfp}
        identityNftOptions={identityNftOptions}
        onChange={handlePfpChange}
      />
      <BonusCharSelect
        bonusChar={bonusChar}
        identityNftOptions={identityNftOptions}
        onChange={handleBonusCharChange}
      />
      <EquipmentSelect
        equipment={equipment}
        equipmentNftOptions={equipmentNftOptions}
        onChange={handleEquipmentChange}
      />
    </div>
  )
}

const ProfileUI = ({
  pfp,
  handlePfpChange,
  bonusChar,
  handleBonusCharChange,
  equipment,
  handleEquipmentChange,
  allNfts,
  identityNftOptions,
  characterNftOptions,
  equipmentNftOptions,
  rank,
  isMinted,
  setIsMinted,
  didMintToday,
  setDidMintToday,
  onboardingStep,
  setOnboardingStep,
}) => {
  // There are effectively 3 sections on the Profile page
  // 1. Main text
  // 2. Data content (Rank & Meta ID)
  // 3. CTA
  // All 3 sections always exist, but the exact content of each of them change
  // based on their mint and onboarding state.

  return (
    <div>
      <MainText
        isMinted={isMinted}
        didMintToday={didMintToday}
        onboardingStep={onboardingStep}
      />
      <Rank rank={rank}/>
      <MetaId empty={!isMinted} data={{}} example={isMinted} />
      <Cta
        isMinted={isMinted}
        didMintToday={didMintToday}
        onboardingStep={onboardingStep}
        pfp={pfp}
        handlePfpChange={handlePfpChange}
        bonusChar={bonusChar}
        handleBonusCharChange={handleBonusCharChange}
        equipment={equipment}
        handleEquipmentChange={handleEquipmentChange}
        identityNftOptions={identityNftOptions}
        characterNftOptions={characterNftOptions}
        equipmentNftOptions={equipmentNftOptions}
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

export default ProfileUI