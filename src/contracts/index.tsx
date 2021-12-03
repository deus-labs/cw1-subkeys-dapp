import React from "react"
import { UseCW1ContractProps, useCW1Contract } from "./cw1-subkeys"

interface ContractsContextType {
  cw1Subkeys: UseCW1ContractProps | null
}

const defaultContext: ContractsContextType = {
  cw1Subkeys: null,
}

const ContractsContext =
  React.createContext<ContractsContextType>(defaultContext)

export const useContracts = (): ContractsContextType =>
  React.useContext(ContractsContext)

export function ContractsProvider({
  children,
}: React.HTMLAttributes<HTMLOrSVGElement>): JSX.Element {
  const cw1Subkeys = useCW1Contract()

  const value: ContractsContextType = { cw1Subkeys }

  return (
    <ContractsContext.Provider value={value}>
      {children}
    </ContractsContext.Provider>
  )
}
