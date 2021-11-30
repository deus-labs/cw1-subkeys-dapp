import { useState, useEffect, useCallback } from "react"
import { useHistory } from "react-router"
import { operationPath } from "src/routes"
import { loadKeplrWallet } from "src/services/sdk"
import { useWallet } from "src/services/wallet"
import { errorToast } from "src/utils"

const Navbar = (): JSX.Element => {
  const { initialized, clear, init } = useWallet()
  const history = useHistory()

  const [initializing, setInitializing] = useState<boolean>(false)

  const disconnect = () => {
    localStorage.clear()
    clear()
  }

  const connect = useCallback(() => {
    setInitializing(true)
    loadKeplrWallet()
      .then((signer) => {
        setInitializing(false)
        init(signer)
      })
      .catch((err) => {
        setInitializing(false)
        errorToast(err.message)
      })
  }, [init])

  const buttonOnClick = () => {
    if (initialized) disconnect()
    else connect()
  }

  useEffect(() => {
    const item = localStorage.getItem("wallet_address")

    if (item) connect()
    else setInitializing(false)
  }, [initialized, connect])

  useEffect(() => {
    if (!initialized) return

    history.push(operationPath)

    setInitializing(false)
  }, [initialized, history])

  return (
    <div className="navbar shadow-lg bg-neutral text-neutral-content">
      <div className="flex-1 px-2 mx-2">
        <span className="text-lg font-bold">cw1-subkeys contract</span>
      </div>
      <div className="flex-none">
        <button
          className={`btn ${initialized ? "btn-error" : "btn-info"} ${
            initializing ? "loading" : ""
          }`}
          onClick={buttonOnClick}
        >
          {initializing ? "" : initialized ? "Disconnect" : "Connect"} Wallet
        </button>
      </div>
    </div>
  )
}

export default Navbar
