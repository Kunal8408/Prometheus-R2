import React, { useState, useEffect } from "react";
import axios from "axios";

import AuthForm from "./components/authform";
import WelcomeCard from "./components/welcomeCard";

const API = process.env.REACT_APP_API_URL || "https://backend-8z1j.onrender.com";

function App() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [user, setUser]   = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg]     = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // ⏳ Auto‑dismiss flash messages after 4 s
  useEffect(() => {
    if (!errorMsg && !successMsg) return;
    const t = setTimeout(() => {
      setErrorMsg("");
      setSuccessMsg("");
    }, 4000);
    return () => clearTimeout(t);
  }, [errorMsg, successMsg]);

  // 🔄 Sync inputs with local state
  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // 🚀 Login / Signup
  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMsg("");               // clear any stale error
    const endpoint = isLogin ? `${API}/api/login` : `${API}/api/signup`;

    try {
      const res = await axios.post(endpoint, form);
      if (res.data?.username) {
        setUser({ ...res.data, password: form.password }); // keep pwd only locally
        setSuccessMsg(isLogin ? "Login successful!" : "Signup successful!");
      } else {
        setErrorMsg(res.data?.error || "Something went wrong. Try again.");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Server error. Please try again.");
    }
  };

  // 🔒 Logout
  const handleLogout = () => {
    setUser(null);
    setForm({ username: "", password: "" });
    setSuccessMsg("Logged out successfully.");
  };

  // 🔀 Switch between Login / Signup modes
  const toggleMode = () => {
    setIsLogin(prev => !prev);
    setForm({ username: "", password: "" });
    setErrorMsg("");
    setSuccessMsg("");
  };

  // ──────────────────────────────────────────────────────
  return user ? (
    <WelcomeCard
      user={user}
      onLogout={handleLogout}
      successMsg={successMsg}
    />
  ) : (
    <AuthForm
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isLogin={isLogin}
      errorMsg={errorMsg}
      successMsg={successMsg}
      onToggleMode={toggleMode}
    />
  );
}

export default App;
