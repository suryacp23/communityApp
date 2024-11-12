import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="flex h-[100vh] w-full  justify-center items-center">
      <div
        className=" text-white flex flex-col h-96 w-72 shadow-gray-700
       hover:shadow-gray-500 shadow-md items-center ">
        <h4 className="m-4">LOGIN</h4>
        <form action="" className=" flex flex-col items-center">
          <input
            className=" pl-2 w-52 h-8 mt-8 rounded-sm  bg-gray-600"
            type="text"
            placeholder="Username"
            required
          />
          <input
            className="pl-2 mt-8 h-8 w-52 rounded-sm bg-gray-600 "
            type="password"
            placeholder="Password"
            required
          />
          <button className="bg-blue-500 shadow-lg  hover:shadow-blue-500/40  w-20 h-7 m-8 flex justify-center rounded-3xl">
            login
          </button>
        </form>
        <div className="flex ">
          <p className="text-sm m-1 ">Don't have an account?</p>
          <Link className="text-blue-400" to={`/signup`}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
