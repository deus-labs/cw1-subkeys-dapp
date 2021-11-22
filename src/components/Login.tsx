import { useContext } from "react"
import { WalletLoader, loadKeplrWallet } from "../services/sdk"
import { CosmWasmContext } from "../services/wallet"
import { config, keplrConfig } from "../config"

const Login = (): JSX.Element => {
  const sdk = useContext(CosmWasmContext)

  const init = async (loadWallet: WalletLoader) => {
    try {
      const signer = await loadWallet(config.chainId)
      sdk.init(signer)
    } catch (error) {
      console.error(error)
    }
  }

  const initKeplr = async () => {
    const anyWindow: any = window
    try {
      await anyWindow.keplr.experimentalSuggestChain(keplrConfig)
      await anyWindow.keplr.enable(config.chainId)
      await init(loadKeplrWallet)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <button onClick={initKeplr}>Login with Keplr</button>

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
