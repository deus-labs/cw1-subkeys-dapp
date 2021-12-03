import { useState } from "react"
import SectionLayout from "src/layout/Section"
import AllAllowances from "./AllAllowances"
import Admins from "./Admins"
import Allowances from "./Allowances"
import AllPermissions from "./AllPermissions"
import Permissions from "./Permissions"
import CanExecute from "./CanExecute"
import WalletAddress from "src/components/WalletAddress"
import ContractAddress from "src/components/ContractAddress"

const Query = (): JSX.Element => {
  const [option, setOption] = useState<string>("admins")

  const optionOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value)
  }

  return (
    <SectionLayout>
      <WalletAddress />
      <ContractAddress />
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
