interface InputProps {
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className: string
}

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  className,
}: InputProps): JSX.Element => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`input input-bordered bg-white text-deus-dark font-bold ${className}`}
      value={value}
      onChange={onChange}
    />
  )
}

export default Input
