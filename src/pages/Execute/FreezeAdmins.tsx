import { useState } from "react"
import { useContracts } from "src/contracts"
import { errorToast } from "src/utils"
import { useWallet } from "src/services/wallet"
import Button from "src/components/Button"
import TransactionHash from "src/components/TransactionHash"

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
    <div className="form-control items-center">
      <Button
        className="btn-primary mt-3"
        onClick={execute}
        loading={loading}
        text="Execute"
      />
      <br />
      <TransactionHash txHash={txHash} />
    </div>
  )
}

export default FreezeAdmins
