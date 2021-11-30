const PageLayout = ({ children }: any): JSX.Element => {
  return (
    <div className="flex h-screen p-20 bg-gray-200">
      <div className="bg-white w-screen rounded-lg shadow-2xl flex items-center justify-center">
        <div className="">{children}</div>
      </div>
    </div>
  )
}

export default PageLayout
