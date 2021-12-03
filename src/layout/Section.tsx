const Section = ({ children }: any): JSX.Element => {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div className="text-deus-text h-5/6 w-5/6 p-10 bg-deus-gray rounded-xl overflow-auto">
        {children}
      </div>
    </div>
  )
}

export default Section
