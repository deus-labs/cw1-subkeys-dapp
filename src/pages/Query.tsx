import { useState } from "react"
import SectionLayout from "src/layout/Section"
import { useWallet } from "src/services/wallet"
import { useCW1Contract, AllowanceInfo } from "src/contracts"
import { contract as contractConfig } from "src/config"
import { errorToast } from "src/utils"

const Query = (): JSX.Element => {
  const wallet = useWallet()
  const contract = useCW1Contract().use(contractConfig.address)

  const [allowances, setAllowances] = useState<readonly AllowanceInfo[]>([])

  const [loading, setLoading] = useState<boolean>(false)

  const allAllowances = () => {
    setLoading(true)
    contract
      ?.allAllowances()
      .then((data) => {
        setLoading(false)
        setAllowances(data.allowances)
      })
      .catch((err) => {
        setLoading(false)
        errorToast(err.message)
      })
  }

  return (
    <SectionLayout>
      <div>Address: {wallet.address}</div>

      <button
        onClick={allAllowances}
        className={`btn btn-primary ${loading ? "loading" : ""}`}
      >
        {!loading && "Query"}
      </button>

      <div>{JSON.stringify(allowances)}</div>
    </SectionLayout>
  )
}

export default Query
