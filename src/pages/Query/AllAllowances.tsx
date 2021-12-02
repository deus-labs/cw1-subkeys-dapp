import { useState } from "react"
import { useCW1Contract, AllowanceInfo } from "src/contracts"
import { contract as contractConfig } from "src/config"
import { errorToast } from "src/utils"
import PrettyPrint from "src/components/PrettyPrint"

const AllAllowances = (): JSX.Element => {
  const contract = useCW1Contract().use(contractConfig.address)

  const [data, setData] = useState<readonly AllowanceInfo[]>()
  const [loading, setLoading] = useState<boolean>(false)

  const query = () => {
    setLoading(true)
    contract
      ?.allAllowances()
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
