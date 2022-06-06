import { useWeb3React } from "@web3-react/core";
import { Button } from '../components';

function Disconnect() {
  const { active, account, deactivate } = useWeb3React();

  async function disconnect() {
    try {
      deactivate();
    } catch (error) {
      console.error(error);
    }
  }

  function formatAccount() {
    return `${account.slice(0,3)}...${account.slice(account.length - 3)}`
  }

  function getButton() {
    return (
      <Button onClick={disconnect} small outline>
        {formatAccount()} [ disconnect ]
      </Button>
    )
  }

  return (active ? getButton() : null)
}

export default Disconnect;