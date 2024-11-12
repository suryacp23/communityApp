import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div>
      <form action="">
        <input type="text" />
        <input type="password" />
        <button className=" bg-black p-1 w-32 h-8 rounded-md  text-white">Sign Up</button>
      </form>
      <div className="">
        <Link to={`/login`}>Log In</Link>
      </div>
    </div>
  );
};

export default Signup;
