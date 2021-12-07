import { coin } from "@cosmjs/proto-signing"
import { config } from "src/config"

export interface MappedCoin {
  readonly denom: string
  readonly fractionalDigits: number
}

export interface CoinMap {
  readonly [key: string]: MappedCoin
}

export function convertToNativeCoin(amount: string) {
  if (amount === "" || isNaN(Number(amount))) return null

  return coin(Number(amount), config.feeToken)
}
