import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "../auth/logout";

export default function Navbar() {
  const user = useSelector((state) => state.profile.user);
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        {user.id ? (
          <>
            <Link to="/profile">{user.username}</Link>
            <Logout />
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </>
  );
}
