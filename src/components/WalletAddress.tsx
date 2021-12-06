import { useWallet } from "src/services/wallet"

const WalletAddress = (): JSX.Element => {
  const wallet = useWallet()

  return (
    <div className="flex justify-center text-lg font-bold items-center bg-gray-800 rounded-lg p-2 px-5 text-deus-text">
      Your wallet address: {wallet.address}
    </div>
  )
}

export default WalletAddress
