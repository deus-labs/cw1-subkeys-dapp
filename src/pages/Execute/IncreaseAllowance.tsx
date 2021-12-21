import { useState } from "react"
import { useWallet } from "src/services/wallet"
import { useContracts } from "src/contracts"
import { convertToNativeCoin, errorToast } from "src/utils"
import Button from "src/components/Button"
import TransactionHash from "src/components/TransactionHash"
import TextInput from "src/components/TextInput"
import Dropdown from "src/components/Dropdown"
import { Expiration } from "src/contracts/cw1-subkeys"

const DROPDOWN_OPTIONS = ["Never", "At height", "At time"]

const IncreaseAllowance = (): JSX.Element => {
  const wallet = useWallet()
  const contract = useContracts().cw1Subkeys?.use()

  const [allowanceAddress, setAllowanceAddress] = useState<string>("")
  const [allowanceAmount, setAllowanceAmount] = useState<string>("")
  const [expiration, setExpiration] = useState<string>("never")
  const [expirationValue, setExpirationValue] = useState<string>("")
  const [txHash, setTxHash] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const execute = () => {
    if (!contract) return errorToast("Contract is not initialized.")
    if (allowanceAddress === "") return errorToast("Enter an address to send.")
    if (expiration !== "never" && expirationValue === "")
      return errorToast("Enter an expiration time.")

    let expirationTime: Expiration = {
      never: {},
    }
    if (expiration === "at-height" && !isNaN(Number(expirationValue))) {
      expirationTime = { at_height: Number(expirationValue) }
    }
    if (expiration === "at-time" && !isNaN(Number(expirationValue))) {
      expirationTime = { at_time: expirationValue }
    }

    const amount = convertToNativeCoin(allowanceAmount, wallet.network)
    if (!amount) return errorToast("Enter a valid amount.")

    setLoading(true)

    contract
      .increaseAllowance(
        wallet.address,
        allowanceAddress,
        amount,
        expirationTime
      )
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
        label="Address to increase allowance"
        value={allowanceAddress}
        onChange={(e) => setAllowanceAddress(e.target.value)}
        placeholder="Address"
      />
      <TextInput
        type="number"
        label="Amount to increase"
        value={allowanceAmount}
        onChange={(e) => setAllowanceAmount(e.target.value)}
        placeholder="ujuno amount"
      />
      <br />
      <div className="flex items-center w-5/6 my-3">
        <Dropdown
          label="Select expiration time"
          onChange={(e) => {
            setExpirationValue("")
            setExpiration(e.target.value)
          }}
          value={expiration}
          options={DROPDOWN_OPTIONS}
        />
        {(expiration === "at-height" || expiration === "at-time") && (
          <TextInput
            type="number"
            placeholder={expiration === "at-height" ? "Block height" : "Time"}
            value={expirationValue}
            onChange={(e) => setExpirationValue(e.target.value)}
            width="w-44"
          />
        )}
      </div>
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

export default IncreaseAllowance
