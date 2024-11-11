import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div>
      <form action="">
        <input type="text" />
        <input type="password" />
        <button>login</button>
      </form>
      <div className="">
        <Link to={`/signup`}>Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
