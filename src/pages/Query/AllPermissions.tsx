import { useState } from "react"
import { useCW1Contract, PermissionsInfo } from "src/contracts"
import { contract as contractConfig } from "src/config"
import { errorToast } from "src/utils"

const AllPermissions = (): JSX.Element => {
  const contract = useCW1Contract().use(contractConfig.address)

  const [data, setData] = useState<readonly PermissionsInfo[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const query = () => {
    setLoading(true)
    contract
      ?.allPermissions()
      .then((data) => {
        setLoading(false)
        setData(data.permissions)
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

      <div>{JSON.stringify(data)}</div>
    </>
  )
}

export default AllPermissions
