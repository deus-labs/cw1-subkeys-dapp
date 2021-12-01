import { useEffect, useState } from "react"
import { useCW1Contract, SendMsg } from "src/contracts"
import { useWallet } from "src/services/wallet"
import { Coin, coin } from "@cosmjs/proto-signing"
import { errorToast, promiseToast } from "../utils"
import { config, contract as contractConfig } from "src/config"
import { operationPath } from "src/routes"
import { useHistory } from "react-router"

const Withdraw = (): JSX.Element => {
  const contract = useCW1Contract().use(contractConfig.address)
  const { address, balance, refreshBalance } = useWallet()
  const history = useHistory()

  const [allowance, setAllowance] = useState<Coin>({
    amount: "0",
    denom: config.feeToken,
  })
  const [withdrawAmount, setWithdrawAmount] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getAllowance = async (): Promise<void> => {
      if (!contract) return

      contract
        .allowance(address)
        .then((data) => {
          if (data.balance[0]) setAllowance(data.balance[0])
        })
        .catch((err) => {
          errorToast(err.message)
        })
    }

    getAllowance()
  }, [contract, address])

  const withdrawOnClick = () => {
    if (!contract) return

    setLoading(true)

    promiseToast(
      new Promise((resolve, reject) => {
        const message: SendMsg = {
          bank: {
            send: {
              from_address: contract.contractAddress,
              to_address: address,
              amount: [coin(parseInt(withdrawAmount), balance[0].denom)],
            },
          },
        }

        contract
          .execute(address, [message])
          .then((data) => {
            refreshBalance()
            setLoading(false)
            resolve(data)
          })
          .catch((err) => {
            refreshBalance()
            setLoading(false)
            reject(err)
          })
      }),
      "Transaction pending",
      "Transaction successfull",
      "Transaction failed"
    )
  }

  if (!contract) return <></>

  return (
    <div className="flex flex-col">
      {balance && balance[0] && (
        <div>Your balance: {`${balance[0].amount} ${balance[0].denom}`}</div>
      )}
      <div>Available allowance: {`${allowance.amount} ${allowance.denom}`}</div>
      <input
        className="bg-purple-300"
        type="number"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
      />
      <button
        className="bg-green-500 p-3 rounded-lg text-white font-bold mt-5"
        onClick={withdrawOnClick}
        disabled={loading}
      >
        Withdraw
      </button>
      <button
        className="bg-gray-600 p-3 rounded-lg text-white font-bold mt-5"
        onClick={() => history.push(operationPath)}
        disabled={loading}
      >
        Main Page
      </button>
    </div>
  )
}

export default Withdraw
