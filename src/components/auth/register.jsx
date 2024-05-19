import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { setUser as setUserAction } from "../../store/reducer";

const USER_REGEX = /^[a-zA-Z0-9_]{3,16}$/;
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
const MAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Register() {
  const dispatch = useDispatch();
  const errorRef = useRef();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [validMail, setValidMail] = useState(false);
  const [mailFocus, setMailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = USER_REGEX.test(user.username);
    setValidUser(result);
  }, [user.username]);

  useEffect(() => {
    const result = PWD_REGEX.test(user.password);
    setValidPwd(result);
  }, [user.password]);

  useEffect(() => {
    const result = MAIL_REGEX.test(user.email);
    setValidMail(result);
  }, [user.email]);

  useEffect(() => {
    setErrMsg("");
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      console.log("user", user);
      const response = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.username,
            email: user.email, // Email valid
            password: user.password, // Min 6 characters
          }),
        },
      );
      console.log("response", response);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const { jwt, user: registeredUser } = data;
      dispatch(setUserAction(registeredUser));
      Cookies.set("token", jwt, { expires: 7 });
      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {success ? (
        <section className="success-section">
          <h2>success !</h2>
          <p>Registration successful!</p>
          <Link to="/profile">Profile</Link>
        </section>
      ) : (
        <section>
          <p ref={errorRef} className={errMsg ? "errmsg" : "offscreen"}>
            {errMsg}
          </p>
          <h2>Register</h2>
          <label htmlFor="user">
            User :
            <span className={validUser ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validUser || !user.username ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="text"
            name="username"
            autoComplete="off"
            value={user.username}
            onChange={handleChange}
            required
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="uidnote"
            className={
              userFocus && user.username && !validUser
                ? "instruction"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            3 to 16 characters.
            <br />
            Must begin with a letter.
            <br />
            Only letters, numbers, and underscores.
          </p>

          <label htmlFor="email">
            E-Mail :
            <span className={validMail ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validMail || !user.email ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="text"
            name="email"
            value={user.email}
            autoComplete="off"
            onChange={handleChange}
            required
            onFocus={() => setMailFocus(true)}
            onBlur={() => setMailFocus(false)}
          />
          <p
            id="mailnote"
            className={
              mailFocus && user.email && !validMail
                ? "instruction"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must be a valid email address.
          </p>

          <label htmlFor="password">
            Password :
            <span className={validPwd ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validPwd || !user.password ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instruction" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Min 6 characters.
            <br />
            Must include uppercase, lowercase, and number.
          </p>
          <button
            onClick={handleSave}
            disabled={!validUser || !validPwd || !validMail}
          >
            Sign Up
          </button>
        </section>
      )}
    </>
  );
}
