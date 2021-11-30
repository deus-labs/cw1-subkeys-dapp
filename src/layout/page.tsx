import Navbar from "src/components/Navbar"

const PageLayout = ({ children }: any): JSX.Element => {
  return (
    <div>
      <Navbar />
      {children}
      <div className="flex h-screen p-20 bg-gray-200">
        <div className="bg-white w-screen rounded-lg shadow-2xl flex items-center justify-center"></div>
      </div>
    </div>
  )
}

export default PageLayout
