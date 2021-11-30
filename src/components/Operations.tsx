import { useHistory } from "react-router"
import { allowancesPath, withdrawPath } from "src/routes"
import { useWallet } from "../services/wallet"

const Operations = (): JSX.Element => {
  const { clear, address, balance } = useWallet()
  const history = useHistory()

  const disconnectWallet = () => {
    localStorage.clear()
    clear()
  }

  const allowancesOnClick = () => {
    history.push(allowancesPath)
  }

  const withdrawOnClick = () => {
    history.push(withdrawPath)
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <div>Your address: {`${address}`}</div>
      <div>Your balance: {`${balance[0].amount} ${balance[0].denom}`}</div>
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
