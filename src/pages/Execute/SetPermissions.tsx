import { useState } from "react"
import { useWallet } from "src/services/wallet"
import { Permissions, useCW1Contract } from "src/contracts"
import { contract as contractConfig } from "src/config"
import { errorToast } from "src/utils"

const SetPermissions = (): JSX.Element => {
  const wallet = useWallet()
  const contract = useCW1Contract().use(contractConfig.address)

  const [address, setAddress] = useState<string>("")
  const [txHash, setTxHash] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [permissions, setPermissions] = useState<Permissions>({
    delegate: false,
    undelegate: false,
    redelegate: false,
    withdraw: false,
  })

  const execute = () => {
    if (!contract) return errorToast("Contract is not initialized.")
    if (address === "") return errorToast("Enter an address to send.")

    setLoading(true)

    contract
      .setPermissions(wallet.address, address, permissions)
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
          Address to set permissions
        </span>
      </label>
      <input
        type="text"
        placeholder="Address"
        className="input input-bordered text-black"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <br />
      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text text-deus-text">Delegate</span>
          <input
            type="checkbox"
            checked={permissions.delegate}
            className="checkbox border-deus-text"
            onChange={() =>
              setPermissions({
                ...permissions,
                delegate: !permissions.delegate,
              })
            }
          />
        </label>
        <label className="cursor-pointer label">
          <span className="label-text text-deus-text">Undelegate</span>
          <input
            type="checkbox"
            checked={permissions.undelegate}
            className="checkbox border-deus-text"
            onChange={() =>
              setPermissions({
                ...permissions,
                undelegate: !permissions.undelegate,
              })
            }
          />
        </label>
        <label className="cursor-pointer label">
          <span className="label-text text-deus-text">Redelegate</span>
          <input
            type="checkbox"
            checked={permissions.redelegate}
            className="checkbox border-deus-text"
            onChange={() =>
              setPermissions({
                ...permissions,
                redelegate: !permissions.redelegate,
              })
            }
          />
        </label>
        <label className="cursor-pointer label">
          <span className="label-text text-deus-text">Withdraw</span>
          <input
            type="checkbox"
            checked={permissions.withdraw}
            className="checkbox border-deus-text"
            onChange={() =>
              setPermissions({
                ...permissions,
                withdraw: !permissions.withdraw,
              })
            }
          />
        </label>
      </div>
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

export default SetPermissions
