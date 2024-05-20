import { useState } from "react";
import Cookies from "js-cookie";
/*import { useDispatch, useSelector } from "react-redux";
import { setUser as setUserAction } from "../../store/reducer";*/
import { useAtom, useSetAtom } from "jotai";
import { userAtom, setUserAtom } from "../../atoms/userAtoms.js";

export default function EditProfile({ onSave }) {
  /*const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user);*/
  const user = useAtom(userAtom);
  const setUser = useSetAtom(setUserAtom);
  const [profile, setProfile] = useState({
    username: user[0].username,
    description: user[0].description || "",
  });
  const [error, setError] = useState("");

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
        `http://localhost:1337/api/users/${user[0].id}`,
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
      /*dispatch(setUserAction(updatedProfile));*/
      setUser(updatedProfile);
      alert("Profile updated successfully");
      onSave();
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="edit-container">
      <h2>Edit</h2>
      {error && <div>{error}</div>}
      <div>
        <label>Username : </label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={profile.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description : </label>
        <textarea
          name="description"
          placeholder="Description"
          value={profile.description}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
