import { GasPrice } from "@cosmjs/stargate"
import { useEffect, useState } from "react"
import { config } from "src/config"
import { useWallet } from "src/services/wallet"
import { CW1Contract, CW1Instance, CW1 as CW1Init } from "./contract"
interface InstantiateProps {
  codeId: number
  initMsg: Record<string, unknown>
  label: string
}

interface UseCW1ContractProps {
  instantiate: ({ codeId, initMsg, label }: InstantiateProps) => Promise<string>
  use: (contractAddress: string) => CW1Instance | undefined
}

export function useCW1Contract(): UseCW1ContractProps {
  const { getClient, address } = useWallet()

  const [CW1, setCW1] = useState<CW1Contract>()

  useEffect(() => {
    const getCW1Instance = async (): Promise<void> => {
      const contractConfig = {
        fees: config.fees,
        gasPrice: GasPrice.fromString(`${config.gasPrice}${config.feeToken}`),
      }

      const cw1Contract = CW1Init(getClient(), contractConfig)

      setCW1(cw1Contract)
    }

    getCW1Instance()
  }, [getClient])

  const instantiate = ({
    codeId,
    initMsg,
    label,
  }: InstantiateProps): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!CW1) return reject("Contract is not initialized.")
      CW1.instantiate(address, codeId, initMsg, label)
        .then(resolve)
        .catch(reject)
    })
  }

  const use = (contractAddress: string): CW1Instance | undefined => {
    return CW1?.use(contractAddress)
  }

  return {
    instantiate,
    use,
  }
}
