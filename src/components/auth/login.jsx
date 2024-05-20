import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
/*import { useDispatch } from "react-redux";
import { setUser as setUserAction } from "../../store/reducer";*/
import { useSetAtom } from "jotai";
import { setUserAtom } from "../../atoms/userAtoms.js";

export default function Login() {
  /*const dispatch = useDispatch();*/
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");

  const setUser = useSetAtom(setUserAtom);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: credentials.identifier,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        throw new error("Something went wrong");
      }

      const data = await response.json();
      const { jwt, user: loggedInUser } = data;
      /*dispatch(setUserAction(loggedInUser));*/
      setUser(loggedInUser);
      Cookies.set("token", jwt, { expires: 7 });
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      navigate("/profile");
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div className="form-group">
        <input
          type="text"
          name="identifier"
          placeholder="Username or Email"
          value={credentials.identifier}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
      </div>
      <p>{error}</p>
    </div>
  );
}
