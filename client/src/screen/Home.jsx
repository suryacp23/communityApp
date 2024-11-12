import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <nav className=" flex justify-end m-3 space-x-2 text-slate-100">
        <Link
          className="flex justify-center items-center p-2 w-20 rounded-md bg-blue-800 hover:bg-blue-600 "
          to="/signup">
          Sign Up
        </Link>
        <Link
          className=" flex justify-center items-center p-2 w-20 rounded-md bg-blue-800 hover:bg-blue-600 "
          to="/login">
          Log In
        </Link>
      </nav>
    </div>
  );
};

export default Home;
