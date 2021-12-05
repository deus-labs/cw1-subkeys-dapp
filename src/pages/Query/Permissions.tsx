import { useState } from "react"
import { useContracts } from "src/contracts"
import { errorToast } from "src/utils"
import PrettyPrint from "src/components/PrettyPrint"
import { PermissionsInfo } from "src/contracts/cw1-subkeys"
import TextInput from "src/components/TextInput"
import Button from "src/components/Button"

const AllPermissions = (): JSX.Element => {
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
    <div className="form-control items-center">
      <TextInput
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        label="Address to check permission"
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

export default AllPermissions
