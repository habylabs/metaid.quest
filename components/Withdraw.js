import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { CHARACTER_CONTRACT_ADDRESS, HABY_LABS_ADDRESS } from '../util/constants';
import { Button } from '../components'
import CharacterJson from '../contracts/Character.json'


function Withdraw() {
  const { address } = useAccount()

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    addressOrName: CHARACTER_CONTRACT_ADDRESS,
    contractInterface: CharacterJson.abi,
    functionName: 'withdraw',
  })
  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  if (address === HABY_LABS_ADDRESS) {
    return (
      <div className="column align-center justify-center">
        <Button onClick={() => write()} small outline disabled={(!write || isLoading)}>
          {isLoading ? 'Withdrawing' : 'Withdraw Funds'}
        </Button>
        {isSuccess && (
          <div>
            Withdraw successful!
          </div>
        )}
        {(isPrepareError || isError) && (
          <div>Error: {(prepareError || error)?.message}</div>
        )}
      </div>
    )
  } else {
    return null
  }
};

export default Withdraw
