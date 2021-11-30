export interface MappedCoin {
  readonly denom: string
  readonly fractionalDigits: number
}

export interface CoinMap {
  readonly [key: string]: MappedCoin
}
