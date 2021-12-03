import { useWallet } from "src/services/wallet"

const WalletAddress = (): JSX.Element => {
  const wallet = useWallet()

  return (
    <div className="flex justify-center text-lg font-bold items-center">
      Your wallet address: {wallet.address}
    </div>
  )
}

export default WalletAddress
