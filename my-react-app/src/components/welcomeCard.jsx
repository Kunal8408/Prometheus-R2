import React from "react";

function WelcomeCard({ user, onLogout, successMsg }) {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-300 to-green-500">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        {successMsg && (
          <div className="mb-4 text-green-600 font-medium bg-green-100 p-2 rounded">
            {successMsg}
          </div>
        )}

        <h2 className="text-3xl font-bold text-green-700 mb-4">
          Welcome, {user.username}!
        </h2>

        <p className="text-gray-700">
          <strong>Username:</strong> {user.username}
        </p>
        <p className="text-gray-700 mb-6">
          <strong>Password:</strong> {user.password}
        </p>

        <button
          onClick={onLogout}
          className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default WelcomeCard;
