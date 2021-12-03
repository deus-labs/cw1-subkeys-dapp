import { useState } from "react"
import { useContracts } from "src/contracts"
import { errorToast } from "src/utils"
import PrettyPrint from "src/components/PrettyPrint"
import { AllowanceInfo } from "src/contracts/cw1-subkeys"

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
    <>
      <button
        onClick={query}
        className={`btn btn-primary ${loading ? "loading" : ""}`}
      >
        {!loading && "Query"}
      </button>

      <PrettyPrint data={data} />
    </>
  )
}

export default AllAllowances
