import Cookies from "js-cookie";
/*import { persistor } from "../../store/store";
import { clearUser as clearUserAction } from "../../store/reducer";
import { useDispatch } from "react-redux";*/
import { useSetAtom } from "jotai";
import { clearUserAtom } from "../../atoms/userAtoms.js";

export default function Logout() {
  /*  const dispatch = useDispatch();*/
  const clearUser = useSetAtom(clearUserAtom);

  const handleLogout = () => {
    Cookies.remove("token");
    clearUser();
    /*    dispatch(clearUserAction());
    persistor.purge();*/
    window.location.reload();
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
