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
  "Human": 4,
  "Orc": 4,
  "Undead": 4,
  "Ape Folk": 4,
  "Cat Folk": 4,
  "Lizard Folk": 4,
  "Bird Folk": 4,
  "Elf": 9,
  "Dwarf": 9,
  "Gnome": 9,
  "Goblin": 9,
  "Robot": 9,
  "Dark Elf": 16,
  "Centaur": 16,
  "Giant": 16,
  "Halfling": 16,
  "Vampire": 16,
  "Alien": 16,
  "Fairy": 25,
  "Djinn": 25,
  "Demon": 25,
  "Angel": 25,
}

const elementBonusMap = {
  "Fire": 4,
  "Wind": 4,
  "Earth": 4,
  "Water": 4,
  "Lightning": 9,
  "Metal": 9,
  "Poison": 9,
  "Light": 16,
  "Dark": 16,
  "Chaos": 25,
  "Gravity": 25,
  "Time": 25,
}

export {
  contractNameMap,
  raceBonusMap,
  elementBonusMap
}