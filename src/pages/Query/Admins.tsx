import { useState } from "react"
import { useContracts } from "src/contracts"
import { errorToast } from "src/utils"
import PrettyPrint from "src/components/PrettyPrint"

const Admins = (): JSX.Element => {
  const contract = useContracts().cw1Subkeys?.use()

  const [admins, setAdmins] = useState<readonly string[]>()
  const [isMutable, setIsMutable] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const query = () => {
    if (!contract) return errorToast("Contract is not initialized.")

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

export default Admins
