import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { setUser as setUserAction } from "../../store/reducer";
import ProfileView from "./view";
import EditProfile from "./edit";

export default function Profile() {
  const dispatch = useDispatch();
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
        dispatch(setUserAction(data));
      } catch (error) {
        setError("Something went wrong");
      }
    };
    fetchProfile();
  }, [dispatch, navigate]);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <section className="profile-container">
      <h1>Profile</h1>
      <ProfileView />
      {error && <div>{error}</div>}
      <button onClick={toggleEdit}>Edit</button>
      {isEditing && <EditProfile onSave={() => setIsEditing(false)} />}
    </section>
  );
}
