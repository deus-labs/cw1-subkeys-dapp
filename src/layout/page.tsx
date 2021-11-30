import Sidebar from "src/components/Sidebar"

const PageLayout = ({ children }: any): JSX.Element => {
  return (
    <div className="flex flex-col max-h-screen h-screen">
      <div className="flex-grow">
        <Sidebar content={children} />
      </div>
    </div>
  )
}

export default PageLayout
