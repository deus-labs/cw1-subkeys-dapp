import { useContext } from "react"
import { CosmWasmContext } from "../services/wallet"

const Login = (): JSX.Element => {
  const sdk = useContext(CosmWasmContext)

  return (
    <div>
      {sdk.initialized && (
        <div>
          {JSON.stringify(sdk.balance)}
          {JSON.stringify(sdk.address)}
        </div>
      )}
    </div>
  )
}

export default Login
