import { useMediaQuery } from 'react-responsive'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Select, Stepper } from '@mantine/core';

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
  Card,
  MetaId,
  Mint,
  Rank,
} from '.'

import styles from '../styles/components/ProfileUI.module.css';
import Link from 'next/link';

const OnboardingSteps = ({ isMinted, isOnboardingDone, onboardingStep }) => {
  if (isMinted && isOnboardingDone) {
     return null
  }

  return (
    <div>
      <Stepper color="dark" active={onboardingStep} breakpoint="sm">
        <Stepper.Step label="Step 1" description="Connect Wallet" allowStepSelect={false} />
        <Stepper.Step label="Step 2" description="Mint Meta ID" allowStepSelect={false} />
        <Stepper.Step label="Step 3" description="Choose PFP" allowStepSelect={false} />
        <Stepper.Step label="Step 4" description="Increase Luck" allowStepSelect={false} />
        <Stepper.Step label="Step 5" description="Done" allowStepSelect={false} />
        <Stepper.Completed />
      </Stepper>
    </div>
  )
}

const _getEquipmentItems = (pfp, equipment, lootEquipment) => {
  if (equipment && equipment.address) {
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

const PfpSelect = ({ pfp, identityNftOptions, onChange, isOnboardingDone = false }) => (
  <Select
    searchable
    label={isOnboardingDone ? 'PFP' : null }
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

const NextButton = ({
  onClick,
  isSkip = false,
  isDisabled = false,
  isSave = false,
}) => (
  <Button
    disabled={isDisabled}
    onClick={onClick}
    outline={isSkip}
    small={isSkip}
  >
    {isSkip ? 'Skip' : isSave ? 'Save' : 'Next'}
  </Button>
)

const Cta = ({
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
  handleOnboardingStep,
  equipmentItems,
  stats,
  saveData,
  handleMetaIdMint,
  handleCharacterMint,
}) => {
  const data = {
    pfp,
    bonusChar,
    equipment,
    equipmentItems,
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
  }

  if (!isOnboardingDone) {
    switch (onboardingStep) {
      case 1: 
        // Need to save data after the user mints the Meta ID so we have
        // it associated in the DB correctly from the getgo
        return (
          <div>
            <Mint
              isDisabled
              free={hasFreeMint}
              identityNftOptions={identityNftOptions}
              characterNftOptions={characterNftOptions}
              equipmentNftOptions={equipmentNftOptions}
              transactionSuccess={(tokenId) => handleMetaIdMint(tokenId, data)}
            />
          </div>
        )
      case 2:
        return (
          <div className='column'>
            <p className='monospace-font'>
              Choose your PFP and click <strong>Next</strong> once
              you{'\''}re done. You can always change it later.
            </p>
            <div className={`row ${styles.onboardingStep2}`}>
              <PfpSelect
                pfp={pfp}
                identityNftOptions={identityNftOptions}
                onChange={handlePfpChange}
              />
              <NextButton
                onClick={handleOnboardingStep}
                isDisabled={pfp.contract ? false : true}
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div>
            <div className={`row ${styles.onboardingStep3}`}>
              <p className='monospace-font'>
                Luck is based on your race, role, element, and equipment,
                and you can have more than one. Increase your luck by minting 
                an extra Character. You can aso do this later.
              </p>
              <div className={styles.skipButtonContainerPadding}>
                <NextButton onClick={handleOnboardingStep} isSkip />
              </div>
            </div>
            <div className='row justify-center'>
              <Mint
                isCharacter
                transactionSuccess={(tokenId) => handleCharacterMint(tokenId, data)}
              />
            </div>
          </div>
        )
      case 4:
        return (
          <div>
            <div className={`row ${styles.onboardingStep4}`}>
              <p className='monospace-font no-margin'>
                Congrats! You{'\''}ve set up your Meta ID.
              </p>
            </div>
            <div className='row justify-center'>
              <NextButton
                isSave
                onClick={() => {
                  handleOnboardingStep()
                  saveData(data)
                }} 
              />
            </div>
          </div>
          
        )
      default:
        return null
    }
  }

  return (
    <div className={`row ${styles.actionButtonsContainer}`}>
      <PfpSelect
        pfp={pfp}
        identityNftOptions={identityNftOptions}
        onChange={handlePfpChange}
        isOnboardingDone
      />
      { 
        characterNftOptions.length > 0 ?
        <BonusCharSelect
          bonusChar={bonusChar}
          characterNftOptions={characterNftOptions}
          onChange={handleBonusCharChange}
        /> :
        <div>
          <p className='no-margin monospace-font'>
            You don{'\''}t have any Bonus Characters.
          </p>
          <p className='no-margin monospace-font'>
            <Link href='/character'>
              <a className='link-bright'>
                Mint one!
              </a>
            </Link>
          </p>
        </div>
      }
      {
        equipmentNftOptions.length > 0 ?
        <EquipmentSelect
          equipment={equipment}
          equipmentNftOptions={equipmentNftOptions}
          onChange={handleEquipmentChange}
        /> :
        <div>
          <p className='no-margin monospace-font'>
            You don{'\''}t have any Loot or mLoot to use for Equipment.{' '}
          </p>
          <p className='no-margin monospace-font'>
            <a
              href="https://opensea.io/collection/lootproject"
              target="_blank"
              rel="noopener noreferrer"
              className='link-bright monospace-font'
            >
              Buy one!
            </a>
          </p>
        </div>
      }
      <Button onClick={() => { saveData(data) }}>
        Update
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
  isOnboardingDone,
  onboardingStep,
  handleOnboardingStep,
  saveData,
  handleMetaIdMint,
  handleCharacterMint
}) => {
  // There are effectively 3 sections on the Profile page
  // 1. Main text
  // 2. Data content (Rank & Meta ID)
  // 3. CTA
  // All 3 sections always exist, but the exact content of each of them change
  // based on their mint and onboarding state.
  const isMobile = useMediaQuery({ maxWidth: 480 })
  const equipmentItems =  _getEquipmentItems(pfp, equipment, lootEquipment)

  return (
    <div className={styles.profileUIContainer}>
      <div className={`${styles.onboardingStepsContainer} ${isMobile ? 'side-padding-mobile' : 'side-padding'}`}>
        <OnboardingSteps
          isMinted={isMinted}
          isOnboardingDone={isOnboardingDone}
          onboardingStep={onboardingStep}
        />
      </div>
      
      <div className={isMobile ? 'side-padding-mobile' : 'side-padding'}>
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
      </div>
      <div className={`${styles.ctaContainer} ${isMobile ? 'side-padding-mobile' : 'side-padding'}`}>
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
          equipmentItems={equipmentItems}
          stats={stats}
          saveData={saveData}
          handleMetaIdMint={handleMetaIdMint}
          handleCharacterMint={handleCharacterMint}
        />
      </div>
      
      <Card darkBackground>
        <Rank rank={rank}/>
      </Card>
      <Card>
        <ConnectButton />
      </Card>
    </div>
  )
}

export default ProfileUI