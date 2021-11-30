import * as React from "react"
import { useEffect, useState } from "react"
import { config } from "../config"
import { createClient } from "./keplr"
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { Coin } from "@cosmjs/stargate"
import { OfflineSigner } from "@cosmjs/proto-signing"

interface CosmWasmContextType {
  readonly initialized: boolean
  readonly init: (signer: OfflineSigner) => void
  readonly clear: () => void
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
  address: "",
  balance: [],
  refreshBalance: throwNotInitialized,
  getClient: throwNotInitialized,
  getSigner: throwNotInitialized,
}

export const CosmWasmContext =
  React.createContext<CosmWasmContextType>(defaultContext)

export const useWallet = (): CosmWasmContextType =>
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

    setValue({ ...value, balance })
  }

  useEffect(() => {
    if (!signer) return
    ;(async function updateClient(): Promise<void> {
      try {
        const client = await createClient(signer)
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

      localStorage.setItem("wallet_address", address)

      setValue({
        initialized: true,
        init: () => {},
        clear,
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
