import React, { useState } from "react"
import SectionLayout from "src/layout/Section"
import { useContracts } from "src/contracts"
import { errorToast } from "src/utils"
import TextInput from "src/components/TextInput"
import PrettyPrint from "src/components/PrettyPrint"
import Checkbox from "src/components/Checkbox"
import Button from "src/components/Button"
import TransactionHash from "src/components/TransactionHash"

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
      <div className="form-control items-center">
        <TextInput
          placeholder="Admin address"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={inputOnKeyPress}
          label="Press enter after entering admin address"
          className="mb-3"
        />
        {admins.length !== 0 && (
          <PrettyPrint data={admins} style={{ width: "70%" }} />
        )}
        <div className="my-3">
          <Checkbox
            checked={mutable}
            onChange={() => setMutable(!mutable)}
            label="Are admins mutable?"
          />
        </div>
        <TextInput
          type="number"
          placeholder="Code ID"
          value={codeId}
          onChange={codeIdOnChange}
          label="Enter Code ID for the contract"
        />
        <br />
        <Button
          onClick={instantiateOnClick}
          className="btn-primary"
          text="Instantiate"
          loading={loading}
        />
        <br />
        <TransactionHash txHash={txHash} />
      </div>
    </SectionLayout>
  )
}

export default Instantiate
