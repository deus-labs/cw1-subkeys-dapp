import { useState } from "react"
import {
  useContracts,
  // WithdrawMsg,
} from "src/contracts"
import { convertToNativeCoin, errorToast } from "src/utils"
import { useWallet } from "src/services/wallet"
import PrettyPrint from "src/components/PrettyPrint"
import {
  CanExecuteResponse,
  SendMsg,
  DelegateMsg,
  UndelegateMsg,
  RedelegateMsg,
} from "src/contracts/cw1-subkeys"
import TextInput from "src/components/TextInput"
import Button from "src/components/Button"
import Dropdown from "src/components/Dropdown"

const DROPDOWN_OPTIONS = [
  "Send",
  "Delegate",
  "Undelegate",
  "Redelegate",
  // 'Withdraw'
]

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

    const amount = convertToNativeCoin(amountToSend)
    if (!amount) return errorToast("Enter a valid amount.")

    const message: SendMsg = {
      bank: {
        send: {
          from_address: contract.contractAddress,
          to_address: addressToSend,
          amount: [amount],
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

    const amount = convertToNativeCoin(amountToSend)
    if (!amount) return errorToast("Enter a valid amount.")

    const message: DelegateMsg = {
      staking: {
        delegate: {
          validator: srcValidatorAddress,
          amount: amount,
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

    const amount = convertToNativeCoin(amountToSend)
    if (!amount) return errorToast("Enter a valid amount.")

    const message: UndelegateMsg = {
      staking: {
        undelegate: {
          validator: srcValidatorAddress,
          amount: amount,
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

    const amount = convertToNativeCoin(amountToSend)
    if (!amount) return errorToast("Enter a valid amount.")

    const message: RedelegateMsg = {
      staking: {
        redelegate: {
          src_validator: srcValidatorAddress,
          dst_validator: dstValidatorAddress,
          amount: amount,
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
    <div className="form-control items-center">
      <Dropdown
        onChange={(e) => {
          setAmountToSend("")
          setOption(e.target.value)
        }}
        value={option}
        options={DROPDOWN_OPTIONS}
        label="Select execute message to check"
        className="mb-3"
      />
      {option === "send" && (
        <TextInput
          value={addressToSend}
          onChange={(e) => setAddressToSend(e.target.value)}
          placeholder="Address"
          label="Address to send"
        />
      )}
      {(option === "delegate" || option === "undelegate") && (
        <TextInput
          value={srcValidatorAddress}
          onChange={(e) => setSrcValidatorAddress(e.target.value)}
          placeholder={`${
            option === "delegate" ? "Validator" : "Source validator"
          } address`}
          label={`Validator address to ${option}`}
        />
      )}
      {option === "redelegate" && (
        <TextInput
          value={dstValidatorAddress}
          onChange={(e) => setDstValidatorAddress(e.target.value)}
          placeholder="Destination validator address"
          label="Validator address to redelegate"
        />
      )}
      <TextInput
        type="number"
        value={amountToSend}
        onChange={(e) => setAmountToSend(e.target.value)}
        placeholder="Juno amount"
        label={`Amount to ${option}`}
      />
      <br />
      <Button
        className="btn-primary"
        onClick={query}
        loading={loading}
        text="Query"
      />
      <br />
      <PrettyPrint data={data} style={{ width: "95%" }} />
    </div>
  )
}

export default AllAllowances
