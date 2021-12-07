interface DropdownProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  value: string
  options: string[]
  label?: string
  className?: string
  width?: string
}

const Dropdown = ({
  onChange,
  value,
  options,
  label = "",
  className = "",
  width = "w-full",
}: DropdownProps): JSX.Element => {
  return (
    <div className="flex items-center w-full justify-center">
      {label !== "" && (
        <label className="label mr-3">
          <span className="label-text text-deus-text font-bold">{label}</span>
        </label>
      )}
      <select
        className={`select select-bordered max-w-xs bg-gray-300 text-deus-gray ${width} ${className}`}
        onChange={onChange}
        value={value}
      >
        {options.map((option, idx) => {
          return (
            <option value={option.toLowerCase().split(" ").join("-")} key={idx}>
              {option}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Dropdown
