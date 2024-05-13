import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">GoodHoliDays.com</Link>
        </span>
        <span className="flex space-x-2">
          <Link
            to="/SignIn"
            className="flex items-center bg-white px-3 font-bold hover:bg-gray-100 hover:text-green"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Header;
