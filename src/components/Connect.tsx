import { useContext, useEffect, useState } from "react"
import { loadKeplrWallet } from "../services/sdk"
import { CosmWasmContext } from "../services/wallet"
import { useHistory } from "react-router-dom"
import { operationPath } from "src/routes"
import { errorToast } from "src/utils"

const Login = (): JSX.Element => {
  const sdk = useContext(CosmWasmContext)
  const history = useHistory()

  const [initializing, setInitializing] = useState(true)

  const init = async () => {
    setInitializing(true)
    loadKeplrWallet()
      .then((signer) => {
        sdk.init(signer)
      })
      .catch((err) => {
        errorToast(err.message)
        setInitializing(false)
      })
  }

  useEffect(() => {
    const item = localStorage.getItem("wallet_address")
    if (item) init()
    else setInitializing(false)
  }, [sdk.initialized])

  useEffect(() => {
    if (!sdk.initialized) return

    history.push(operationPath)

    setInitializing(false)
  }, [sdk.initialized, history])

  return initializing ? (
    <div>Loading</div>
  ) : (
    <div>
      <button className="btn btn-info" onClick={init}>
        Connect Wallet
      </button>
    </div>
  )
}

export default Login
