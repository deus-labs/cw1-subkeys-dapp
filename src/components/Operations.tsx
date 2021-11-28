import { useContext } from "react"
import { useHistory } from "react-router"
import { allowancesPath, withdrawPath } from "src/routes"
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

  const withdrawOnClick = () => {
    history.push(withdrawPath)
  }

  return (
    <div className="flex flex-col items-center">
      <div>Your address: {`${sdk.address}`}</div>
      <div>
        Your balance: {`${sdk.balance[0].amount} ${sdk.balance[0].denom}`}
      </div>
      <button className="btn btn-wide bg-blue-500" onClick={allowancesOnClick}>
        View Allowances
      </button>
      <button className="btn btn-wide bg-green-500" onClick={withdrawOnClick}>
        Withdraw
      </button>
      <button className="btn btn-wide bg-red-600" onClick={disconnectWallet}>
        Disconnect Wallet
      </button>
    </div>
  )
}

export default Operations
