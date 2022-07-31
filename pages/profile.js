import { useState } from 'react'
import { useAccount } from 'wagmi'
import Head from 'next/head'
import Router from 'next/router'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button, MetaId, Mint, Withdraw } from '../components'

function Profile() {
  const [ isMinted, setIsMinted ] = useState(false)
  const { address, isConnected } = useAccount()
  if (!isConnected) {
    Router.push('/')
  }

  return (
    <>
      <Head>
        <title>
          Meta ID | Your NFT profile for the metaverse!
        </title>
      </Head>
      <div>
        <Button onClick={() => setIsMinted(!isMinted)}>
          Changed Minted Status
        </Button>
        <ConnectButton />
        <Mint />
        <Withdraw />
        {isMinted && <MetaId empty />}
      </div>
    </>
  )
}

export default Profile