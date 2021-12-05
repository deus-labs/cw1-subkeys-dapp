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
import Dropdown from "src/components/Dropdown"

const DROPDOWN_OPTIONS = [
  "Admins",
  "All allowances",
  "Allowance",
  "All permissions",
  "Permission",
  "Can execute",
]

const Query = (): JSX.Element => {
  const [option, setOption] = useState<string>("admins")

  return (
    <SectionLayout>
      <WalletAddress />
      <ContractAddress />
      <br />
      <Dropdown
        label="Select query"
        value={option}
        options={DROPDOWN_OPTIONS}
        onChange={(e) => setOption(e.target.value)}
      />
      <div className="pt-4">
        {option === "admins" && <Admins />}
        {option === "all-allowances" && <AllAllowances />}
        {option === "allowance" && <Allowances />}
        {option === "all-permissions" && <AllPermissions />}
        {option === "permission" && <Permissions />}
        {option === "can-execute" && <CanExecute />}
      </div>
    </SectionLayout>
  )
}

export default Query
