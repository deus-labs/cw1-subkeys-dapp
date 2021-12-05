import { useState } from "react"
import { useWallet } from "src/services/wallet"
import { useContracts } from "src/contracts"
import { errorToast } from "src/utils"
import { Permissions } from "src/contracts/cw1-subkeys"
import TextInput from "src/components/TextInput"
import Checkbox from "src/components/Checkbox"
import Button from "src/components/Button"
import TransactionHash from "src/components/TransactionHash"

const SetPermissions = (): JSX.Element => {
  const wallet = useWallet()
  const contract = useContracts().cw1Subkeys?.use()

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
    <div className="form-control items-center">
      <TextInput
        label="Address to set permissions"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="text-center"
      />
      <br />
      <div className="flex items-center w-4/6 justify-between">
        <Checkbox
          checked={permissions.delegate}
          onChange={() =>
            setPermissions({
              ...permissions,
              delegate: !permissions.delegate,
            })
          }
          label="Delegate"
        />
        <Checkbox
          checked={permissions.undelegate}
          onChange={() =>
            setPermissions({
              ...permissions,
              undelegate: !permissions.undelegate,
            })
          }
          label="Undelegate"
        />
        <Checkbox
          checked={permissions.redelegate}
          onChange={() =>
            setPermissions({
              ...permissions,
              redelegate: !permissions.redelegate,
            })
          }
          label="Redelegate"
        />
        <Checkbox
          checked={permissions.withdraw}
          onChange={() =>
            setPermissions({
              ...permissions,
              withdraw: !permissions.withdraw,
            })
          }
          label="Withdraw"
        />
      </div>
      <br />
      <Button
        onClick={execute}
        loading={loading}
        className="btn-primary"
        text="Execute"
      />
      <br />
      <TransactionHash txHash={txHash} />
    </div>
  )
}

export default SetPermissions
