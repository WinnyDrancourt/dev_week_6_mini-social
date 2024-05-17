import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { setUser as setUserAction } from "../../store/reducer";
import ProfileView from "./view";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.profile.user);
  const [profile, setProfile] = useState({
    username: user.username,
    description: user.description || "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (user.id) {
      setProfile({
        username: user.username,
        description: user.description || "",
      });
    }
  }, [user]);

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
        setProfile({
          username: data.username,
          description: data.description || "",
        });
      } catch (error) {
        setError("Something went wrong");
      }
    };
    fetchProfile();
  }, [dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `http://localhost:1337/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: profile.username,
            description: profile.description,
          }),
        },
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const updatedProfile = await response.json();
      dispatch(setUserAction(updatedProfile));
      alert("Profile updated successfully");
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      {error && <div>{error}</div>}
      <div className="form-group">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={profile.username}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={profile.description}
          onChange={handleChange}
        />
        <button onClick={handleSave}>Save</button>
      </div>
      <ProfileView />
    </div>
  );
}
