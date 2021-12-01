import { Coin } from "@cosmjs/amino"
import { calculateFee } from "@cosmjs/stargate"
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { FeeOptions } from "src/config"
import { GasPrice } from "@cosmjs/stargate"

interface ExecuteFeeOptions {
  fees: FeeOptions
  gasPrice: GasPrice
}

type Expiration =
  | { at_height: { height: number } }
  | { at_time: { time: number } }
  | { never: {} }

interface CanExecuteResponse {
  readonly canExecute: boolean
}

interface Permissions {
  readonly delegate: boolean
  readonly undelegate: boolean
  readonly redelegate: boolean
  readonly withdraw: boolean
}

interface PermissionsInfo {
  readonly spender: string
  readonly permissions: Permissions
}

interface AllPermissionsResponse {
  readonly permissions: readonly PermissionsInfo[]
}

export interface AllowanceInfo {
  readonly balance: readonly Coin[]
  readonly expires: Expiration
  readonly spender?: string
}

export interface AllAllowancesResponse {
  readonly allowances: readonly AllowanceInfo[]
}

interface AdminListResponse {
  readonly admins: readonly string[]
  readonly mutable: boolean
}

type CosmosMsg =
  | SendMsg
  | DelegateMsg
  | UndelegateMsg
  | RedelegateMsg
  | WithdrawMsg

export interface SendMsg {
  readonly bank: {
    readonly send: {
      readonly from_address: string
      readonly to_address: string
      readonly amount: readonly Coin[]
    }
  }
}

interface DelegateMsg {
  readonly staking: {
    readonly delegate: {
      readonly validator: string
      readonly amount: Coin
    }
  }
}

interface UndelegateMsg {
  readonly staking: {
    readonly undelegate: {
      readonly validator: string
      readonly amount: Coin
    }
  }
}

interface RedelegateMsg {
  readonly staking: {
    readonly redelegate: {
      readonly src_validator: string
      readonly dst_validator: string
      readonly amount: Coin
    }
  }
}

interface WithdrawMsg {
  readonly staking: {
    readonly withdraw: {
      readonly validator: string
      readonly recipient?: string
    }
  }
}

export interface CW1Instance {
  readonly contractAddress: string

  // queries
  admins: () => Promise<AdminListResponse>

  allowance: (address?: string) => Promise<AllowanceInfo>

  allAllowances: (
    startAfter?: string,
    limit?: number
  ) => Promise<AllAllowancesResponse>

  permissions: (address?: string) => Promise<PermissionsInfo>

  allPermissions: (
    startAfter?: string,
    limit?: number
  ) => Promise<AllPermissionsResponse>
  canExecute: (sender: string, msg: CosmosMsg) => Promise<CanExecuteResponse>

  // actions
  execute: (
    senderAddress: string,
    msgs: readonly CosmosMsg[]
  ) => Promise<string>

  freeze: (senderAddress: string) => Promise<string>

  updateAdmins: (
    senderAddress: string,
    admins: readonly string[]
  ) => Promise<string>

  increaseAllowance: (
    senderAddress: string,
    recipient: string,
    amount: Coin,
    expires?: Expiration
  ) => Promise<string>

  decreaseAllowance: (
    senderAddress: string,
    recipient: string,
    amount: Coin,
    expires?: Expiration
  ) => Promise<string>

  setPermissions: (
    senderAddress: string,
    recipient: string,
    permissions: Permissions
  ) => Promise<string>
}

export interface CW1Contract {
  instantiate: (
    senderAddress: string,
    codeId: number,
    initMsg: Record<string, unknown>,
    label: string
    // admin?: string
  ) => Promise<string>

  use: (contractAddress: string) => CW1Instance
}

