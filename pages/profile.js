import Head from 'next/head'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Mint, Withdraw } from '../components'

function Profile() {
  return (
    <>
      <Head>
        <title>
          Meta ID | Your NFT profile for the metaverse!
        </title>
      </Head>
      <div>
        <Mint />
        <Withdraw />
        <ConnectButton />
      </div>
    </>
  )
}

export default Profile