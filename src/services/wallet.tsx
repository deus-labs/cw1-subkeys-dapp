import * as React from "react"
import { useEffect, useState } from "react"
import { AppConfig, config } from "../config"
import { createClient } from "./sdk"
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { FaucetClient } from "@cosmjs/faucet-client"
import { Coin } from "@cosmjs/stargate"
import { OfflineSigner } from "@cosmjs/proto-signing"

interface CosmWasmContextType {
  readonly initialized: boolean
  readonly init: (signer: OfflineSigner) => void
  readonly clear: () => void
  readonly config: Partial<AppConfig>
  readonly address: string
  readonly balance: readonly Coin[]
  readonly refreshBalance: () => Promise<void>
  readonly getClient: () => SigningCosmWasmClient
  readonly getSigner: () => OfflineSigner
}

function throwNotInitialized(): any {
  throw new Error("Not yet initialized")
}

const defaultContext: CosmWasmContextType = {
  initialized: false,
  init: throwNotInitialized,
  clear: throwNotInitialized,
  config: {},
  address: "",
  balance: [],
  refreshBalance: throwNotInitialized,
  getClient: throwNotInitialized,
  getSigner: throwNotInitialized,
}

export const CosmWasmContext =
  React.createContext<CosmWasmContextType>(defaultContext)

export const useSdk = (): CosmWasmContextType =>
  React.useContext(CosmWasmContext)

export function SdkProvider({ children }: any): JSX.Element {
  const [signer, setSigner] = useState<OfflineSigner>()
  const [client, setClient] = useState<SigningCosmWasmClient>()

  const contextWithInit = { ...defaultContext, init: setSigner }
  const [value, setValue] = useState<CosmWasmContextType>(contextWithInit)

  const clear = (): void => {
    setValue({ ...contextWithInit })
    setClient(undefined)
    setSigner(undefined)
  }

  // Get balance for each coin specified in config.coinMap
  async function refreshBalance(
    address: string,
    balance: Coin[]
  ): Promise<void> {
    if (!client) return

    balance.length = 0
    for (const denom in config.coinMap) {
      const coin = await client.getBalance(address, denom)
      if (coin) balance.push(coin)
    }
  }

  // Get feeToken balance from faucet
  async function hitFaucet(address: string): Promise<void> {
    if (!config.faucetUrl || !config.feeToken) return

    try {
      const faucet = new FaucetClient(config.faucetUrl)
      await faucet.credit(address, config.feeToken)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!signer) return
    ;(async function updateClient(): Promise<void> {
      try {
        const client = await createClient(config, signer)
        setClient(client)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [signer])

  useEffect(() => {
    if (!signer || !client) return

    const balance: Coin[] = []

    ;(async function updateValue(): Promise<void> {
      const address = (await signer.getAccounts())[0].address

      await refreshBalance(address, balance)
      if (!balance.find((coin) => coin.denom === config.feeToken)) {
        await hitFaucet(address)
      }
      await refreshBalance(address, balance)

      setValue({
        initialized: true,
        init: () => {},
        clear,
        config,
        address,
        balance,
        refreshBalance: refreshBalance.bind(null, address, balance),
        getClient: () => client,
        getSigner: () => signer,
      })
    })()
  }, [client])

  return (
    <CosmWasmContext.Provider value={value}>
      {children}
    </CosmWasmContext.Provider>
  )
}
