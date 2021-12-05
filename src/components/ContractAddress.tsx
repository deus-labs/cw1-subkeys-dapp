import { useEffect, useState } from "react"
import { useContracts } from "src/contracts"
import TextInput from "./TextInput"

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
    <div className="flex justify-center mt-2">
      <div className="flex justify-center text-lg font-bold items-center">
        <span className="text-deus-text">Contract address:</span>
      </div>
      <TextInput
        placeholder="Enter contract address"
        className="ml-2 w-4/6 text-center px-3"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
    </div>
  )
}

export default ContractAddress
