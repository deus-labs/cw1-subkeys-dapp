import { useState } from "react"
import { useContracts } from "src/contracts"
import { errorToast } from "src/utils"
import PrettyPrint from "src/components/PrettyPrint"
import { AllowanceInfo } from "src/contracts/cw1-subkeys"
import Button from "src/components/Button"

const AllAllowances = (): JSX.Element => {
  const contract = useContracts().cw1Subkeys?.use()

  const [data, setData] = useState<readonly AllowanceInfo[]>()
  const [loading, setLoading] = useState<boolean>(false)

  const query = () => {
    if (!contract) return errorToast("Contract is not initialized.")

    setLoading(true)
    contract
      .allAllowances()
      .then((data) => {
        setLoading(false)
        setData(data.allowances)
      })
      .catch((err) => {
        setLoading(false)
        errorToast(err.message)
      })
  }

  return (
    <div className="form-control items-center">
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
