import { useState } from "react"
import { useContracts } from "src/contracts"
import { errorToast } from "src/utils"
import PrettyPrint from "src/components/PrettyPrint"
import { AllowanceInfo } from "src/contracts/cw1-subkeys"
import Button from "src/components/Button"
import TextInput from "src/components/TextInput"

const AllAllowances = (): JSX.Element => {
  const contract = useContracts().cw1Subkeys?.use()

  const [data, setData] = useState<AllowanceInfo>()
  const [address, setAddress] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const query = () => {
    if (!contract) return errorToast("Contract is not initialized.")
    if (address === "") return errorToast("Enter an adress.")

    setLoading(true)
    contract
      ?.allowance(address)
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
      <TextInput
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        label="Address to check allowance"
        className="text-center"
      />
      <br />
      <Button
        onClick={query}
        loading={loading}
        text="Query"
        className="btn-primary"
      />
      <br />
      <PrettyPrint data={data} style={{ width: "95%" }} />
    </div>
  )
}

export default AllAllowances
