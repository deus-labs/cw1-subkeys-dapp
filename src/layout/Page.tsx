import { useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import Sidebar from "src/components/Sidebar"
import { contractPath } from "src/routes"
import { useWallet } from "src/services/wallet"
import { formatRoute } from "src/utils"

const PageLayout = ({ children }: any): JSX.Element => {
  const { network } = useWallet()
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    let path =
      location.pathname.split("/")[location.pathname.split("/").length - 1]
    if (path === "") path = formatRoute(contractPath)
    history.replace(`/${network}/${path}`)
  }, [network])

  return (
    <div className="flex flex-col max-h-screen h-screen bg-deus-dark">
      <div className="flex-grow">
        <Sidebar content={children} />
      </div>
    </div>
  )
}

export default PageLayout
