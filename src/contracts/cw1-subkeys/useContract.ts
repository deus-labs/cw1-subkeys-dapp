import { GasPrice } from "@cosmjs/stargate"
import { useEffect, useState } from "react"
import { config } from "src/config"
import { useWallet } from "src/services/wallet"
import { CW1Contract, CW1 as CW1Init } from "./contract"

export function useCW1Contract(): CW1Contract | undefined {
  const { getClient } = useWallet()

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

  return CW1
}
