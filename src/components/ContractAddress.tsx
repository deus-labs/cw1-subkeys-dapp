import { useEffect, useState } from "react"
import { useContracts } from "src/contracts"

const ContractAddress = (): JSX.Element => {
  const contract = useContracts().cw1Subkeys
  const [contractAddress, setContractAddress] = useState<string>("")

  useEffect(() => {
    if (localStorage.getItem("contract_address"))
      setContractAddress(localStorage.getItem("contract_address") || "")
  }, [])

  useEffect(() => {
    localStorage.setItem("contract_address", contractAddress)
    contract?.updateContractAddress(contractAddress)
  }, [contractAddress, contract])

  return (
    <div className="flex justify-center">
      <div className="flex justify-center text-lg font-bold items-center">
        <span className="text-deus-text">Your contract address:</span>
      </div>
      <input
        type="text"
        placeholder="Enter Contract Address"
        className="input input-bordered text-deus-dark ml-2 w-96 font-bold"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
    </div>
  )
}

export default ContractAddress
