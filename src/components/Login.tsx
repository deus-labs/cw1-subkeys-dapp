import { useContext, useEffect, useState } from "react"
import { WalletLoader, loadKeplrWallet } from "../services/sdk"
import { CosmWasmContext } from "../services/wallet"
import { config, keplrConfig } from "../config"
import { useHistory } from "react-router-dom"
import { RedirectLocation } from "src/routes/ProtectedSwitch"
import { operationPath } from "src/routes"

const Login = (): JSX.Element => {
  const sdk = useContext(CosmWasmContext)
  const history = useHistory()
  const state = history.location.state as RedirectLocation

  const [initializing, setInitializing] = useState(true)

  const init = async (loadWallet: WalletLoader) => {
    try {
      const signer = await loadWallet(config.chainId)
      sdk.init(signer)
    } catch (error) {
      console.error(error)
    }
  }

  const initKeplr = async () => {
    setInitializing(true)
    const anyWindow: any = window
    try {
      if (anyWindow.keplr) {
        await anyWindow.keplr.enable(config.chainId)
        await anyWindow.keplr.experimentalSuggestChain(keplrConfig)
        await init(loadKeplrWallet)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const item = localStorage.getItem("wallet_address")
    if (item) {
      initKeplr()
    } else setInitializing(false)
  }, [sdk.initialized])

  useEffect(() => {
    if (!sdk.initialized) return

    if (state) {
      history.push(state.redirectPathname, state.redirectState)
    } else {
      history.push(operationPath)
    }

    setInitializing(false)
  }, [sdk.initialized, state, history])

  return initializing ? (
    <div>Loading</div>
  ) : (
    <div>
      <button onClick={initKeplr}>Login with Keplr</button>
    </div>
  )
}

export default Login
