import { useState } from "react"
import { useWallet } from "src/services/wallet"
import { useContracts } from "src/contracts"
import { convertToNativeCoin, errorToast } from "src/utils"
import { SendMsg } from "src/contracts/cw1-subkeys"
import TextInput from "src/components/TextInput"
import Button from "src/components/Button"
import TransactionHash from "src/components/TransactionHash"

const SendTokens = (): JSX.Element => {
  const wallet = useWallet()
  const contract = useContracts().cw1Subkeys?.use()

  const [addressToSend, setAddressToSend] = useState<string>("")
  const [amountToSend, setAmountToSend] = useState<string>("")
  const [txHash, setTxHash] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const execute = () => {
    if (!contract) return errorToast("Contract is not initialized.")
    if (addressToSend === "") return errorToast("Enter an address to send.")

    const amount = convertToNativeCoin(amountToSend, wallet.network)
    if (!amount) return errorToast("Enter a valid amount.")

    const message: SendMsg = {
      bank: {
        send: {
          from_address: contract.contractAddress,
          to_address: addressToSend,
          amount: [amount],
        },
      },
    }

    setLoading(true)

    contract
      .execute(wallet.address, [message])
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
      <TextInput
        placeholder="Address"
        value={addressToSend}
        onChange={(e) => setAddressToSend(e.target.value)}
        label="Address to send"
        className="mb-4"
      />
      <TextInput
        type="number"
        placeholder="ujuno amount"
        value={amountToSend}
        onChange={(e) => setAmountToSend(e.target.value)}
        label="Amount to send"
        className="mb-4"
      />
      <br />
      <Button
        onClick={execute}
        loading={loading}
        text="Execute"
        className="btn-primary"
      />
      <br />
      <TransactionHash txHash={txHash} />
    </div>
  )
}

export default SendTokens
