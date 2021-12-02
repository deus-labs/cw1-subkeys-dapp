import { useState } from "react"
import { useWallet } from "src/services/wallet"
import { useCW1Contract } from "src/contracts"
import { contract as contractConfig, config } from "src/config"
import { errorToast } from "src/utils"
import { coin } from "@cosmjs/proto-signing"

const IncreaseAllowance = (): JSX.Element => {
  const wallet = useWallet()
  const contract = useCW1Contract().use(contractConfig.address)

  const [allowanceAddress, setAllowanceAddress] = useState<string>("")
  const [allowanceAmount, setAllowanceAmount] = useState<string>("")
  const [expiration, setExpiration] = useState<string>("never")
  const [expirationValue, setExpirationValue] = useState<string>("")
  const [txHash, setTxHash] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const execute = () => {
    if (!contract) return errorToast("Contract is not initialized.")
    if (allowanceAddress === "") return errorToast("Enter an address to send.")
    if (allowanceAmount === "") return errorToast("Enter an amount to send.")
    if (expiration !== "never" && expirationValue === "")
      return errorToast("Enter an expiration time.")

    let expirationTime: any = {
      never: {},
    }
    if (expiration === "at-height") {
      expirationTime = { at_height: { height: expirationValue } }
    }
    if (expiration === "at-time") {
      expirationTime = { at_time: { time: expirationValue } }
    }

    setLoading(true)

    contract
      .increaseAllowance(
        wallet.address,
        allowanceAddress,
        coin(parseInt(allowanceAmount), config.feeToken),
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
    <div className="form-control">
      <label className="label">
        <span className="label-text text-deus-text">
          Address to increase allowance
        </span>
      </label>
      <input
        type="text"
        placeholder="Address"
        className="input input-bordered text-black"
        value={allowanceAddress}
        onChange={(e) => setAllowanceAddress(e.target.value)}
      />
      <label className="label">
        <span className="label-text text-deus-text">Amount to increase</span>
      </label>
      <input
        type="number"
        placeholder="Amount"
        className="input input-bordered text-black"
        value={allowanceAmount}
        onChange={(e) => setAllowanceAmount(e.target.value)}
      />
      <br />
      <label className="label">
        <span className="label-text text-deus-text">Expiration</span>
      </label>
      <select
        className="select select-bordered w-full max-w-xs text-black"
        onChange={(e) => setExpiration(e.target.value)}
        value={expiration}
      >
        <option value="never">Never</option>
        <option value="at-height">At Height</option>
        <option value="at-time">At Time</option>
      </select>
      <br />
      {(expiration === "at-height" || expiration === "at-time") && (
        <input
          type="number"
          placeholder={expiration === "at-height" ? "Block height" : "Time"}
          className="input input-bordered text-black"
          value={expirationValue}
          onChange={(e) => setExpirationValue(e.target.value)}
        />
      )}
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

export default IncreaseAllowance
