import { FaHamburger } from "react-icons/fa"

const Navbar = (): JSX.Element => {
  return (
    <div className="p-4 items-center bg-neutral text-neutral-content flex justify-end lg:hidden">
      <label htmlFor="my-drawer">
        <FaHamburger size={24} className="cursor-pointer" />
      </label>
    </div>
  )
}

export default Navbar
