import { useAccount, useEnsName } from 'wagmi'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import {
  Loading,
  ProfileState,
} from '../../components'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const putRequest = async (url, data) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return await response.json()
}

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

  const { data: ensName } = useEnsName({ address })

  const dbRes = useSWR(`/api/v1/metaid/address/${address}`, fetcher)

  const saveData = async (data) => {
    const { tokenId, pfp, bonusChar, equipment, equipmentItems, stats } = data

    const noPfp = {
      contract: null,
      guild: null,
      id: null,
      image: null,
      race: null,
      role: null,
      element: null,
    }

    const finalData = {
      tokenId: tokenId.toString(),
      identity: {
        name: ensName,
        pfp: (pfp.contract ? pfp : noPfp),
        character: bonusChar,
      },
      equipment: {
        contract: equipment,
        items: equipmentItems
      },
      stats
    }

    const json = await putRequest(
      `/api/v1/metaid/address/${address}`,
      finalData
    );
    console.log(json)
  }

  console.log(dbRes.data)

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
          saveData={saveData}
        /> :
        <div className='row top-padding align-center justify-center'>
          <Loading />
        </div>
      }
      
    </>
  )
}

export default ProfilePage