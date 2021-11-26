import { useEffect, useState } from "react"
import { useCW1Contract, AllowanceInfo } from "src/services/contracts"

const Allowances = (): JSX.Element => {
  const contract = useCW1Contract()

  const [allowances, setAllowances] = useState<AllowanceInfo[]>([])

  useEffect(() => {
    const getAllowances = async (): Promise<void> => {
      if (!contract) return

      const response = await contract.allAllowances()
      setAllowances(response.allowances)
    }

    getAllowances()
  }, [contract])

  const renderAllowance = ({
    spender,
    balance,
  }: AllowanceInfo): JSX.Element => {
    return (
      <div className="flex" key={spender}>
        <div className="flex font-bold mr-5">
          Address: <div className="font-normal">{spender}</div>
        </div>
        <div className="flex font-bold mr-5">
          Amount:{" "}
          <div className="font-normal">{`${balance[0].amount} ${balance[0].denom}`}</div>
        </div>
      </div>
    )
  }

  if (!contract) return <></>

  return (
    <div>
      <div className="flex font-bold mr-5 mb-5">
        Contract address:{" "}
        <div className="font-normal">{contract.contractAddress}</div>
      </div>
      {allowances.map((allowance) => renderAllowance(allowance))}
    </div>
  )
}

export default Allowances
