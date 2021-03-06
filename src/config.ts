import { CoinMap } from "./utils"

export interface AppConfig {
  readonly chainId: string
  readonly chainName: string
  readonly addressPrefix: string
  readonly rpcUrl: string
  readonly httpUrl?: string
  readonly faucetUrl?: string
  readonly feeToken: string
  readonly stakingToken: string
  readonly coinMap: CoinMap
  readonly gasPrice: number
  readonly fees: FeeOptions
  readonly codeId?: number
}

export interface FeeOptions {
  upload: number
  exec: number
  init: number
}

export interface KeplrCoin {
  readonly coinDenom: string
  readonly coinMinimalDenom: string
  readonly coinDecimals: number
}

export interface KeplrConfig {
  readonly chainId: string
  readonly chainName: string
  readonly rpc: string
  readonly rest?: string
  readonly bech32Config: {
    readonly bech32PrefixAccAddr: string
    readonly bech32PrefixAccPub: string
    readonly bech32PrefixValAddr: string
    readonly bech32PrefixValPub: string
    readonly bech32PrefixConsAddr: string
    readonly bech32PrefixConsPub: string
  }
  readonly currencies: readonly KeplrCoin[]
  readonly feeCurrencies: readonly KeplrCoin[]
  readonly stakeCurrency: KeplrCoin
  readonly gasPriceStep: {
    readonly low: number
    readonly average: number
    readonly high: number
  }
  readonly bip44: { readonly coinType: number }
  readonly coinType: number
}

export const junoMainnetConfig: AppConfig = {
  chainId: "juno-1",
  chainName: "Juno",
  addressPrefix: "juno",
  rpcUrl: "https://rpc.juno-1.deuslabs.fi",
  // httpUrl: "https://rpc.juno-1.deuslabs.fi",
  feeToken: "ujuno",
  stakingToken: "ujuno",
  coinMap: {
    ujuno: { denom: "JUNO", fractionalDigits: 6 },
  },
  gasPrice: 0.0025,
  fees: {
    upload: 1500000,
    init: 500000,
    exec: 200000,
  },
}

export const uniConfig: AppConfig = {
  chainId: "uni-1",
  chainName: "Uni",
  addressPrefix: "juno",
  rpcUrl: "https://rpc.uni.juno.deuslabs.fi",
  httpUrl: "https://lcd.uni.juno.deuslabs.fi",
  faucetUrl: "https://faucet.uni.juno.deuslabs.fi",
  feeToken: "ujunox",
  stakingToken: "ujunox",
  coinMap: {
    ujunox: { denom: "JUNOX", fractionalDigits: 6 },
  },
  gasPrice: 0.0025,
  fees: {
    upload: 1500000,
    init: 500000,
    exec: 200000,
  },
}

export const keplrConfig = (config: AppConfig): KeplrConfig => ({
  chainId: config.chainId,
  chainName: config.chainName,
  rpc: config.rpcUrl,
  rest: config.httpUrl,
  bech32Config: {
    bech32PrefixAccAddr: `${config.addressPrefix}`,
    bech32PrefixAccPub: `${config.addressPrefix}pub`,
    bech32PrefixValAddr: `${config.addressPrefix}valoper`,
    bech32PrefixValPub: `${config.addressPrefix}valoperpub`,
    bech32PrefixConsAddr: `${config.addressPrefix}valcons`,
    bech32PrefixConsPub: `${config.addressPrefix}valconspub`,
  },
  currencies: [
    {
      coinDenom: config.coinMap[config.feeToken].denom,
      coinMinimalDenom: config.feeToken,
      coinDecimals: config.coinMap[config.feeToken].fractionalDigits,
    },
    {
      coinDenom: config.coinMap[config.stakingToken].denom,
      coinMinimalDenom: config.stakingToken,
      coinDecimals: config.coinMap[config.stakingToken].fractionalDigits,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: config.coinMap[config.feeToken].denom,
      coinMinimalDenom: config.feeToken,
      coinDecimals: config.coinMap[config.feeToken].fractionalDigits,
    },
  ],
  stakeCurrency: {
    coinDenom: config.coinMap[config.stakingToken].denom,
    coinMinimalDenom: config.stakingToken,
    coinDecimals: config.coinMap[config.stakingToken].fractionalDigits,
  },
  gasPriceStep: {
    low: config.gasPrice / 2,
    average: config.gasPrice,
    high: config.gasPrice * 2,
  },
  bip44: { coinType: 118 },
  coinType: 118,
})

export const networkConfig = {
  "juno-mainnet": junoMainnetConfig,
  "juno-uni-testnet": uniConfig,
}

export const getConfig = (network: string) => networkConfig[network]
