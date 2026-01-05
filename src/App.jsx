import { useState } from "react";
import Login from "./pages/Login";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return loggedIn ? (
    <SuperAdminDashboard />
  ) : (
    <Login onLogin={() => setLoggedIn(true)} />
  );
}
