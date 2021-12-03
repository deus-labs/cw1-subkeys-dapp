import { GasPrice } from "@cosmjs/stargate"
import { useCallback, useEffect, useState } from "react"
import { config } from "src/config"
import { useWallet } from "src/services/wallet"
import { CW1Contract, CW1Instance, CW1 as CW1Init } from "./contract"
interface InstantiateProps {
  codeId: number
  initMsg: Record<string, unknown>
  label: string
}

export interface UseCW1ContractProps {
  instantiate: ({ codeId, initMsg, label }: InstantiateProps) => Promise<string>
  use: () => CW1Instance | undefined
  updateContractAddress: (contractAddress: string) => void
}

export function useCW1Contract(): UseCW1ContractProps {
  const wallet = useWallet()

  const [address, setAddress] = useState<string>(
    localStorage.getItem("contract_address") || ""
  )
  const [CW1, setCW1] = useState<CW1Contract>()

  useEffect(() => {
    if (wallet.initialized) {
      const getCW1Instance = async (): Promise<void> => {
        const contractConfig = {
          fees: config.fees,
          gasPrice: GasPrice.fromString(`${config.gasPrice}${config.feeToken}`),
        }

        const cw1Contract = CW1Init(wallet.getClient(), contractConfig)
        setCW1(cw1Contract)
      }

      getCW1Instance()
    }
  }, [wallet])

  const updateContractAddress = (contractAddress: string) => {
    setAddress(contractAddress)
  }

  const instantiate = useCallback(
    ({ codeId, initMsg, label }: InstantiateProps): Promise<string> => {
      return new Promise((resolve, reject) => {
        if (!CW1) return reject("Contract is not initialized.")
        CW1.instantiate(wallet.address, codeId, initMsg, label)
          .then(resolve)
          .catch(reject)
      })
    },
    [CW1, wallet]
  )

  const use = useCallback((): CW1Instance | undefined => {
    return CW1?.use(address)
  }, [CW1, address])

  return {
    instantiate,
    use,
    updateContractAddress,
  }
}
