import React, { useState } from "react"
import { useWallet } from "src/services/wallet"
import { useContracts } from "src/contracts"
import { errorToast } from "src/utils"
import TextInput from "src/components/TextInput"
import Button from "src/components/Button"
import TransactionHash from "src/components/TransactionHash"
import PrettyPrint from "src/components/PrettyPrint"

const UpdateAdmins = (): JSX.Element => {
  const wallet = useWallet()
  const contract = useContracts().cw1Subkeys?.use()

  const [input, setInput] = useState<string>("")
  const [admins, setAdmins] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>("")

  const inputOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (input === "") return
    if (e.key === "Enter") {
      if (!!admins.find((admin) => admin === input)) return
      setAdmins([...admins, input])
      setInput("")
    }
  }

  const execute = () => {
    if (admins.length === 0) {
      errorToast("Fill required fields")
      return
    }
    if (!contract) return

    setLoading(true)

    contract
      .updateAdmins(wallet.address, admins)
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
        placeholder="Admin address"
        onKeyPress={inputOnKeyPress}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        label="Press enter after entering admin address"
        className="mb-3"
      />
      {admins.length !== 0 && (
        <PrettyPrint data={admins} style={{ width: "70%" }} />
      )}
      <br />
      <Button
        className="btn-primary"
        onClick={execute}
        text="Execute"
        loading={loading}
      />
      <br />
      <TransactionHash txHash={txHash} />
    </div>
  )
}

export default UpdateAdmins
