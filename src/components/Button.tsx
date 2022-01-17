import { useWallet } from "src/services/wallet"

interface ButtonProps {
  onClick: () => void
  className?: string
  loading?: boolean
  text: string
  width?: string
  textSize?: string
}

const Button = ({
  onClick,
  className = "",
  loading = false,
  text,
  width = "w-3/6",
  textSize = "text-lg"
}: ButtonProps): JSX.Element => {
  const wallet = useWallet()

  return (
    <div
      data-tip="Connect wallet to continue"
      className={`${!wallet.initialized ? "tooltip" : ""} ${width}`}
    >
      <button
        onClick={onClick}
        className={`btn ${
          loading ? "loading" : ""
        } capitalize ${className} w-full ${textSize}`}
        disabled={!wallet.initialized}
        style={{ color: "white" }}
      >
        {!loading && text}
      </button>
    </div>
  )
}

export default Button
