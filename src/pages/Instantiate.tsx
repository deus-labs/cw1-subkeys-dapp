import React, { useState } from "react"
import SectionLayout from "src/layout/Section"
import { useContracts } from "src/contracts"
import { errorToast } from "src/utils"
import WalletAddress from "src/components/WalletAddress"

const Instantiate = (): JSX.Element => {
  const contract = useContracts().cw1Subkeys

  const [input, setInput] = useState<string>("")
  const [codeId, setCodeId] = useState<string>("")
  const [mutable, setMutable] = useState<boolean>(false)
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

  const checkboxOnChange = () => {
    setMutable(!mutable)
  }

  const codeIdOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeId(e.target.value)
  }

  const instantiateOnClick = () => {
    if (codeId === "" || admins.length === 0) {
      errorToast("Fill required fields")
      return
    }
    if (!contract) return

    setLoading(true)

    contract
      .instantiate({
        codeId: parseInt(codeId),
        initMsg: { admins, mutable },
        label: "cw1-subkeys-contract",
      })
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
    <SectionLayout>
      <WalletAddress />
      <br />
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
        <br />
        <label className="cursor-pointer label">
          <span className="label-text text-deus-text">Are admins mutable?</span>
          <input
            type="checkbox"
            checked={mutable}
            className="checkbox border-deus-text"
            onChange={checkboxOnChange}
          />
        </label>
        <br />
        <label className="label">
          <span className="label-text text-deus-text">
            Enter Code ID for the contract
          </span>
        </label>
        <input
          type="number"
          placeholder="Code ID"
          className="input input-bordered text-black"
          value={codeId}
          onChange={codeIdOnChange}
        />
        <br />
      </div>
      <br />
      <button
        onClick={instantiateOnClick}
        className={`btn btn-primary ${loading ? "loading" : ""}`}
      >
        {!loading && "Instantiate"}
      </button>
      <br />
      {txHash !== "" && (
        <span className="text-deus-text">Transaction Hash: {txHash}</span>
      )}
    </SectionLayout>
  )
}

export default Instantiate