export const CW1 = (
  client: SigningCosmWasmClient,
  options: ExecuteFeeOptions
): CW1Contract => {
  const use = (contractAddress: string): CW1Instance => {
    const allowance = async (address?: string): Promise<AllowanceInfo> => {
      return await client.queryContractSmart(contractAddress, {
        allowance: { spender: address },
      })
    }

    const allAllowances = async (
      startAfter?: string,
      limit?: number
    ): Promise<AllAllowancesResponse> => {
      return client.queryContractSmart(contractAddress, {
        all_allowances: { start_after: startAfter, limit: limit },
      })
    }

    const permissions = async (address?: string): Promise<PermissionsInfo> => {
      return await client.queryContractSmart(contractAddress, {
        permissions: { spender: address },
      })
    }

    const allPermissions = async (
      startAfter?: string,
      limit?: number
    ): Promise<AllPermissionsResponse> => {
      return client.queryContractSmart(contractAddress, {
        all_permissions: { start_after: startAfter, limit: limit },
      })
    }

    const canExecute = async (
      sender: string,
      msg: CosmosMsg
    ): Promise<CanExecuteResponse> => {
      return client.queryContractSmart(contractAddress, {
        can_execute: { sender: sender, msg: msg },
      })
    }

    const admins = async (): Promise<AdminListResponse> => {
      return client.queryContractSmart(contractAddress, { admin_list: {} })
    }

    const freeze = async (senderAddress: string): Promise<string> => {
      const fee = calculateFee(options.fees.exec, options.gasPrice)

      const result = await client.execute(
        senderAddress,
        contractAddress,
        { freeze: {} },
        fee
      )
      return result.transactionHash
    }

    const updateAdmins = async (
      senderAddress: string,
      admins: readonly string[]
    ): Promise<string> => {
      const fee = calculateFee(options.fees.exec, options.gasPrice)

      const result = await client.execute(
        senderAddress,
        contractAddress,
        { update_admins: { admins } },
        fee
      )
      return result.transactionHash
    }

    const execute = async (
      senderAddress: string,
      msgs: readonly CosmosMsg[]
    ): Promise<string> => {
      const fee = calculateFee(options.fees.exec, options.gasPrice)

      const result = await client.execute(
        senderAddress,
        contractAddress,
        { execute: { msgs } },
        fee
      )
      return result.transactionHash
    }

    const increaseAllowance = async (
      senderAddress: string,
      spender: string,
      amount: Coin,
      expires?: Expiration
    ): Promise<string> => {
      const fee = calculateFee(options.fees.exec, options.gasPrice)

      const result = await client.execute(
        senderAddress,
        contractAddress,
        { increase_allowance: { spender, amount, expires } },
        fee
      )
      return result.transactionHash
    }

    const decreaseAllowance = async (
      senderAddress: string,
      spender: string,
      amount: Coin,
      expires?: Expiration
    ): Promise<string> => {
      const fee = calculateFee(options.fees.exec, options.gasPrice)

      const result = await client.execute(
        senderAddress,
        contractAddress,
        { decrease_allowance: { spender, amount, expires } },
        fee
      )
      return result.transactionHash
    }

    const setPermissions = async (
      senderAddress: string,
      spender: string,
      permissions: Permissions
    ): Promise<string> => {
      const fee = calculateFee(options.fees.exec, options.gasPrice)

      const result = await client.execute(
        senderAddress,
        contractAddress,
        { set_permissions: { spender, permissions } },
        fee
      )
      return result.transactionHash
    }

    return {
      contractAddress,
      admins,
      allowance,
      allAllowances,
      permissions,
      allPermissions,
      canExecute,
      execute,
      freeze,
      updateAdmins,
      increaseAllowance,
      decreaseAllowance,
      setPermissions,
    }
  }

  const instantiate = async (
    senderAddress: string,
    codeId: number,
    initMsg: Record<string, unknown>,
    label: string
    // admin?: string
  ): Promise<string> => {
    const fee = calculateFee(options.fees.init, options.gasPrice)

    const result = await client.instantiate(
      senderAddress,
      codeId,
      initMsg,
      label,
      fee
    )
    return result.transactionHash
  }

  return { use, instantiate }
}
