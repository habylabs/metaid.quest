import Head from 'next/head'
import { getFullLeaderboard } from '../util/db'

export async function getServerSideProps(context) {
  const leaderboard = await getFullLeaderboard()

  return {
    props: {
      leaderboard
    },
  }
}

function Leaderboard({ leaderboard }) {
  console.log(leaderboard)
  return (
    <>
      <Head>
        <title>
          Meta ID | Your NFT profile for the metaverse!
        </title>
      </Head>
      <div>
        Leaderboard
      </div>
    </>
  )
}

export default Leaderboard