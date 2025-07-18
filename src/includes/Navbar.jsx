import { MdMenu } from "react-icons/md";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="h-16 flex items-center px-6 bg-gray-800 text-white">
      <button onClick={toggleSidebar}>
        <MdMenu size={20}/>
      </button>
      <h1 className="ml-4 font-bold text-lg">Dashboard</h1>
    </div>
  );
};

export default Navbar;
