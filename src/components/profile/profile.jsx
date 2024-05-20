import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
/*import { useDispatch } from "react-redux";
import { setUser as setUserAction } from "../../store/reducer";*/
import Cookies from "js-cookie";
import EditProfile from "./edit";
import { useSetAtom, useAtom } from "jotai";
import { userAtom, setUserAtom } from "../../atoms/userAtoms.js";

export default function Profile() {
  /*  const dispatch = useDispatch();*/
  const [user] = useAtom(userAtom);
  const setUser = useSetAtom(setUserAtom);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await fetch("http://localhost:1337/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        /*dispatch(setUserAction(data));*/
        setUser(data);
      } catch (error) {
        setError("Something went wrong");
      }
    };
    fetchProfile();
  }, [/*dispatch*/ setUser, navigate]);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <section className="profile-container">
      <h1>Profile</h1>
      <h2>Username : {user.username}</h2>
      <p>Email : {user.email}</p>
      <p>description : {user.description}</p>
      {error && <div>{error}</div>}

      <button onClick={toggleEdit}>Edit</button>
      {isEditing && <EditProfile onSave={() => setIsEditing(false)} />}
    </section>
  );
}
