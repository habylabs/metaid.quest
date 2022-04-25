const contractNameMap = {
  "0xE600AFed52558f0c1F8Feeeb128c9b932B7ae4e3": "Character",
  "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D": "BAYC",
  "0x60E4d786628Fea6478F785A6d7e704777c86a7c6": "MAYC",
  "0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7": "Meebits",
  "0x1A92f7381B9F03921564a437210bB9396471050C": "CoolCats",
  "0x7E6Bc952d4b4bD814853301bEe48E99891424de0": "Jungle Freaks",
  "0x439cac149B935AE1D726569800972E1669d17094": "The Idols",
  "0x508d06B8f3A4B0Fd363239Ce61e0C4b0B82f3626": "Loot Explorers",
  "0x5180db8F5c931aaE63c74266b211F580155ecac8": "Crypto Coven",
  "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e": "Doodles",
  "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03": "Nouns",
  "0x0290d49f53A8d186973B82faaFdaFe696B29AcBb": "HyperLoot",
  "0xED5AF388653567Af2F388E6224dC7C4b3241C544": "Azuki",
  "0x23581767a106ae21c074b2276D25e5C3e136a68b": "Moonbirds",
  "0xe785E82358879F061BC3dcAC6f0444462D4b5330": "World of Women"
}

const raceBonusMap = {
  "Human": {
    str: 0,
    dex: 0,
    con: 0,
    int: 1,
    wis: 0,
    cha: 1
  },
  "Orc": {
    str: 1,
    dex: 0,
    con: 1,
    int: 0,
    wis: 0,
    cha: 0
  },
  "Undead": {
    str: 0,
    dex: 0,
    con: 1,
    int: 0,
    wis: 1,
    cha: 0
  },
  "Ape Folk": {
    str: 1,
    dex: 1,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0
  },
  "Cat Folk": {
    str: 0,
    dex: 1,
    con: 0,
    int: 0,
    wis: 1,
    cha: 0
  },
  "Lizard Folk": {
    str: 0,
    dex: 0,
    con: 1,
    int: 1,
    wis: 0,
    cha: 0
  },
  "Elf": {
    str: 0,
    dex: 1,
    con: 0,
    int: 0,
    wis: 2,
    cha: 1
  },
  "Dwarf": {
    str: 2,
    dex: 0,
    con: 1,
    int: 1,
    wis: 0,
    cha: 0
  },
  "Gnome": {
    str: 0,
    dex: 2,
    con: 0,
    int: 1,
    wis: 1,
    cha: 0
  },
  "Goblin": {
    str: 0,
    dex: 0,
    con: 0,
    int: 1,
    wis: 1,
    cha: 2
  },
  "Robot": {
    str: 1,
    dex: 0,
    con: 1,
    int: 2,
    wis: 0,
    cha: 0
  },
  "Dark Elf": {
    str: 1,
    dex: 2,
    con: 0,
    int: 2,
    wis: 0,
    cha: 1
  },
  "Centaur": {
    str: 0,
    dex: 1,
    con: 2,
    int: 1,
    wis: 2,
    cha: 0
  },
  "Giant": {
    str: 3,
    dex: 0,
    con: 3,
    int: 0,
    wis: 0,
    cha: 0
  },
  "Halfling": {
    str: 0,
    dex: 2,
    con: 3,
    int: 0,
    wis: 0,
    cha: 1
  },
  "Vampire": {
    str: 0,
    dex: 1,
    con: 2,
    int: 0,
    wis: 1,
    cha: 2
  },
  "Alien": {
    str: 0,
    dex: 0,
    con: 0,
    int: 6,
    wis: 0,
    cha: 0
  },
  "Fairy": {
    str: 0,
    dex: 0,
    con: 0,
    int: 3,
    wis: 3,
    cha: 4
  },
  "Djinn": {
    str: 3,
    dex: 3,
    con: 0,
    int: 0,
    wis: 0,
    cha: 4
  },
  "Demon": {
    str: 0,
    dex: 3,
    con: 0,
    int: 3,
    wis: 0,
    cha: 4
  },
  "Angel": {
    str: 0,
    dex: 0,
    con: 3,
    int: 0,
    wis: 3,
    cha: 4
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
    int: 3,
    wis: 3,
    cha: 0
  },
  "Hunter": {
    str: 0,
    dex: 3,
    con: 0,
    int: 0,
    wis: 0,
    cha: 3
  },
  "Warrior": {
    str: 3,
    dex: 0,
    con: 3,
    int: 0,
    wis: 0,
    cha: 0
  },
}

const elementBonusMap = {
  "Fire": {
    str: 1,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 1
  },
  "Wind": {
    str: 0,
    dex: 1,
    con: 0,
    int: 1,
    wis: 0,
    cha: 0
  },
  "Earth": {
    str: 1,
    dex: 0,
    con: 1,
    int: 0,
    wis: 0,
    cha: 0
  },
  "Water": {
    str: 0,
    dex: 0,
    con: 1,
    int: 0,
    wis: 1,
    cha: 0
  },
  "Lightning": {
    str: 2,
    dex: 1,
    con: 0,
    int: 0,
    wis: 0,
    cha: 1
  },
  "Metal": {
    str: 1,
    dex: 0,
    con: 2,
    int: 1,
    wis: 0,
    cha: 0
  },
  "Poison": {
    str: 0,
    dex: 1,
    con: 0,
    int: 1,
    wis: 2,
    cha: 0
  },
  "Light": {
    str: 3,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 3
  },
  "Dark": {
    str: 0,
    dex: 3,
    con: 0,
    int: 0,
    wis: 0,
    cha: 3
  },
  "Chaos": {
    str: 0,
    dex: 5,
    con: 0,
    int: 0,
    wis: 0,
    cha: 5
  },
  "Gravity": {
    str: 0,
    dex: 0,
    con: 5,
    int: 5,
    wis: 0,
    cha: 0
  },
  "Time": {
    str: 5,
    dex: 0,
    con: 0,
    int: 0,
    wis: 5,
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