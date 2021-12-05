import React from "react"

interface FormProps {
  className?: string
  children: React.ReactNode
}

const Action = ({ className = "", children }: FormProps): JSX.Element => {
  return (
    <div className={`${className}`}>
      <br />
      {children}
    </div>
  )
}

export default Action
