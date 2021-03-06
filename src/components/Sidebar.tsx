import { useCallback } from "react"
import {
  instantiatePath,
  executePath,
  queryPath,
  contractPath,
} from "src/routes"
import { getConfig } from "src/config"
import { useKeplr, loadKeplrWallet } from "src/services/keplr"
import { useWallet } from "src/services/wallet"
import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import { FaPlay, FaMicrochip, FaSearch, FaInfoCircle } from "react-icons/fa"
import { useLocation } from "react-router-dom"
import Dropdown from "./Dropdown"
import { formatRoute } from "src/utils"
interface SidebarProps {
  content: JSX.Element
}

const Sidebar = ({ content }: SidebarProps): JSX.Element => {
  const { initialized, network, setNetwork, updateSigner } = useWallet()
  const keplr = useKeplr()
  const location = useLocation()

  const disconnect = () => {
    keplr.disconnect()
  }

  const connect = useCallback(() => {
    keplr.connect()
  }, [keplr])

  const buttonOnClick = () => {
    if (initialized) disconnect()
    else connect()
  }

  const networkOnChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNetwork(e.target.value)
    if (initialized) {
      const signer = await loadKeplrWallet(getConfig(e.target.value))
      updateSigner(signer)
    }
  }

  return (
    <div className="shadow bg-deus-dark drawer drawer-mobile h-full w-screen">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col drawer-content">
        <Navbar />
        {content}
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-deus-gray text-deus-text">
          <li>
            <Link
              className="capitalize font-bold text-xl"
              to={`/${network}/${formatRoute(contractPath)}`}
            >
              <FaInfoCircle className="mr-4" />
              {contractPath}
            </Link>
          </li>
          <li className="mb-2">
            <Link
              className="capitalize font-bold text-xl"
              to={`/${network}/${instantiatePath}`}
              style={{
                backgroundColor:
                  location.pathname === `/${instantiatePath}`
                    ? "#6715FF"
                    : "transparent",
              }}
            >
              <FaMicrochip className="mr-4" />
              {instantiatePath}
            </Link>
          </li>
          <li className="mb-2">
            <Link
              className="capitalize font-bold text-xl"
              to={`/${network}/${executePath}`}
              style={{
                backgroundColor:
                  location.pathname === `/${executePath}`
                    ? "#6715FF"
                    : "transparent",
              }}
            >
              <FaPlay className="mr-4" />
              {executePath}
            </Link>
          </li>
          <li>
            <Link
              className="capitalize font-bold text-xl"
              to={`/${network}/${queryPath}`}
              style={{
                backgroundColor:
                  location.pathname === `/${queryPath}`
                    ? "#6715FF"
                    : "transparent",
              }}
            >
              <FaSearch className="mr-4" />
              {queryPath}
            </Link>
          </li>
          <li className="h-full justify-end pb-4">
            <Dropdown
              value={network}
              onChange={networkOnChange}
              options={["Juno Mainnet", "Juno Uni Testnet"]}
              label="Select network"
              className="mb-3"
              isColumn
            />
            <a
              href="https://deuslabs.fi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center"
              style={{ backgroundColor: "transparent" }}
            >
              <div className="text-l font-bold">Made by </div>
              <img src="./deus-logo.png" alt="deus labs" className="h-10" />
            </a>
            <a
              href="https://cosmwasm.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center mb-2"
              style={{ backgroundColor: "transparent" }}
            >
              <div className="text-l font-bold mr-2">Powered by </div>
              <img src="./cosmwasm-logo.svg" alt="cosmwasm" className="h-8" />
            </a>
            <div className="mb-3 flex items-center justify-center text-l font-bold">
              Made with{" "}
              <img
                src="./nyan-love.png"
                alt="love"
                className="h-10 ml-1 animate-bounce"
              />
            </div>
            <button
              onClick={buttonOnClick}
              className={`btn bg-gradient-to-r from-deus-pink to-deus-purple
                hover:opacity-80 mx-5 capitalize text-xl ${
                  keplr.initializing ? "loading" : ""
                }`}
            >
              {keplr.initializing
                ? ""
                : `${initialized ? "Disconnect" : "Connect"} Wallet`}
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
