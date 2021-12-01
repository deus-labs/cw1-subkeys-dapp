import { useState } from "react"
import SectionLayout from "src/layout/Section"
import { useWallet } from "src/services/wallet"
import { useCW1Contract, SendMsg } from "src/contracts"
import { contract as contractConfig } from "src/config"
import { errorToast } from "src/utils"
import { coin } from "@cosmjs/proto-signing"

const Execute = (): JSX.Element => {
  const wallet = useWallet()
  const contract = useCW1Contract().use(contractConfig.address)

  const [option, setOption] = useState<string>("send-tokens")
  const [addressToSend, setAddressToSend] = useState<string>("")
  const [amountToSend, setAmountToSend] = useState<string>("")
  const [txHash, setTxHash] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const optionOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value)
  }

  //   const increaseAllowance = () => {}

  //   const decreaseAllowance = () => {}

  const send = () => {
    if (!contract) return errorToast("Contract is not initialized.")
    if (addressToSend === "") return errorToast("Enter an address to send.")
    if (amountToSend === "") return errorToast("Enter an amount to send.")

    const message: SendMsg = {
      bank: {
        send: {
          from_address: contractConfig.address,
          to_address: addressToSend,
          amount: [coin(parseInt(amountToSend), wallet.balance[0].denom)],
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

  //   const updateAdmins = () => {}

  //   const freeze = () => {}

  const renderSendTokens = (): JSX.Element => {
    return (
      <div className="form-control">
        <label className="label">
          <span className="label-text text-deus-text">Address to send</span>
        </label>
        <input
          type="text"
          placeholder="Address"
          className="input input-bordered text-black"
          value={addressToSend}
          onChange={(e) => setAddressToSend(e.target.value)}
        />
        <label className="label">
          <span className="label-text text-deus-text">Amount to send</span>
        </label>
        <input
          type="number"
          placeholder="Amount"
          className="input input-bordered text-black"
          value={amountToSend}
          onChange={(e) => setAmountToSend(e.target.value)}
        />
        <br />
        <button
          onClick={send}
          className={`btn btn-primary ${loading ? "loading" : ""}`}
        >
          {!loading && "Execute"}
        </button>
      </div>
    )
  }

  return (
    <SectionLayout>
      <div>Address: {wallet.address}</div>
      <br />

      <select
        className="select select-bordered w-full max-w-xs text-black"
        onChange={optionOnChange}
        value={option}
      >
        {/* <option disabled= selected="selected">Choose your superpower</option>  */}
        <option value="send-tokens">Send tokens</option>
        <option value="increase-allowance">Increase Allowance</option>
        <option value="decrease-allowance">Decrease Allowance</option>
        <option value="update-admins">Update Admins</option>
        <option value="freeze-admins">Freeze Admins</option>
        <option value="set-permissions">Set Permissions</option>
      </select>
      <br />
      <br />
      {option === "send-tokens" && renderSendTokens()}

      {txHash !== "" && (
        <span className="text-deus-text">Transaction Hash: {txHash}</span>
      )}
    </SectionLayout>
  )
}

export default Execute
