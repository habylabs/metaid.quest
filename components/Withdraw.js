import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { CHARACTER_CONTRACT_ADDRESS } from '../util/constants';
import { Button } from '../components'
import CharacterJson from '../contracts/Character.json'


function Withdraw() {
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
};

export default Withdraw
