import { OfflineSigner } from "@cosmjs/proto-signing"
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { config, keplrConfig } from "src/config"

export const loadKeplrWallet = async (): Promise<OfflineSigner> => {
  const anyWindow: any = window
  if (!anyWindow.getOfflineSigner) {
    throw new Error("Keplr extension is not available")
  }

  await anyWindow.keplr.enable(config.chainId)
  await anyWindow.keplr.experimentalSuggestChain(keplrConfig)

  const signer = anyWindow.getOfflineSigner(config.chainId)
  signer.signAmino = signer.signAmino ?? signer.sign

  return Promise.resolve(signer)
}

export async function createClient(
  signer: OfflineSigner
): Promise<SigningCosmWasmClient> {
  return SigningCosmWasmClient.connectWithSigner(config.rpcUrl, signer)
}
