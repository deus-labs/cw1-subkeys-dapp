import { useEffect, useState } from "react"
import { useWallet } from "src/services/wallet"
import { useContracts } from "src/contracts"
import { convertToNativeCoin, errorToast } from "src/utils"
import { AllowanceInfo, SendMsg } from "src/contracts/cw1-subkeys"
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
  const [allowance, setAllowance] = useState<AllowanceInfo>()

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

  useEffect(() => {
    if (!wallet.initialized || !contract || addressToSend.length != 43)
      setAllowance(undefined)
    else
      contract
        .allowance(addressToSend)
        .then((data) => setAllowance(data))
        .catch(() => setAllowance(undefined))
  }, [wallet.initialized, contract])

  return (
    <div className="form-control items-center">
      <div className="h-14">
        {wallet.initialized && (
          <div>
            <div className="text-lg">
              Wallet balance:{" "}
              {wallet.balance[0].amount + wallet.balance[0].denom}
            </div>
            {allowance && (
              <div className="text-lg">
                Allowance:{" "}
                {allowance && allowance.balance.length
                  ? allowance.balance[0].amount + allowance.balance[0].denom
                  : "0"}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-row mt-4 mx-auto w-3/5 justify-start">
        <TextInput
          placeholder="Address"
          value={addressToSend}
          onChange={(e) => setAddressToSend(e.target.value)}
          label="Address to send"
          className="mb-4 ml-1"
          width="w-7/12"
        />
        {wallet.initialized && (
          <Button
            onClick={() => setAddressToSend(wallet.address)}
            text="my wallet"
            className="btn-primary ml-4"
            width="w-1/6"
            textSize="text-xs"
          />
        )}
      </div>
      <TextInput
        type="number"
        placeholder="ujuno amount"
        value={amountToSend}
        onChange={(e) => setAmountToSend(e.target.value)}
        label="Amount to send"
        className="mb-4 ml-1"
        width="w-7/12"
      />
      {wallet.initialized && allowance && allowance.balance.length > 0 && (
        <Button
          onClick={() => setAmountToSend(allowance.balance[0].amount)}
          text="max"
          className="btn-primary ml-4"
          width="w-1/6"
          textSize="text-xs"
        />
      )}
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
