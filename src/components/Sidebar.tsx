import { useCallback } from "react"
import {
  instantiatePath,
  executePath,
  queryPath,
  // contractPath,
} from "src/routes"
import { useKeplr } from "src/services/keplr"
import { useWallet } from "src/services/wallet"
import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import { FaPlay, FaMicrochip, FaSolarPanel /* FaBook */ } from "react-icons/fa"

interface SidebarProps {
  content: JSX.Element
}

const Sidebar = ({ content }: SidebarProps): JSX.Element => {
  const { initialized } = useWallet()
  const keplr = useKeplr()

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
          {/* <li>
            <Link
              className="capitalize font-bold text-xl"
              to={`/${contractPath}`}
            >
              <FaBook className="mr-4" />
              {contractPath}
            </Link>
          </li> */}
          <li>
            <Link
              className="capitalize font-bold text-xl"
              to={`/${instantiatePath}`}
            >
              <FaPlay className="mr-4" />
              {instantiatePath}
            </Link>
          </li>
          <li>
            <Link
              className="capitalize font-bold text-xl"
              to={`/${executePath}`}
            >
              <FaMicrochip className="mr-4" />
              {executePath}
            </Link>
          </li>
          <li>
            <Link className="capitalize font-bold text-xl" to={`/${queryPath}`}>
              <FaSolarPanel className="mr-4" />
              {queryPath}
            </Link>
          </li>
          <li className="h-full justify-end pb-4">
            <a
              href="https://deuslabs.fi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center"
              style={{ backgroundColor: "transparent" }}
            >
              <div className="text-l font-bold">Made by </div>
              <img src="/deus-logo.png" alt="deus labs" className="h-10" />
            </a>
            <a
              href="https://cosmwasm.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center mb-3"
              style={{ backgroundColor: "transparent" }}
            >
              <div className="text-l font-bold mr-2">Powered by </div>
              <img src="/cosmwasm-logo.svg" alt="deus labs" className="h-8" />
            </a>
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
