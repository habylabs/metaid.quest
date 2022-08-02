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
contractNameMap[CHARACTER_CONTRACT_ADDRESS.toLowerCase()] = 'Character'
contractNameMap[BAYC_CONTRACT_ADDRESS.toLowerCase()] = 'BAYC'
contractNameMap[MAYC_CONTRACT_ADDRESS.toLowerCase()] = 'MAYC'
contractNameMap[MEEBITS_CONTRACT_ADDRESS.toLowerCase()] = 'Meebits'
contractNameMap[COOLCATS_CONTRACT_ADDRESS.toLowerCase()] = 'CoolCats'
contractNameMap[JUNGLE_FREAKS_CONTRACT_ADDRESS.toLowerCase()] = 'Jungle Freaks'
contractNameMap[IDOLS_CONTRACT_ADDRESS.toLowerCase()] = 'The Idols'
contractNameMap[LOOT_EXPLORERS_CONTRACT_ADDRESS.toLowerCase()] = 'Loot Explorers'
contractNameMap[CRYPTO_COVEN_CONTRACT_ADDRESS.toLowerCase()] = 'Crypto Coven'
contractNameMap[DOODLES_CONTRACT_ADDRESS.toLowerCase()] = 'Doodles'
contractNameMap[NOUNS_CONTRACT_ADDRESS.toLowerCase()] = 'Nouns'
contractNameMap[HYPERLOOT_CONTRACT_ADDRESS.toLowerCase()] = 'HyperLoot'
contractNameMap[AZUKI_CONTRACT_ADDRESS.toLowerCase()] = 'Azuki'
contractNameMap[MOONBIRDS_CONTRACT_ADDRESS.toLowerCase()] = 'Moonbirds'
contractNameMap[WOW_CONTRACT_ADDRESS.toLowerCase()] = 'World of Women'
contractNameMap[LOOT_CONTRACT_ADDRESS.toLowerCase()] = 'Loot Bag'
contractNameMap[MLOOT_CONTRACT_ADDRESS.toLowerCase()] = 'mLoot Bag'

const raceBonusMap = {
  "Human": {
    str: 0,
    dex: 0,
    con: 0,
    int: 2,
    wis: 0,
    cha: 2
  },
  "Orc": {
    str: 2,
    dex: 0,
    con: 2,
    int: 0,
    wis: 0,
    cha: 0
  },
  "Undead": {
    str: 0,
    dex: 0,
    con: 2,
    int: 0,
    wis: 2,
    cha: 0
  },
  "Ape Folk": {
    str: 2,
    dex: 2,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0
  },
  "Cat Folk": {
    str: 0,
    dex: 2,
    con: 0,
    int: 0,
    wis: 2,
    cha: 0
  },
  "Lizard Folk": {
    str: 0,
    dex: 0,
    con: 2,
    int: 2,
    wis: 0,
    cha: 0
  },
  "Elf": {
    str: 0,
    dex: 2,
    con: 0,
    int: 0,
    wis: 4,
    cha: 2
  },
  "Dwarf": {
    str: 4,
    dex: 0,
    con: 2,
    int: 2,
    wis: 0,
    cha: 0
  },
  "Gnome": {
    str: 0,
    dex: 4,
    con: 0,
    int: 2,
    wis: 2,
    cha: 0
  },
  "Goblin": {
    str: 0,
    dex: 0,
    con: 0,
    int: 2,
    wis: 2,
    cha: 4
  },
  "Robot": {
    str: 2,
    dex: 0,
    con: 2,
    int: 4,
    wis: 0,
    cha: 0
  },
  "Dark Elf": {
    str: 3,
    dex: 6,
    con: 0,
    int: 6,
    wis: 0,
    cha: 3
  },
  "Centaur": {
    str: 0,
    dex: 3,
    con: 6,
    int: 3,
    wis: 6,
    cha: 0
  },
  "Giant": {
    str: 9,
    dex: 0,
    con: 9,
    int: 0,
    wis: 0,
    cha: 0
  },
  "Halfling": {
    str: 0,
    dex: 6,
    con: 9,
    int: 0,
    wis: 0,
    cha: 3
  },
  "Vampire": {
    str: 0,
    dex: 3,
    con: 6,
    int: 0,
    wis: 3,
    cha: 6
  },
  "Alien": {
    str: 0,
    dex: 0,
    con: 0,
    int: 18,
    wis: 0,
    cha: 0
  },
  "Fairy": {
    str: 0,
    dex: 0,
    con: 0,
    int: 12,
    wis: 12,
    cha: 16
  },
  "Djinn": {
    str: 12,
    dex: 12,
    con: 0,
    int: 0,
    wis: 0,
    cha: 16
  },
  "Demon": {
    str: 0,
    dex: 12,
    con: 0,
    int: 12,
    wis: 0,
    cha: 16
  },
  "Angel": {
    str: 0,
    dex: 0,
    con: 12,
    int: 0,
    wis: 12,
    cha: 16
  },
}

