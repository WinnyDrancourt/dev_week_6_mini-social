/*import { useSelector } from "react-redux";*/
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms/userAtoms.js";

export default function ProfileView() {
  /*  const user = useSelector((state) => state.profile.user);*/
  const [profile] = useAtom(userAtom);
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (userId == profile.id) {
    navigate("/profile");
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await fetch(
          `http://localhost:1337/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
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
    fetchUser();
  }, [userId, setUser, navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h2>Username : {user.username}</h2>
      <p>Email : {user.email}</p>
      <p>description : {user.description}</p>
    </>
  );
}
