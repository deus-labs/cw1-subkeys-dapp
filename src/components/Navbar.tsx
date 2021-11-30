import { FaHamburger } from "react-icons/fa"

const Navbar = (): JSX.Element => {
  return (
    <div className="p-4 items-center bg-deus-dark text-neutral-content flex justify-end lg:hidden">
      <label htmlFor="sidebar">
        <FaHamburger size={24} className="cursor-pointer text-deus-red" />
      </label>
    </div>
  )
}

export default Navbar
