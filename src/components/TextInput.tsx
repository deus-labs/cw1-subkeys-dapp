interface InputProps {
  type?: string
  placeholder: string
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  className?: string
  label?: string
  width?: string
}

const TextInput = ({
  type = "text",
  placeholder,
  value,
  onChange = () => {},
  className = "",
  onKeyPress = () => {},
  label = "",
  width = "w-3/6",
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
        className={`input input-bordered bg-white text-deus-dark font-bold ${width} ${className}`}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </>
  )
}

export default TextInput
