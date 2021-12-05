import { useState } from "react"
import { useContracts } from "src/contracts"
import { errorToast } from "src/utils"
import PrettyPrint from "src/components/PrettyPrint"
import { PermissionsInfo } from "src/contracts/cw1-subkeys"

const AllAllowances = (): JSX.Element => {
  const contract = useContracts().cw1Subkeys?.use()

  const [data, setData] = useState<PermissionsInfo>()
  const [address, setAddress] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const query = () => {
    if (address === "") return errorToast("Enter an adress.")

    setLoading(true)
    contract
      ?.permissions(address)
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
    <>
      <input
        type="text"
        placeholder="Address"
        className="input input-bordered text-black"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
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