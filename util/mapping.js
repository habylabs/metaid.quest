import {
  CHARACTER_CONTRACT_ADDRESS,
  BAYC_CONTRACT_ADDRESS,
  MAYC_CONTRACT_ADDRESS,
  MEEBITS_CONTRACT_ADDRESS,
  COOLCATS_CONTRACT_ADDRESS,
  JUNGLE_FREAKS_CONTRACT_ADDRESS,
  IDOLS_CONTRACT_ADDRESS,
  LOOT_EXPLORERS_CONTRACT_ADDRESS,
  CRYPTO_COVEN_CONTRACT_ADDRESS,
  DOODLES_CONTRACT_ADDRESS,
  NOUNS_CONTRACT_ADDRESS,
  HYPERLOOT_CONTRACT_ADDRESS,
  AZUKI_CONTRACT_ADDRESS,
  MOONBIRDS_CONTRACT_ADDRESS,
  WOW_CONTRACT_ADDRESS,
  LOOT_CONTRACT_ADDRESS,
  MLOOT_CONTRACT_ADDRESS,
} from './constants'

const contractNameMap = {}
contractNameMap[CHARACTER_CONTRACT_ADDRESS] = 'Character'
contractNameMap[BAYC_CONTRACT_ADDRESS] = 'BAYC'
contractNameMap[MAYC_CONTRACT_ADDRESS] = 'MAYC'
contractNameMap[MEEBITS_CONTRACT_ADDRESS] = 'Meebits'
contractNameMap[COOLCATS_CONTRACT_ADDRESS] = 'CoolCats'
contractNameMap[JUNGLE_FREAKS_CONTRACT_ADDRESS] = 'Jungle Freaks'
contractNameMap[IDOLS_CONTRACT_ADDRESS] = 'The Idols'
contractNameMap[LOOT_EXPLORERS_CONTRACT_ADDRESS] = 'Loot Explorers'
contractNameMap[CRYPTO_COVEN_CONTRACT_ADDRESS] = 'Crypto Coven'
contractNameMap[DOODLES_CONTRACT_ADDRESS] = 'Doodles'
contractNameMap[NOUNS_CONTRACT_ADDRESS] = 'Nouns'
contractNameMap[HYPERLOOT_CONTRACT_ADDRESS] = 'HyperLoot'
contractNameMap[AZUKI_CONTRACT_ADDRESS] = 'Azuki'
contractNameMap[MOONBIRDS_CONTRACT_ADDRESS] = 'Moonbirds'
contractNameMap[WOW_CONTRACT_ADDRESS] = 'World of Women'
contractNameMap[LOOT_CONTRACT_ADDRESS] = 'Loot Bag'
contractNameMap[MLOOT_CONTRACT_ADDRESS] = 'mLoot Bag'

const raceBonusMap = {
  "Human": 1,
  "Orc": 1,
  "Undead": 1,
  "Ape Folk": 1,
  "Cat Folk": 1,
  "Lizard Folk": 1,
  "Bird Folk": 1,
  "Elf": 3,
  "Dwarf": 3,
  "Gnome": 3,
  "Goblin": 3,
  "Robot": 3,
  "Dark Elf": 5,
  "Centaur": 5,
  "Giant": 5,
  "Halfling": 5,
  "Vampire": 5,
  "Alien": 5,
  "Fairy": 8,
  "Djinn": 8,
  "Demon": 8,
  "Angel": 8,
}

const elementBonusMap = {
  "Fire": 1,
  "Wind": 1,
  "Earth": 1,
  "Water": 1,
  "Lightning": 3,
  "Metal": 3,
  "Poison": 3,
  "Light": 5,
  "Dark": 5,
  "Chaos": 8,
  "Gravity": 8,
  "Time": 8,
}

export {
  contractNameMap,
  raceBonusMap,
  elementBonusMap
}