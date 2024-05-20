import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../auth/privateroute";
import Home from "../home/home";
import Login from "../auth/login";
import Register from "../auth/register";
import Profile from "../profile/profile";
import ProfileView from "../profile/view";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile/:userId" element={<ProfileView />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
