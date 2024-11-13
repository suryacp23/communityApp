import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
const Signup = () => {
  const { user, login, logout, loading, signup } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = (e) => {
    e.preventDefault();
    console.log("checkedout");
    signup(username, email, password);
  };
  return (
    <div>
      <form action="">
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button
          className=" bg-black p-1 w-32 h-8 rounded-md  text-white"
          onClick={handleSignup}
        >
          {loading ? "loading" : "sign up"}
        </button>
      </form>
      <div className="">
        <Link to={`/login`}>Log In</Link>
      </div>
    </div>
  );
};

export default Signup;
