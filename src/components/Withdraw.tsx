import { useEffect, useState } from "react"
import { useCW1Contract, SendMsg } from "src/services/contracts"
import { useSdk } from "src/services/wallet"
import { Coin, coin } from "@cosmjs/amino"

const Withdraw = (): JSX.Element => {
  const contract = useCW1Contract()
  const sdk = useSdk()

  const [allowance, setAllowance] = useState<Coin>({ amount: "0", denom: "" })
  const [withdrawAmount, setWithdrawAmount] = useState<string>("")

  useEffect(() => {
    const getAllowance = async (): Promise<void> => {
      if (!contract) return

      const response = await contract.allowance(sdk.address)

      if (response.balance[0]) setAllowance(response.balance[0])
    }

    getAllowance()
  }, [contract, sdk.address])

  const withdrawOnClick = () => {
    if (!contract) return
    const message: SendMsg = {
      bank: {
        send: {
          from_address: contract.contractAddress,
          to_address: sdk.address,
          amount: [coin(parseInt(withdrawAmount), sdk.balance[0].denom)],
        },
      },
    }

    contract
      .execute(sdk.address, [message])
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  if (!contract) return <></>

  return (
    <div className="flex flex-col">
      <div>
        Your balance: {`${sdk.balance[0].amount} ${sdk.balance[0].denom}`}
      </div>
      <div>Withdraw amount: {`${allowance.amount} ${allowance.denom}`}</div>
      <input
        className="bg-purple-300"
        type="number"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
      />
      <button
        className="bg-green-500 p-3 rounded-lg text-white font-bold mt-5"
        onClick={withdrawOnClick}
      >
        Withdraw
      </button>
    </div>
  )
}

export default Withdraw
