import React, { useState } from "react"
import { useWallet } from "src/services/wallet"
import { useContracts } from "src/contracts"
import { errorToast } from "src/utils"

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

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
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
    <>
      {admins.map((addr) => {
        return <div>Admin: {addr}</div>
      })}
      <br />
      <div className="form-control">
        <label className="label">
          <span className="label-text text-deus-text">
            Press enter after entering admin address
          </span>
        </label>
        <input
          type="text"
          placeholder="Admin address"
          className="input input-bordered text-black"
          onKeyPress={inputOnKeyPress}
          value={input}
          onChange={inputOnChange}
        />
      </div>
      <br />
      <button
        onClick={execute}
        className={`btn btn-primary ${loading ? "loading" : ""}`}
      >
        {!loading && "Execute"}
      </button>
      <br />
      {txHash !== "" && (
        <span className="text-deus-text">Transaction Hash: {txHash}</span>
      )}
    </>
  )
}

export default UpdateAdmins
