import { getRace } from "./identity"

const getContractImage = (identity, stats) => {
  const name = identity.name || 'None'
  const guild = identity.pfp.guild || 'None'
  const id = identity.pfp.id ? `#${identity.pfp.id}` : 'None'

  // This should return a Base64 encoded string where the start of the string is `data:image/svg+xml;base64,`
  const svg = `
    <svg width="550" height="500" viewBox="0 0 550 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .level-title { fill: #BBB; font-family: monospace; font-size: 18px; }
        .level-num { fill: #FFF; font-family: monospace; font-size: 60px; }
        .titleText { fill: #BBB; font-family: monospace; font-size: 10px; }
        .baseText { fill: #FFF; font-family: monospace; font-size: 14px; }
        .rect-border {
          stroke: #FDF6E3;
          stroke-width: 2px;
        }
      </style>
      <rect width="550" height="500" fill="#002B36"/>
      <text x="80" y="80" class="titleText">NAME</text>
      <text x="80" y="95" class="baseText">${name}</text>
      <text x="80" y="130" class="titleText">GUILD</text>
      <text x="80" y="145" class="baseText">${guild}</text>
      <text x="80" y="180" class="titleText">ID</text>
      <text x="80" y="195" class="baseText">${id}</text>
      <text x="80" y="230" class="titleText">RACE</text>
      <text x="80" y="245" class="baseText">${getRace(identity)}</text>
      <text x="80" y="280" class="titleText">NFT LEVEL</text>
      <text x="80" y="295" class="baseText">${stats.nftLevel}</text>
      <text x="80" y="330" class="titleText">DEFI LEVEL</text>
      <text x="80" y="345" class="baseText">${stats.defiLevel}</text>
      <rect x="41" y="36" width="428" height="428" stroke="#002B36" stroke-width="30"/>
      <rect x="41" y="36" width="428" height="428" class="rect-border"/>
      <rect x="46" y="41" width="418" height="418" class="rect-border"/>
      <path d="M433.077 305.292L401.155 250L433.077 194.708H496.923L528.845 250L496.923 305.292H433.077Z" fill="#002B36" class="rect-border"/>
      <text x="450" y="225" class="level-title">LVL</text>
      <text x="430" y="280" class="level-num">${stats.level}</text>
    </svg>
  `

  const bufferObj = Buffer.from(svg).toString('base64')
  return `data:image/svg+xml;base64,${bufferObj}`
}

export {
  getContractImage
}