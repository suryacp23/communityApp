import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <nav>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </nav>
    </div>
  );
};

export default Home;
