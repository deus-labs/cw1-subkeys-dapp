import { GasPrice } from "@cosmjs/stargate"
import { useEffect, useState } from "react"
import { config, contract } from "src/config"
import { useSdk } from "../../wallet"
import { CW1Instance, CW1 as CW1Init } from "./contract"

export function useCW1Contract(): CW1Instance | undefined {
  const sdk = useSdk()

  const [CW1, setCW1] = useState<CW1Instance>()

  useEffect(() => {
    const getCW1Instance = async () => {
      const contractConfig = {
        fees: config.fees,
        gasPrice: GasPrice.fromString(`${config.gasPrice}${config.feeToken}`),
      }

      const cw1Contract = CW1Init(sdk.getClient(), contractConfig).use(
        contract.address
      )

      setCW1(cw1Contract)
    }

    getCW1Instance()
  }, [sdk])

  return CW1
}
