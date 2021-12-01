import { useState } from "react"
import {
  useCW1Contract,
  CanExecuteResponse,
  SendMsg,
  DelegateMsg,
} from "src/contracts"
import { contract as contractConfig } from "src/config"
import { errorToast } from "src/utils"
import { coin } from "@cosmjs/proto-signing"
import { useWallet } from "src/services/wallet"

const AllAllowances = (): JSX.Element => {
  const wallet = useWallet()
  const contract = useCW1Contract().use(contractConfig.address)

  const [option, setOption] = useState<string>("send")
  const [data, setData] = useState<CanExecuteResponse | null>(null)
  const [addressToSend, setAddressToSend] = useState<string>("")
  const [amountToSend, setAmountToSend] = useState<string>("")
  const [srcValidatorAddress, setSrcValidatorAddress] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const query = () => {
    switch (option) {
      case "send":
        return checkSendMsg()
      case "delegate":
        return checkDelegateMsg()
    }
  }

  const checkSendMsg = () => {
    if (addressToSend === "") return errorToast("Enter an adress.")
    if (amountToSend === "") return errorToast("Enter an amount.")

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
      ?.canExecute(wallet.address, message)
      .then((data) => {
        setLoading(false)
        setData(data)
      })
      .catch((err) => {
        setLoading(false)
        errorToast(err.message)
      })
  }

  const checkDelegateMsg = () => {
    if (srcValidatorAddress === "") return errorToast("Enter an adress.")
    if (amountToSend === "") return errorToast("Enter an amount.")

    const message: DelegateMsg = {
      staking: {
        delegate: {
          validator: srcValidatorAddress,
          amount: coin(parseInt(amountToSend), wallet.balance[0].denom),
        },
      },
    }

    setLoading(true)
    contract
      ?.canExecute(wallet.address, message)
      .then((data) => {
        setLoading(false)
        setData(data)
      })
      .catch((err) => {
        setLoading(false)
        errorToast(err.message)
      })
  }

  return (
    <div className="flex flex-col">
      <label className="label">
        <span className="label-text text-deus-text">
          Select message to check
        </span>
      </label>
      <select
        className="select select-bordered w-full max-w-xs text-black"
        onChange={(e) => {
          setData(null)
          setOption(e.target.value)
        }}
        value={option}
      >
        <option value="send">Send</option>
        <option value="delegate">Delegate</option>
        <option value="undelegate">Undelegate</option>
        <option value="redelegate">Redelegate</option>
        <option value="withdraw">Withdraw</option>
      </select>

      {option === "send" && (
        <input
          type="text"
          placeholder="Address"
          className="input input-bordered text-black"
          value={addressToSend}
          onChange={(e) => setAddressToSend(e.target.value)}
        />
      )}
      {option === "delegate" && (
        <input
          type="text"
          placeholder="Validator Address"
          className="input input-bordered text-black"
          value={srcValidatorAddress}
          onChange={(e) => setSrcValidatorAddress(e.target.value)}
        />
      )}
      {(option === "send" || option === "delegate") && (
        <input
          type="number"
          placeholder="Amount"
          className="input input-bordered text-black"
          value={amountToSend}
          onChange={(e) => setAmountToSend(e.target.value)}
        />
      )}
      <button
        onClick={query}
        className={`btn btn-primary ${loading ? "loading" : ""}`}
      >
        {!loading && "Query"}
      </button>

      <div>Can execute: {data !== null ? (data ? "Yes" : "No") : ""}</div>
    </div>
  )
}

export default AllAllowances
