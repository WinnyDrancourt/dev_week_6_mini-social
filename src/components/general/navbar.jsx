import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "../auth/logout";

export default function Navbar() {
  const user = useSelector((state) => state.profile.user);
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {user.id ? (
            <>
              <li>
                <div>{user.username}</div>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Logout />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
