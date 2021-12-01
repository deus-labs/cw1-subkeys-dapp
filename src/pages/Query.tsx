import { useState } from "react"
import SectionLayout from "src/layout/Section"
import { useWallet } from "src/services/wallet"
import AllAllowances from "src/components/Query/AllAllowances"
import Admins from "src/components/Query/Admins"
import Allowances from "src/components/Query/Allowances"
import AllPermissions from "src/components/Query/AllPermissions"
import Permissions from "src/components/Query/Permissions"
import CanExecute from "src/components/Query/CanExecute"

const Query = (): JSX.Element => {
  const wallet = useWallet()

  const [option, setOption] = useState<string>("admins")

  const optionOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value)
  }

  return (
    <SectionLayout>
      <div>Address: {wallet.address}</div>
      <label className="label">
        <span className="label-text text-deus-text">Select query</span>
      </label>
      <select
        className="select select-bordered w-full max-w-xs text-black"
        onChange={optionOnChange}
        value={option}
      >
        <option value="admins">Admins</option>
        <option value="all-allowances">All Allowances</option>
        <option value="allowances">Allowance</option>
        <option value="all-permissions">All Permissions</option>
        <option value="permissions">Permissions</option>
        <option value="can-execute">Can Execute</option>
      </select>

      {option === "admins" && <Admins />}
      {option === "all-allowances" && <AllAllowances />}
      {option === "allowances" && <Allowances />}
      {option === "all-permissions" && <AllPermissions />}
      {option === "permissions" && <Permissions />}
      {option === "can-execute" && <CanExecute />}
    </SectionLayout>
  )
}

export default Query
