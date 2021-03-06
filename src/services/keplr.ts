import { useEffect, useState } from "react"
import { OfflineSigner } from "@cosmjs/proto-signing"
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { getConfig, keplrConfig, AppConfig } from "src/config"
import { useWallet } from "./wallet"
import { errorToast } from "src/utils"

export async function createClient(
  signer: OfflineSigner,
  network: string
): Promise<SigningCosmWasmClient> {
  return SigningCosmWasmClient.connectWithSigner(
    getConfig(network).rpcUrl,
    signer
  )
}

export async function loadKeplrWallet(
  config: AppConfig
): Promise<OfflineSigner> {
  const anyWindow: any = window
  if (!anyWindow.getOfflineSigner) {
    throw new Error("Keplr extension is not available")
  }

  await anyWindow.keplr.enable(config.chainId)
  await anyWindow.keplr.experimentalSuggestChain(keplrConfig(config))

  const signer = await anyWindow.getOfflineSignerAuto(config.chainId)
  signer.signAmino = signer.signAmino ?? signer.sign

  return Promise.resolve(signer)
}

export function useKeplr() {
  const { clear, init, initialized, network } = useWallet()
  const [initializing, setInitializing] = useState(false)
  const config = getConfig(network)

  const disconnect = () => {
    localStorage.clear()
    clear()
  }

  const connect = () => {
    setInitializing(true)

    loadKeplrWallet(config)
      .then((signer) => {
        init(signer)
      })
      .catch((err) => {
        setInitializing(false)
        errorToast(err.message)
      })
  }

  // useEffect(() => {
  //   const item = localStorage.getItem("wallet_address")

  //   if (item) connect()
  // }, [initialized, connect])

  useEffect(() => {
    if (!initialized) return

    setInitializing(false)
  }, [initialized])

  return {
    connect,
    disconnect,
    initializing,
  }
}
