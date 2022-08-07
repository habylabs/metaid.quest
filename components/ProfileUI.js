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

const getPfpSelectValue = (pfp) => (
  pfp.contract ? `${pfp.contract}-${pfp.id}` : null
)

const getExtraCharSelectValue = (bonusChar) => (
  bonusChar.id ? `${CHARACTER_CONTRACT_ADDRESS.toLowerCase()}-${bonusChar.id}` : null
)

const getEquipmentSelectValue = (equipment) => (
  equipment ? `${equipment.address}-${equipment.id}` : null
)

const PfpSelect = ({ pfp, identityNftOptions, onChange }) => (
  <Select
    label="Identity"
    placeholder="Choose Your PFP"
    value={getPfpSelectValue(pfp)}
    onChange={(value) => onChange(value)}
    data={identityNftOptions.map((nft) => ({
      value: `${nft.contract.address}-${nft.tokenId}`,
      label: `${contractNameMap[nft.contract.address]} #${nft.tokenId}`
    }))}
  />
)

const BonusCharSelect = ({ bonusChar, identityNftOptions, onChange }) => (
  <Select
    label="Bonus Character"
    placeholder="Choose Your Bonus Character"
    value={getExtraCharSelectValue(bonusChar)}
    onChange={(value) => onChange(value)}
    data={identityNftOptions.map((nft) => ({
      value: `${nft.contract.address}-${nft.tokenId}`,
      label: `${contractNameMap[nft.contract.address]} #${nft.tokenId}`
    }))}
  />
)

const EquipmentSelect = ({ equipment, equipmentNftOptions, onChange }) => (
  <Select
    label="Equipment"
    placeholder="Choose Your Equipment"
    value={getEquipmentSelectValue(equipment)}
    onChange={(value) => onChange(value)}
    data={equipmentNftOptions.map((nft) => ({
      value: `${nft.contract.address}-${nft.tokenId}`,
      label: `${contractNameMap[nft.contract.address]} #${nft.tokenId}`
    }))}
  />
)

const MainText = ({ isMinted, didMintToday, onboardingStep }) => {
  if (isMinted && !didMintToday) {
     return null
  }

  let text = 'Mint your Meta ID'

  return (
    <div>
      {text}
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
  identityNftOptions,
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
      {!isMinted && <Mint />}
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