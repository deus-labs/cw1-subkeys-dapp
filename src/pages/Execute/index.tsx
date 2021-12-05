import { useState } from "react"
import SectionLayout from "src/layout/Section"
import SendTokens from "./SendTokens"
import IncreaseAllowance from "./IncreaseAllowance"
import DecreaseAllowace from "./DecreaseAllowace"
import UpdateAdmins from "./UpdateAdmins"
import FreezeAdmins from "./FreezeAdmins"
import SetPermissions from "./SetPermissions"
import WalletAddress from "src/components/WalletAddress"
import ContractAddress from "src/components/ContractAddress"
import Dropdown from "src/components/Dropdown"

const DROPDOWN_OPTIONS = [
  "Send tokens",
  "Increase Allowance",
  "Decrease Allowance",
  "Update Admins",
  "Freeze Admins",
  "Set Permissions",
]

const Execute = (): JSX.Element => {
  const [option, setOption] = useState<string>("send-tokens")

  return (
    <SectionLayout>
      <WalletAddress />
      <ContractAddress />
      <br />
      <Dropdown
        onChange={(e) => setOption(e.target.value)}
        value={option}
        options={DROPDOWN_OPTIONS}
        label="Select execute operation"
      />
      <div className="pt-4">
        {option === "send-tokens" && <SendTokens />}
        {option === "increase-allowance" && <IncreaseAllowance />}
        {option === "decrease-allowance" && <DecreaseAllowace />}
        {option === "update-admins" && <UpdateAdmins />}
        {option === "freeze-admins" && <FreezeAdmins />}
        {option === "set-permissions" && <SetPermissions />}
      </div>
    </SectionLayout>
  )
}

export default Execute
