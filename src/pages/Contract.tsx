// import { contract } from "src/config"
import { useWallet } from "src/services/wallet"

const Contract = (): JSX.Element => {
  const wallet = useWallet()

  return (
    <div className="flex justify-center items-center bg-deus-black text-deus-text w-full h-full">
      <div className="text-center">
        <div className="mb-20">
          <span className="text-6xl">Welcome to cw1-subkeys!</span>
        </div>
        <div className="text-3xl">Your wallet address is:</div>
        <div className="text-3xl">{wallet.address}</div>
        <br />
      </div>
    </div>
  )
}

export default Contract
