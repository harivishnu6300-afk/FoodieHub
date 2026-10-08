import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaFacebookF,
  FaInstagram,
  FaTwitter
} from "react-icons/fa";

function Login({ setLoggedInUser }) {
  const navigate = useNavigate();

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const loginValue = emailOrPhone.trim();

    if (!loginValue) {
      setError("Please enter your email or phone number.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://foodiehub-backend-uuax.onrender.com/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            emailOrPhone: loginValue,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const loggedUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone || "",
        role: data.user.role || "customer"
      };

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(loggedUser)
      );

      if (setLoggedInUser) {
        setLoggedInUser(loggedUser);
      }

      setMessage(`Welcome back, ${loggedUser.name}!`);

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 700);
    } catch (error) {
      setError(
        error.message || "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue to FoodieHub
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600">
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email or Phone
            </label>

            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="Enter email or phone"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-20 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-orange-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-orange-500 hover:text-orange-600"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-orange-500 py-3.5 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-7">
          <div className="h-px flex-1 bg-gray-200"></div>
          <span className="text-sm text-gray-400">
            Or continue with
          </span>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-red-500 hover:scale-105 transition"
          >
            <FaGoogle />
          </button>

          <button
            type="button"
            className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-blue-600 hover:scale-105 transition"
          >
            <FaFacebookF />
          </button>

          <button
            type="button"
            className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-pink-500 hover:scale-105 transition"
          >
            <FaInstagram />
          </button>

          <button
            type="button"
            className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-sky-500 hover:scale-105 transition"
          >
            <FaTwitter />
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-7">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-orange-500 hover:text-orange-600"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;


