import { useContext } from "react"
import { useHistory } from "react-router"
import { allowancesPath } from "src/routes"
import { CosmWasmContext } from "../services/wallet"

const Operations = (): JSX.Element => {
  const sdk = useContext(CosmWasmContext)
  const history = useHistory()

  const disconnectWallet = () => {
    localStorage.clear()
    sdk.clear()
  }

  const allowancesOnClick = () => {
    history.push(allowancesPath)
  }

  return (
    <div className="flex flex-col">
      <div>
        Your balance: {`${sdk.balance[0].amount} ${sdk.balance[0].denom}`}
      </div>
      <button>Withdraw</button>
      <button
        className="bg-blue-500 p-3 rounded-lg text-white font-bold mt-10"
        onClick={allowancesOnClick}
      >
        View Allowances
      </button>
      <button
        className="bg-red-600	p-3 rounded-lg text-white font-bold mt-5"
        onClick={disconnectWallet}
      >
        Disconnect wallet
      </button>
    </div>
  )
}

export default Operations
