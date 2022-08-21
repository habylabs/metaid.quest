import { useAccount } from 'wagmi'
import Router from 'next/router'

import {
  Withdraw
} from '../components'

import { HABY_LABS_ADDRESS } from '../util/constants'

const Admin = () => {
  const { address, isConnected } = useAccount()

  if (!isConnected) {
    Router.push('/')
  }

  if (isConnected && address.toLowerCase() != HABY_LABS_ADDRESS) {
    Router.push(`/profile/${address}`)
  }

  return (
    <div>
      This is the admin page

      <Withdraw />
    </div>
  )
}

export default Admin