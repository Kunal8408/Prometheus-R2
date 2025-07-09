import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (errorMsg || successMsg) {
      const timer = setTimeout(() => {
        setErrorMsg("");
        setSuccessMsg("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg, successMsg]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // Clear old error

    const endpoint = isLogin
      ? `${process.env.REACT_APP_API_URL}/api/login`
      : `${process.env.REACT_APP_API_URL}/api/signup`;

    try {
      const res = await axios.post(endpoint, form,{ withCredentials: true });
      if (res.data?.username) {
        setUser({ ...res.data, password: form.password });
        setSuccessMsg(isLogin ? "Login successful!" : "Signup successful!");
      } else {
        setErrorMsg(res.data?.error || "Something went wrong. Try again.");
      }
    } catch (err) {
      const msg =
        err.response?.data?.error || "Server error. Please try again.";
      setErrorMsg(msg);
      setSuccessMsg("");
    }
  };

  if (user) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-300 to-green-500">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-2">
            Welcome, {user.username}!
          </h2>
          <p className="text-gray-700">
          <strong>Username:</strong> {user.username}
        </p>
        <p className="text-gray-700">
          <strong>Password:</strong> {user.password}
        </p>
          <button
            onClick={() => {
              setUser(null);
              setSuccessMsg("Logged out successfully.");
            }}
            className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-300 to-green-500">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          {isLogin ? "Login to Your Account" : "Create a New Account"}
        </h2>
        {errorMsg && (
          <div className="mb-4 text-red-600 text-center font-medium bg-red-100 p-2 rounded">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 py-2 rounded-md font-semibold hover:bg-green-600 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-green-700">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setForm({ username: "", password: "" }); // Clear input
              setErrorMsg(""); // Clear error
              setSuccessMsg(""); // Clear success
            }}
            className="hover:underline"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default App;
