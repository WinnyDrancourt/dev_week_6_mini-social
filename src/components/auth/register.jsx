import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const errorRef = useRef();

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [pwd2, setPwd2] = useState("");
  const [validPwd2, setValidPwd2] = useState(false);
  const [pwd2Focus, setPwd2Focus] = useState(false);

  const [mail, setMail] = useState("");
  const [validMail, setValidMail] = useState(false);
  const [mailFocus, setMailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidUser(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const result2 = pwd === pwd2;
    setValidPwd2(result2);
  }, [pwd, pwd2]);

  useEffect(() => {
    const result = MAIL_REGEX.test(mail);
    setValidMail(result);
  }, [mail]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, pwd2]);

  const handleSave = async () => {
    try {
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
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const { jwt, user: registeredUser } = data;
      dispatch(setUserAction(registeredUser));
      Cookies.set("token", jwt, { expires: 7 });
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <p ref={errorRef} className={errMsg ? "errmsg" : "offscreen"}>
        {errMsg}
      </p>
      <h2>Register</h2>
      <form>
        <label htmlFor="user">
          User :
          <span className={validUser ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validUser || !user ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="user"
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          required
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p
          id="uidnote"
          className={
            userFocus && user && !validUser ? "instruction" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          3 to 16 characters.
          <br />
          Must begin with a letter.
          <br />
          Only letters, numbers, and underscores.
        </p>

        <label htmlFor="password">
          Password :
          <span className={validPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPwd || !pwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
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

        <label htmlFor="password2">
          Password :
          <span className={validPwd2 && pwd2 ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPwd2 || !pwd2 ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="password2"
          onChange={(e) => setPwd2(e.target.value)}
          required
          onFocus={() => setPwd2Focus(true)}
          onBlur={() => setPwd2Focus(false)}
        />
        <p
          id="pwd2note"
          className={pwd2Focus && !validPwd2 ? "instruction" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match password.
        </p>

        <label htmlFor="mail">
          E-Mail :
          <span className={validMail ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validMail || !mail ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="mail"
          autoComplete="off"
          onChange={(e) => setMail(e.target.value)}
          required
          onFocus={() => setMailFocus(true)}
          onBlur={() => setMailFocus(false)}
        />
        <p
          id="mailnote"
          className={
            mailFocus && mail && !validMail ? "instruction" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must be a valid email address.
        </p>
        <button
          onClick={handleSave}
          disabled={!validUser || !validPwd || !validPwd2 || !validMail}
        >
          Sign Up
        </button>
      </form>
    </section>
  );
}
