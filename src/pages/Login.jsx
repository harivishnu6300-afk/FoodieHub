import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Normal Email/Password Login
  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (validUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(validUser));
      navigate("/");
    } else {
      setError("Invalid email or password ❌");
    }
  };

  // Social Login Redirect Handlers (Real OAuth URLs or simulated triggers)
  const handleSocialLogin = (platform) => {
    switch (platform) {
      case "google":
        window.location.href = "https://accounts.google.com";
        break;
      case "facebook":
        window.location.href = "https://www.facebook.com/login";
        break;
      case "instagram":
        window.location.href = "https://www.instagram.com/accounts/login/";
        break;
      case "twitter":
        window.location.href = "https://twitter.com/i/flow/login";
        break;
      default:
        break;
    }
  };

  return (
    <section
      className="
        min-h-screen
        bg-gray-100
        dark:bg-slate-950
        flex
        items-center
        justify-center
        py-12
        px-6
        transition
        duration-500
      "
    >
      <div
        className="
          max-w-md
          w-full
          bg-white
          dark:bg-slate-900
          rounded-3xl
          shadow-2xl
          p-8
          border
          border-gray-200
          dark:border-slate-800
        "
      >
        <h2
          className="
            text-3xl
            font-extrabold
            text-center
            text-gray-900
            dark:text-white
            mb-6
          "
        >
          Welcome Back 👋
        </h2>

        {error && (
          <div
            className="
              mb-4
              p-3
              bg-red-100
              text-red-600
              rounded-xl
              text-sm
              font-semibold
              text-center
            "
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              className="
                block
                text-sm
                font-semibold
                text-gray-700
                dark:text-gray-300
                mb-1
              "
            >
              Email / Phone
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-gray-300
                dark:border-slate-700
                bg-gray-50
                dark:bg-slate-800
                text-gray-900
                dark:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />
          </div>

          <div>
            <label
              className="
                block
                text-sm
                font-semibold
                text-gray-700
                dark:text-gray-300
                mb-1
              "
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-gray-300
                dark:border-slate-700
                bg-gray-50
                dark:bg-slate-800
                text-gray-900
                dark:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-orange-500
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full
              bg-orange-500
              hover:bg-orange-600
              text-white
              font-bold
              py-3
              rounded-xl
              transition
              shadow-lg
              shadow-orange-500/30
            "
          >
            Login 🚀
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300 dark:border-slate-700"></div>
          <span className="px-3 text-sm text-gray-500 dark:text-gray-400 font-medium">
            Or login with
          </span>
          <div className="flex-grow border-t border-gray-300 dark:border-slate-700"></div>
        </div>

        {/* Social Media Login Icons (Professional SVGs) */}
        <div className="flex justify-center gap-4">
          {/* Google */}
          <button
            onClick={() => handleSocialLogin("google")}
            className="
              flex items-center justify-center w-12 h-12
              rounded-full
              bg-gray-50
              dark:bg-slate-800
              border border-gray-200
              dark:border-slate-700
              hover:scale-105
              transition-all
              duration-300
              shadow-md
            "
            title="Login with Google"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.95H1.2v3.15C3.18 21.35 7.23 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.25c-.25-.72-.38-1.49-.38-2.25s.13-1.53.38-2.25V6.6H1.2C.43 8.15 0 9.92 0 12s.43 3.85 1.2 5.4l4.08-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.18 2.65 1.2 6.6l4.08 3.15c.95-2.84 3.6-4.95 6.72-4.95z"/>
            </svg>
          </button>

          {/* Facebook */}
          <button
            onClick={() => handleSocialLogin("facebook")}
            className="
              flex items-center justify-center w-12 h-12
              rounded-full
              bg-gray-50
              dark:bg-slate-800
              border border-gray-200
              dark:border-slate-700
              hover:scale-105
              transition-all
              duration-300
              shadow-md
            "
            title="Login with Facebook"
          >
            <svg className="w-5 h-5 fill-current text-blue-600" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>

          {/* Instagram */}
          <button
            onClick={() => handleSocialLogin("instagram")}
            className="
              flex items-center justify-center w-12 h-12
              rounded-full
              bg-gray-50
              dark:bg-slate-800
              border border-gray-200
              dark:border-slate-700
              hover:scale-105
              transition-all
              duration-300
              shadow-md
            "
            title="Login with Instagram"
          >
            <svg className="w-5 h-5 fill-current text-pink-600" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </button>

          {/* Twitter / X */}
          <button
            onClick={() => handleSocialLogin("twitter")}
            className="
              flex items-center justify-center w-12 h-12
              rounded-full
              bg-gray-50
              dark:bg-slate-800
              border border-gray-200
              dark:border-slate-700
              hover:scale-105
              transition-all
              duration-300
              shadow-md
            "
            title="Login with Twitter"
          >
            <svg className="w-5 h-5 fill-current text-sky-500" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
        </div>

        <p
          className="
            text-center
            text-sm
            text-gray-600
            dark:text-gray-400
            mt-6
          "
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className="
              text-orange-500
              font-bold
              hover:underline
            "
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;