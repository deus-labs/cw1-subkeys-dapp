import { useState } from "react"
import { useCW1Contract, PermissionsInfo } from "src/contracts"
import { contract as contractConfig } from "src/config"
import { errorToast } from "src/utils"
import PrettyPrint from "src/components/PrettyPrint"

const AllAllowances = (): JSX.Element => {
  const contract = useCW1Contract().use(contractConfig.address)

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
