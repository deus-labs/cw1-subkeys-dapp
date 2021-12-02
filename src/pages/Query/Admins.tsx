import { useState } from "react"
import { useCW1Contract } from "src/contracts"
import { contract as contractConfig } from "src/config"
import { errorToast } from "src/utils"
import PrettyPrint from "src/components/PrettyPrint"

const AllAllowances = (): JSX.Element => {
  const contract = useCW1Contract().use(contractConfig.address)

  const [admins, setAdmins] = useState<readonly string[]>()
  const [isMutable, setIsMutable] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const query = () => {
    setLoading(true)
    contract
      ?.admins()
      .then((data) => {
        setLoading(false)
        setAdmins(data.admins)
        setIsMutable(data.mutable)
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

      <PrettyPrint data={admins} />
      <div>{isMutable}</div>
    </>
  )
}

export default AllAllowances
