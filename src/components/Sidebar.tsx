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
import { useLocation } from "react-router-dom"

interface SidebarProps {
  content: JSX.Element
}

const Sidebar = ({ content }: SidebarProps): JSX.Element => {
  const { initialized } = useWallet()
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
              className={`capitalize font-bold text-xl ${
                location.pathname === `/${instantiatePath}`
                  ? "bg-deus-purple"
                  : ""
              }`}
              to={`/${instantiatePath}`}
            >
              <FaPlay className="mr-4" />
              {instantiatePath}
            </Link>
          </li>
          <li>
            <Link
              className={`capitalize font-bold text-xl ${
                location.pathname === `/${executePath}` ? "bg-deus-purple" : ""
              }`}
              to={`/${executePath}`}
            >
              <FaMicrochip className="mr-4" />
              {executePath}
            </Link>
          </li>
          <li>
            <Link
              className={`capitalize font-bold text-xl ${
                location.pathname === `/${queryPath}` ? "bg-deus-purple" : ""
              }`}
              to={`/${queryPath}`}
            >
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
              className="flex justify-center mb-2"
              style={{ backgroundColor: "transparent" }}
            >
              <div className="text-l font-bold mr-2">Powered by </div>
              <img src="/cosmwasm-logo.svg" alt="cosmwasm" className="h-8" />
            </a>
            <div className="mb-3 flex items-center justify-center text-l font-bold">
              Made with{" "}
              <img
                src="/nyan-love.png"
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
