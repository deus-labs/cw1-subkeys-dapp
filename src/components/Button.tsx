import { useWallet } from "src/services/wallet"

interface ButtonProps {
  onClick: () => void
  className?: string
  loading?: boolean
  text: string
}

const Button = ({
  onClick,
  className = "",
  loading = false,
  text,
}: ButtonProps): JSX.Element => {
  const wallet = useWallet()

  return (
    <div
      data-tip="Connect wallet to continue"
      className={`${!wallet.initialized ? "tooltip" : ""} w-3/6`}
    >
      <button
        onClick={onClick}
        className={`btn ${
          loading ? "loading" : ""
        } capitalize ${className} w-full text-lg`}
        disabled={!wallet.initialized}
        style={{ color: "white" }}
      >
        {!loading && text}
      </button>
    </div>
  )
}

export default Button
