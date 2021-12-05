interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  label?: string
  checked: boolean
}

const Checkbox = ({
  onChange = () => {},
  className = "",
  label = "",
  checked = false,
}: InputProps): JSX.Element => {
  return (
    <div className="flex items-center bg-gray-700 p-2 rounded-lg bg-opacity-40 px-3">
      {label !== "" && (
        <label className="label mr-3">
          <span className="label-text text-deus-text font-bold">{label}</span>
        </label>
      )}
      <input
        type="checkbox"
        className={`checkbox border-deus-text ${className}`}
        onChange={onChange}
        checked={checked}
      />
    </div>
  )
}

export default Checkbox
