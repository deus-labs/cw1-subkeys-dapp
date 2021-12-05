interface InputProps {
  type?: string
  placeholder: string
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  className?: string
  label?: string
}

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange = () => {},
  className = "",
  onKeyPress = () => {},
  label = "",
}: InputProps): JSX.Element => {
  return (
    <>
      {label !== "" && (
        <label className="label">
          <span className="label-text text-deus-text font-bold">{label}</span>
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered bg-white text-deus-dark font-bold ${className}`}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </>
  )
}

export default Input
