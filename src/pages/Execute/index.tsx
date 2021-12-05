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

const Execute = (): JSX.Element => {
  const [option, setOption] = useState<string>("send-tokens")

  const optionOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value)
  }

  return (
    <SectionLayout>
      <WalletAddress />
      <ContractAddress />
      <select
        className="select select-bordered w-full max-w-xs text-black"
        onChange={optionOnChange}
        value={option}
      >
        <option value="send-tokens">Send tokens</option>
        <option value="increase-allowance">Increase Allowance</option>
        <option value="decrease-allowance">Decrease Allowance</option>
        <option value="update-admins">Update Admins</option>
        <option value="freeze-admins">Freeze Admins</option>
        <option value="set-permissions">Set Permissions</option>
      </select>
      <br />
      <br />
      {option === "send-tokens" && <SendTokens />}
      {option === "increase-allowance" && <IncreaseAllowance />}
      {option === "decrease-allowance" && <DecreaseAllowace />}
      {option === "update-admins" && <UpdateAdmins />}
      {option === "freeze-admins" && <FreezeAdmins />}
      {option === "set-permissions" && <SetPermissions />}
    </SectionLayout>
  )
}

export default Execute
