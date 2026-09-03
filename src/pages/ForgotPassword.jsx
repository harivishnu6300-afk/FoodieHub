import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSendOtp = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!identifier.trim()) {
      setError("Please enter your registered Email or Mobile number!");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No registered account found in system!");
      return;
    }

    if (storedUser.email === identifier || storedUser.mobile === identifier) {
      const dummyOtp = "1234";
      setGeneratedOtp(dummyOtp);
      setIsOtpSent(true);
      setMessage(`OTP sent successfully! (For testing, use OTP: ${dummyOtp})`);
    } else {
      setError("Email or Mobile number not found in our records!");
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (otpInput === generatedOtp) {
      setIsOtpVerified(true);
      setMessage("OTP Verified Successfully! Now enter your new password.");
    } else {
      setError("Invalid OTP! Please try again (Use 1234).");
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!newPassword) {
      setError("Please enter a new password!");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      storedUser.password = newPassword;
      localStorage.setItem("user", JSON.stringify(storedUser));

      setMessage("Password updated successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setError("Something went wrong. Please register again.");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-orange-100 via-amber-50 to-orange-200 py-10">
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-16 text-5xl animate-float-1 opacity-80 filter drop-shadow-lg">🍔</div>
        <div className="absolute top-32 right-20 text-6xl animate-float-2 opacity-80 filter drop-shadow-lg">🍕</div>
        <div className="absolute bottom-28 left-24 text-5xl animate-float-3 opacity-80 filter drop-shadow-lg">🍟</div>
        <div className="absolute bottom-32 right-28 text-6xl animate-float-1 opacity-80 filter drop-shadow-lg">🥤</div>
      </div>

      <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 bg-white/85 backdrop-blur-md w-full max-w-md p-8 rounded-2xl shadow-2xl border border-orange-200">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Forgot Password</h1>
        <p className="text-center text-sm text-gray-600 mb-6">
          {!isOtpSent
            ? "Enter your email or mobile to receive OTP"
            : !isOtpVerified
            ? "Enter the OTP sent to your account"
            : "Set your new password"}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center text-sm font-medium">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center text-sm font-medium">
            {message}
          </div>
        )}

        {!isOtpSent && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Registered Email or Mobile (10-digit)"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 font-semibold shadow-md transition duration-300"
            >
              Send OTP
            </button>
          </form>
        )}

        {isOtpSent && !isOtpVerified && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Enter 4-digit OTP (e.g. 1234)"
                maxLength="4"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-orange-500 text-center tracking-widest text-lg font-bold"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 font-semibold shadow-md transition duration-300"
            >
              Verify OTP
            </button>
          </form>
        )}

        {isOtpVerified && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg pr-12 bg-white/90 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 font-semibold shadow-md transition duration-300"
            >
              Reset Password
            </button>
          </form>
        )}

        <p className="text-center mt-6 text-sm text-gray-600">
          Remembered your password?{" "}
          <Link to="/login" className="text-orange-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default ForgotPassword;