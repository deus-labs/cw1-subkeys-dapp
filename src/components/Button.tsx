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
    <button
      onClick={onClick}
      className={`btn ${
        loading ? "loading" : ""
      } capitalize ${className} w-3/6 text-lg`}
      disabled={!wallet.initialized}
      style={{ color: "white" }}
    >
      {!loading && text}
    </button>
  )
}

export default Button
