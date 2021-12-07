import Sidebar from "src/components/Sidebar"

const PageLayout = ({ children, network, setNetwork }: any): JSX.Element => {
  return (
    <div className="flex flex-col max-h-screen h-screen bg-deus-dark">
      <div className="flex-grow">
        <Sidebar content={children} network={network} setNetwork={setNetwork} />
      </div>
    </div>
  )
}

export default PageLayout
