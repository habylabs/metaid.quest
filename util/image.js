import {
  getGuild,
  getId,
  getRace,
  getRole,
  getElement
} from "./identity"

import {
  getLevel,
  getHP,
  getMP
} from "./stats"

function getContractImage(identity, equipment, baseStats, bonusStats) {
  // This should return a Base64 encoded string where the start of the string is `data:image/svg+xml;base64,`
  const svg = `
    <svg width="1500" height="500" viewBox="0 0 1500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .base-text { fill: #FFF; font-family: monospace; font-size: 14px; }
        .title-text { fill: #BBB; font-family: monospace; font-size: 10px; }
        .head-text { fill: #FFF; font-family: monospace; font-size: 24px; }
        .level-title { fill: #BBB; font-family: monospace; font-size: 18px; }
        .level-num { fill: #FFF; font-family: monospace; font-size: 60px; }
        .rect-border {
          stroke: #FDF6E3;
          stroke-width: 2px;
        }
      </style>
      <rect width="1500" height="500" fill="#002B36"/>
      <image href="${identity.pfp.image}" height="428" width="428" x="41" y="36"/>
      <rect x="41" y="36" width="428" height="428" stroke="#002B36" stroke-width="30"/>
      <rect x="41" y="36" width="428" height="428" class="rect-border"/>
      <rect x="46" y="41" width="418" height="418" class="rect-border"/>
      <path d="M433.077 305.292L401.155 250L433.077 194.708H496.923L528.845 250L496.923 305.292H433.077Z" fill="#002B36" class="rect-border"/>
      <text x="450" y="225" class="level-title">LVL</text>
      <text x="430" y="280" class="level-num">${getLevel(baseStats)}</text>
      <rect x="581" y="36" width="258" height="428" class="rect-border"/>
      <rect x="586" y="41" width="248" height="418" class="rect-border"/>
      <text x="652" y="80" class="head-text">IDENTITY</text>
      <text x="600" y="110" class="title-text">${identity.name}</text>
      <text x="600" y="125" class="base-text">michaelcjoseph.eth</text>
      <text x="600" y="150" class="title-text">GUILD</text>
      <text x="600" y="165" class="base-text">${getGuild(identity)}</text>
      <text x="600" y="190" class="title-text">ID</text>
      <text x="600" y="205" class="base-text">${getId(identity)}</text>
      <text x="600" y="230" class="title-text">RACE</text>
      <text x="600" y="245" class="base-text">${getRace(identity)}</text>
      <text x="600" y="270" class="title-text">ROLE</text>
      <text x="600" y="285" class="base-text">${getRole(identity)}</text>
      <text x="600" y="310" class="title-text">ELEMENT</text>
      <text x="600" y="325" class="base-text">${getElement(identity)}</text>
      <rect x="865" y="36" width="408" height="428" class="rect-border"/>
      <rect x="870" y="41" width="398" height="418" class="rect-border"/>
      <text x="1004" y="80" class="head-text">EQUIPMENT</text>
      <text x="884" y="110" class="title-text">WEAPON</text>
      <text x="884" y="125" class="base-text">${equipment.weapon}</text>
      <text x="884" y="150" class="title-text">CHEST ARMOR</text>
      <text x="884" y="165" class="base-text">${equipment.chestArmor}</text>
      <text x="884" y="190" class="title-text">HEAD ARMOR</text>
      <text x="884" y="205" class="base-text">${equipment.headArmor}</text>
      <text x="884" y="230" class="title-text">WAIST ARMOR</text>
      <text x="884" y="245" class="base-text">${equipment.waistArmor}</text>
      <text x="884" y="270" class="title-text">HAND ARMOR</text>
      <text x="884" y="285" class="base-text">${equipment.handAmor}</text>
      <text x="884" y="310" class="title-text">FOOT ARMOR</text>
      <text x="884" y="325" class="base-text">${equipment.footArmor}</text>
      <text x="884" y="350" class="title-text">NECKLACE</text>
      <text x="884" y="365" class="base-text">${equipment.necklace}</text>
      <text x="884" y="390" class="title-text">RING</text>
      <text x="884" y="405" class="base-text">${equipment.ring}</text>
      <rect x="1299" y="36" width="158" height="428" class="rect-border"/>
      <rect x="1304" y="41" width="148" height="418" class="rect-border"/>
      <text x="1342" y="80" class="head-text">STATS</text>
      <text x="1318" y="110" class="title-text">HP</text>
      <text x="1318" y="125" class="base-text">${getHP(baseStats, bonusStats)}</text>
      <text x="1318" y="150" class="title-text">MP</text>
      <text x="1318" y="165" class="base-text">${getMP(baseStats, bonusStats)}</text>
      <text x="1318" y="190" class="title-text">STR</text>
      <text x="1318" y="205" class="base-text">${baseStats.str} [+${bonusStats.str}]</text>
      <text x="1318" y="230" class="title-text">DEX</text>
      <text x="1318" y="245" class="base-text">${baseStats.dex} [+${bonusStats.dex}]</text>
      <text x="1318" y="270" class="title-text">CON</text>
      <text x="1318" y="285" class="base-text">${baseStats.con} [+${bonusStats.con}]</text>
      <text x="1318" y="310" class="title-text">INT</text>
      <text x="1318" y="325" class="base-text">${baseStats.int} [+${bonusStats.int}]</text>
      <text x="1318" y="350" class="title-text">WIS</text>
      <text x="1318" y="365" class="base-text">${baseStats.wis} [+${bonusStats.wis}]</text>
      <text x="1318" y="390" class="title-text">CHA</text>
      <text x="1318" y="405" class="base-text">${baseStats.cha} [+${bonusStats.cha}]</text>
    </svg>
  `

  const bufferObj = Buffer.from(svg, "utf8")
  return `data:image/svg+xml;base64,${bufferObj.toString("base64")}`
}

export {
  getContractImage
}