import { useNavigate } from "react-router-dom";

export function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 text-gray-800">
      <div className="max-w-lg w-full p-8 bg-white rounded-2xl shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to TrustProfile </h1>
        <p className="text-lg mb-6">
          Your trusted platform for testing and verification.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
