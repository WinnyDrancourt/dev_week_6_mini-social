import { Link } from "react-router-dom";
import Logout from "../auth/logout";
/*import { useSelector } from "react-redux";*/
import { useAtom } from "jotai";
import { userAtom } from "../../atoms/userAtoms.js";

export default function Navbar() {
  /*  const user = useSelector((state) => state.profile.user);*/
  const user = useAtom(userAtom);
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        {user[0].id ? (
          <>
            <Link to="/profile">{user[0].username}</Link>
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
