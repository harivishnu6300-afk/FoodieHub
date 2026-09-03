import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      if (storedUser.email === email && storedUser.password === password) {
        // Successfully logged in - set authentication flag
        localStorage.setItem("isLoggedIn", "true");

        alert("Login Successful 🎉 Welcome back!");
        navigate("/");
        window.location.reload(); // Quick refresh to update navbar state instantly
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } else {
      setError("No account found! Please register first.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-orange-100 via-amber-50 to-orange-200 py-10">
      
      {/* Background Floating Food Animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-16 text-5xl animate-float-1 opacity-80 filter drop-shadow-lg">🍔</div>
        <div className="absolute top-32 right-20 text-6xl animate-float-2 opacity-80 filter drop-shadow-lg">🍕</div>
        <div className="absolute bottom-28 left-24 text-5xl animate-float-3 opacity-80 filter drop-shadow-lg">🍟</div>
        <div className="absolute bottom-32 right-28 text-6xl animate-float-1 opacity-80 filter drop-shadow-lg">🥤</div>
      </div>

      <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 bg-white/85 backdrop-blur-md w-full max-w-md p-8 rounded-2xl shadow-2xl border border-orange-200">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white/90"
              required
            />
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white/90"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm font-semibold"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            
            <div className="text-right mt-1.5">
              <Link to="/forgot-password" className="text-xs text-orange-600 font-semibold hover:underline">
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 font-semibold shadow-md transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-orange-600 font-bold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;