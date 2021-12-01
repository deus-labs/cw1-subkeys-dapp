import { useCallback } from "react"
import {
  operationPath,
  instantiatePath,
  executePath,
  queryPath,
} from "src/routes"
import { useKeplr } from "src/services/keplr"
import { useWallet } from "src/services/wallet"
import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import { FaPlay, FaMicrochip, FaSolarPanel, FaCentos } from "react-icons/fa"

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
          <li>
            <span className="font-bold">CW1-SUBKEYS</span>
          </li>
          <li>
            <Link className="capitalize font-bold" to={`/${operationPath}`}>
              <FaCentos className="mr-4" />
              {operationPath}
            </Link>
          </li>
          <li>
            <Link className="capitalize font-bold" to={`/${instantiatePath}`}>
              <FaPlay className="mr-4" />
              {instantiatePath}
            </Link>
          </li>
          <li>
            <Link className="capitalize font-bold" to={`/${executePath}`}>
              <FaMicrochip className="mr-4" />
              {executePath}
            </Link>
          </li>
          <li>
            <Link className="capitalize font-bold" to={`/${queryPath}`}>
              <FaSolarPanel className="mr-4" />
              {queryPath}
            </Link>
          </li>
          <li className="h-full justify-end pb-4">
            <span className="flex justify-center">
              <a
                href="https://deuslabs.fi"
                className="hover:text-deus-pink-soft"
                target="_blank"
                rel="noopener noreferrer"
              >
                Made by deus labs
              </a>
            </span>
            <button
              onClick={buttonOnClick}
              className={`btn bg-gradient-to-r from-deus-pink to-deus-purple hover:opacity-80 mx-5 ${
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
