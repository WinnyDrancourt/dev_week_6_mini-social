import { useSelector } from "react-redux";

export default function ProfileView() {
  const user = useSelector((state) => state.profile.user);
  return (
    <>
      <h1>{user.username}</h1>
      <p>Desc : {user.description}</p>
      <p>Email : {user.email}</p>
    </>
  );
}
