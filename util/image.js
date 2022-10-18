const getContractImage = (identity, stats) => {
  // This should return a Base64 encoded string where the start of the string is `data:image/svg+xml;base64,`
  const svg = `
    <svg width='550' height='500' viewBox='0 0 550 500' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <style>
        .level-title { fill: #BBB; font-family: monospace; font-size: 18px; }
        .level-num { fill: #FFF; font-family: monospace; font-size: 60px; }
        .rect-border {
          stroke: #FDF6E3;
          stroke-width: 2px;
        }
      </style>
      <rect width='550' height='500' fill='#002B36'/>
      <image href='${identity.pfp.image}' height='428' width='428' x='41' y='36'/>
      <rect x='41' y='36' width='428' height='428' stroke='#002B36' stroke-width='30'/>
      <rect x='41' y='36' width='428' height='428' class='rect-border'/>
      <rect x='46' y='41' width='418' height='418' class='rect-border'/>
      <path d='M433.077 305.292L401.155 250L433.077 194.708H496.923L528.845 250L496.923 305.292H433.077Z' fill='#002B36' class='rect-border'/>
      <text x='450' y='225' class='level-title'>LVL</text>
      <text x='430' y='280' class='level-num'>${stats.level}</text>
    </svg>
  `

  return svg

  //const bufferObj = Buffer.from(svg).toString('base64')
  //return `data:image/svg+xml;base64,${bufferObj}`
}

export {
  getContractImage
}