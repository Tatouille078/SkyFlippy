import { IoMenu } from "react-icons/io5";
import { StateContextType, useStateContext } from "../context";
import Searchbar from "./Searchbar";

export type HeaderProps = {
  buttonRef: React.MutableRefObject<null>;
};

const Header: React.FC<HeaderProps> = ({ buttonRef }) => {
  const { toggleOpen }: StateContextType = useStateContext();

  return (
    <header className="header-fade z-10 text-white py-4 sticky top-0">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="flex items-center space-x-4">
            <button
              className="p-2 hover:bg-purple-700 bg-purple-500 rounded-2xl shadow-xl transition-colors duration-200 hidden md:block"
              onClick={toggleOpen}
              ref={buttonRef}
            >
              <IoMenu size={30} />
            </button>
            <h1 className="mb-2 text-xl py-2 md:text-4xl exo-2-normal">SkyFlippy</h1>
          </div>
          <Searchbar />
        </div>
      </div>
    </header>
  )
}

export default Header