const roleCategoryMap = {
  "Artist": "Mage",
  "Bard": "Mage",
  "Dancer": "Warrior",
  "Influencer": "Hunter",
  "Chef": "Hunter",
  "Sculptor": "Mage",
  "Explorer": "Hunter",
  "Scout": "Hunter",
  "Pirate": "Hunter",
  "Astronaut": "Hunter",
  "Pilot": "Warrior",
  "Mage": "Mage",
  "Healer": "Mage",
  "Enchanter": "Mage",
  "Necromancer": "Mage",
  "Summoner": "Mage",
  "Martial Artist": "Warrior",
  "Monk": "Warrior",
  "Yogi": "Warrior",
  "Merchant": "Hunter",
  "Investor": "Hunter",
  "Patron of the Arts": "Mage",
  "Telepath": "Mage",
  "Telekinetic": "Mage",
  "Shapeshifter": "Mage",
  "Ranger": "Hunter",
  "Beast Master": "Hunter",
  "Hunter": "Hunter",
  "Detective": "Hunter",
  "Rogue": "Hunter",
  "Thief": "Hunter",
  "Assassin": "Hunter",
  "Ninja": "Hunter",
  "Spy": "Hunter",
  "Tech": "Mage",
  "Alchemist": "Mage",
  "Engineer": "Mage",
  "Inventor": "Mage",
  "Scientist": "Mage",
  "Hacker": "Warrior",
  "Blacksmith": "Warrior",
  "Warrior": "Warrior",
  "Paladin": "Warrior",
  "Knight": "Warrior",
  "Samurai": "Warrior",
  "Demon Slayer": "Warrior",
  "Berserker": "Warrior",
}

const roleBonusMap = {
  "Mage": {
    str: 0,
    dex: 0,
    con: 0,
    int: 6,
    wis: 6,
    cha: 0
  },
  "Hunter": {
    str: 0,
    dex: 6,
    con: 0,
    int: 0,
    wis: 0,
    cha: 6
  },
  "Warrior": {
    str: 6,
    dex: 0,
    con: 6,
    int: 0,
    wis: 0,
    cha: 0
  },
}

const elementBonusMap = {
  "Fire": {
    str: 2,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 2
  },
  "Wind": {
    str: 0,
    dex: 2,
    con: 0,
    int: 2,
    wis: 0,
    cha: 0
  },
  "Earth": {
    str: 2,
    dex: 0,
    con: 2,
    int: 0,
    wis: 0,
    cha: 0
  },
  "Water": {
    str: 0,
    dex: 0,
    con: 2,
    int: 0,
    wis: 2,
    cha: 0
  },
  "Lightning": {
    str: 4,
    dex: 2,
    con: 0,
    int: 0,
    wis: 0,
    cha: 2
  },
  "Metal": {
    str: 2,
    dex: 0,
    con: 4,
    int: 2,
    wis: 0,
    cha: 0
  },
  "Poison": {
    str: 0,
    dex: 2,
    con: 0,
    int: 2,
    wis: 4,
    cha: 0
  },
  "Light": {
    str: 9,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 9
  },
  "Dark": {
    str: 0,
    dex: 9,
    con: 0,
    int: 0,
    wis: 0,
    cha: 9
  },
  "Chaos": {
    str: 0,
    dex: 20,
    con: 0,
    int: 0,
    wis: 0,
    cha: 20
  },
  "Gravity": {
    str: 0,
    dex: 0,
    con: 20,
    int: 20,
    wis: 0,
    cha: 0
  },
  "Time": {
    str: 20,
    dex: 0,
    con: 0,
    int: 0,
    wis: 20,
    cha: 0
  },
}

export {
  contractNameMap,
  raceBonusMap,
  roleCategoryMap,
  roleBonusMap,
  elementBonusMap
}