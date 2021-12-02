import { useCallback, useEffect, useState } from "react"
import { OfflineSigner } from "@cosmjs/proto-signing"
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { config, keplrConfig } from "src/config"
import { useWallet } from "./wallet"
import { errorToast } from "src/utils"
import { instantiatePath } from "src/routes"
import { useHistory } from "react-router"

export async function createClient(
  signer: OfflineSigner
): Promise<SigningCosmWasmClient> {
  return SigningCosmWasmClient.connectWithSigner(config.rpcUrl, signer)
}

export function useKeplr() {
  const { clear, init, initialized } = useWallet()
  const history = useHistory()
  const [initializing, setInitializing] = useState(false)

  const disconnect = () => {
    localStorage.clear()
    clear()
  }

  const connect = useCallback(() => {
    const loadKeplrWallet = async (): Promise<OfflineSigner> => {
      const anyWindow: any = window
      if (!anyWindow.getOfflineSigner) {
        setInitializing(false)
        throw new Error("Keplr extension is not available")
      }

      await anyWindow.keplr.enable(config.chainId)
      await anyWindow.keplr.experimentalSuggestChain(keplrConfig)

      const signer = anyWindow.getOfflineSignerAuto(config.chainId)
      signer.signAmino = signer.signAmino ?? signer.sign

      return Promise.resolve(signer)
    }

    setInitializing(true)

    loadKeplrWallet()
      .then((signer) => {
        init(signer)
      })
      .catch((err) => {
        errorToast(err.message)
      })
  }, [init])

  useEffect(() => {
    const item = localStorage.getItem("wallet_address")

    if (item) connect()
  }, [initialized, connect])

  useEffect(() => {
    if (!initialized) return

    history.push(instantiatePath)

    setInitializing(false)
  }, [initialized, history])

  return {
    connect,
    disconnect,
    initializing,
  }
}
