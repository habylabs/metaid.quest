import { useAccount } from 'wagmi'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import {
  Loading,
  ProfileState,
} from '../../components'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const DataError = () => (
  <div className='top-padding'>
    <p className='monospace-font text-center'>
      The page failed to load. Please refresh and try again.
    </p>
  </div>
)

const ProfilePage = () => {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  if (!isConnected || address != router.query.address) {
    router.push('/')
  }

  const dbRes = useSWR(`/api/v1/metaid/address/${address}`, fetcher)

  return (
    <>
      <Head>
        <title>
          Meta ID | Your NFT profile for the metaverse!
        </title>
      </Head>
      {
        dbRes.error ?
        <DataError /> :
        dbRes.data ?
        <ProfileState
          dbData={dbRes.data.dbData}
          hasFreeMint={dbRes.data.hasFreeMint}
          identityNftOptions={dbRes.data.identityNftOptions}
          characterNftOptions={dbRes.data.characterNftOptions}
          equipmentNftOptions={dbRes.data.equipmentNftOptions}
        /> :
        <div className='row top-padding align-center justify-center'>
          <Loading />
        </div>
      }
      
    </>
  )
}

export default ProfilePage