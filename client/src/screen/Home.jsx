import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <nav className=" flex-col text-right m-3 space-x-1 text-slate-100">
        <Link className="p-2 rounded-lg bg-gray-600 w-4" to="/signup">
          Sign Up
        </Link>
        <Link className=" p-2 pr-3 pl-3 rounded-lg bg-gray-600 " to="/login">
          Log In
        </Link>
      </nav>
    </div>
  );
};

export default Home;
