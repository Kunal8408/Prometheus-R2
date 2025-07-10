import React from "react";

function AuthForm({
  form,
  onChange,
  onSubmit,
  isLogin,
  errorMsg,
  successMsg,
  onToggleMode,
}) {
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
        {successMsg && (
          <div className="mb-4 text-green-600 text-center font-medium bg-green-100 p-2 rounded">
            {successMsg}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={onChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-500 py-2 rounded-md font-semibold hover:bg-green-600 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-green-700">
          <button onClick={onToggleMode} className="hover:underline">
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
