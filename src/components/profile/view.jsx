import { useSelector } from "react-redux";

export default function ProfileView() {
  const user = useSelector((state) => state.profile.user);
  return (
    <>
      <h2>Username : {user.username}</h2>
      <p>Email : {user.email}</p>
      <p>description : {user.description}</p>
    </>
  );
}
