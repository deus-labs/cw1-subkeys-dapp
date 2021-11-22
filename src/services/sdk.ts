import { OfflineSigner } from "@cosmjs/proto-signing"
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { AppConfig } from "src/config"

export type WalletLoader = (
  chainId: string,
  addressPrefix?: string
) => Promise<OfflineSigner>

export const loadKeplrWallet = async (
  chainId: string
): Promise<OfflineSigner> => {
  const anyWindow: any = window
  if (!anyWindow.getOfflineSigner) {
    throw new Error("Keplr extension is not available")
  }

  const signer = anyWindow.getOfflineSigner(chainId)
  signer.signAmino = signer.signAmino ?? signer.sign

  return Promise.resolve(signer)
}

export async function createClient(
  config: AppConfig,
  signer: OfflineSigner
): Promise<SigningCosmWasmClient> {
  return SigningCosmWasmClient.connectWithSigner(config.rpcUrl, signer, {
    prefix: config.addressPrefix,
  })
}
