import { useState } from "react"
import { useContracts } from "src/contracts"
import { errorToast } from "src/utils"
import { useWallet } from "src/services/wallet"

const FreezeAdmins = (): JSX.Element => {
  const wallet = useWallet()
  const contract = useContracts().cw1Subkeys?.use()

  const [txHash, setTxHash] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const execute = () => {
    if (!contract) return errorToast("Contract is not initialized.")

    setLoading(true)

    contract
      .freeze(wallet.address)
      .then((hash) => {
        setLoading(false)
        setTxHash(hash)
      })
      .catch((err) => {
        setLoading(false)
        errorToast(err.message)
      })
  }

  return (
    <div className="form-control">
      <button
        onClick={execute}
        className={`btn btn-primary ${loading ? "loading" : ""}`}
      >
        {!loading && "Execute"}
      </button>

      {txHash !== "" && (
        <span className="text-deus-text">Transaction Hash: {txHash}</span>
      )}
    </div>
  )
}

export default FreezeAdmins
