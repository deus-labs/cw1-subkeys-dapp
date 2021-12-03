import { useState } from "react"
import {
  useContracts,
  // WithdrawMsg,
} from "src/contracts"
import { errorToast } from "src/utils"
import { coin } from "@cosmjs/proto-signing"
import { useWallet } from "src/services/wallet"
import PrettyPrint from "src/components/PrettyPrint"
import {
  CanExecuteResponse,
  SendMsg,
  DelegateMsg,
  UndelegateMsg,
  RedelegateMsg,
} from "src/contracts/cw1-subkeys"

const AllAllowances = (): JSX.Element => {
  const wallet = useWallet()
  const contract = useContracts().cw1Subkeys?.use()

  const [option, setOption] = useState<string>("send")
  const [data, setData] = useState<CanExecuteResponse>()
  const [addressToSend, setAddressToSend] = useState<string>("")
  const [amountToSend, setAmountToSend] = useState<string>("")
  const [srcValidatorAddress, setSrcValidatorAddress] = useState<string>("")
  const [dstValidatorAddress, setDstValidatorAddress] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const query = () => {
    switch (option) {
      case "send":
        return checkSendMsg()
      case "delegate":
        return checkDelegateMsg()
      case "undelegate":
        return checkUndelegateMsg()
      case "redelegate":
        return checkRedelegateMsg()
    }
  }

  const checkSendMsg = () => {
    if (!contract) return errorToast("Contract is not initialized.")
    if (addressToSend === "") return errorToast("Enter an adress.")
    if (amountToSend === "") return errorToast("Enter an amount.")

    const message: SendMsg = {
      bank: {
        send: {
          from_address: contract.contractAddress,
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

  const checkUndelegateMsg = () => {
    if (srcValidatorAddress === "") return errorToast("Enter an adress.")
    if (amountToSend === "") return errorToast("Enter an amount.")

    const message: UndelegateMsg = {
      staking: {
        undelegate: {
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

  const checkRedelegateMsg = () => {
    if (srcValidatorAddress === "") return errorToast("Enter a source adress.")
    if (dstValidatorAddress === "")
      return errorToast("Enter a destination adress.")
    if (amountToSend === "") return errorToast("Enter an amount.")

    const message: RedelegateMsg = {
      staking: {
        redelegate: {
          src_validator: srcValidatorAddress,
          dst_validator: dstValidatorAddress,
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
      {(option === "delegate" || option === "undelegate") && (
        <input
          type="text"
          placeholder="Source Validator Address"
          className="input input-bordered text-black"
          value={srcValidatorAddress}
          onChange={(e) => setSrcValidatorAddress(e.target.value)}
        />
      )}
      {option === "redelegate" && (
        <input
          type="text"
          placeholder="Destination Validator Address"
          className="input input-bordered text-black"
          value={dstValidatorAddress}
          onChange={(e) => setDstValidatorAddress(e.target.value)}
        />
      )}
      {(option === "send" ||
        option === "delegate" ||
        option === "undelegate" ||
        option === "redelegate") && (
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

      <PrettyPrint data={data} />
    </div>
  )
}

export default AllAllowances
