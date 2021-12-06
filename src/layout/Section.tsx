import WalletAddress from "src/components/WalletAddress"
import { useWallet } from "src/services/wallet"

const Section = ({ children }: any): JSX.Element => {
  const wallet = useWallet()

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
      <div className="text-deus-text h-5/6 w-5/6 p-10 bg-deus-gray rounded-xl overflow-auto">
        {children}
      </div>
      {wallet.initialized && (
        <div className="absolute top-10">
          <WalletAddress />
        </div>
      )}
    </div>
  )
}

export default Section
