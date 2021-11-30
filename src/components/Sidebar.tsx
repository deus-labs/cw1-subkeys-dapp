import { useCallback } from "react"
import {
  operationPath,
  instentiatePath,
  executePath,
  queryPath,
} from "src/routes"
import { useKeplr } from "src/services/keplr"
import { useWallet } from "src/services/wallet"
import { Link } from "react-router-dom"
import Navbar from "./Navbar"

interface SidebarProps {
  content: JSX.Element
}

const ITEMS = [operationPath, instentiatePath, executePath, queryPath]

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

  const renderList = (): JSX.Element[] => {
    return ITEMS.map((item) => {
      return (
        <li key={item}>
          <Link className="capitalize font-bold" to={`/${item}`}>
            {item}
          </Link>
        </li>
      )
    })
  }

  return (
    <div className="shadow bg-base-200 drawer drawer-mobile h-full w-screen">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col drawer-content">
        <Navbar />
        {content}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-48 border-r-2 border-gray-100 text-base-content">
          {renderList()}
          <li className="h-full justify-end">
            <button
              onClick={buttonOnClick}
              className={`btn btn-error mx-5 ${
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
