import { useAccount } from 'wagmi'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import {
  Loading,
  ProfileState,
} from '../../components'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function ProfilePage() {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  if (!isConnected || address != router.query.address) {
    router.push('/')
  }

  const dbRes = useSWR(`/api/v1/metaid/address/${address}`, fetcher)
  console.log(dbRes.data)

  if (dbRes.error) return <div>Failed to load</div>
  if (!dbRes.data) return <Loading />

  return (
    <>
      <Head>
        <title>
          Meta ID | Your NFT profile for the metaverse!
        </title>
      </Head>
      <ProfileState
        dbData={dbRes.data.dbData}
        allNfts={dbRes.data.allNfts}
        identityNftOptions={dbRes.data.identityNftOptions}
        characterNftOptions={dbRes.data.characterNftOptions}
        equipmentNftOptions={dbRes.data.equipmentNftOptions}
      />
    </>
  )
}

export default ProfilePage