import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { clearUser as clearUserAction } from "../../store/reducer";
import { persistor } from "../../store/store";

export default function Logout() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(clearUserAction());
    persistor.purge();
    window.location.reload();
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
