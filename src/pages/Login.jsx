import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

function Login({ setLoggedInUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [showForgotModal, setShowForgotModal] = useState(false);

  const [resetEmail, setResetEmail] = useState("");
  const [resetPhone, setResetPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

  const navigate = useNavigate();

  const normalizePhone = (value) => {
    return value.replace(/\D/g, "");
  };

  const phoneMatches = (savedPhone, enteredPhone) => {
    const saved = normalizePhone(savedPhone || "");
    const entered = normalizePhone(enteredPhone || "");

    if (!saved || !entered) {
      return false;
    }

    if (saved === entered) {
      return true;
    }

    return saved.endsWith(entered) || entered.endsWith(saved);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const loginValue = email.trim();
    const normalizedEmail = loginValue.toLowerCase();

    const validUser = users.find((user) => {
      const emailMatch = user.email?.toLowerCase() === normalizedEmail;

      const phoneMatch = phoneMatches(user.phone, loginValue);

      return (emailMatch || phoneMatch) && user.password === password;
    });

    if (validUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(validUser));

      if (setLoggedInUser) {
        setLoggedInUser(validUser);
      }

      setMessage("Login successful!");

      setTimeout(() => {
        navigate("/");
      }, 500);
    } else {
      setError("Invalid email, phone number or password.");
    }
  };

  const resetModalData = () => {
    setResetEmail("");
    setResetPhone("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");

    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);

    setResetError("");
    setResetSuccess("");
  };

  const openForgotModal = () => {
    resetModalData();
    setShowForgotModal(true);
  };

  const closeForgotModal = () => {
    setShowForgotModal(false);
    resetModalData();
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    setResetError("");
    setResetSuccess("");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const normalizedEmail = resetEmail.trim().toLowerCase();

    const enteredPhone = resetPhone.trim();

    if (
      !normalizedEmail ||
      !enteredPhone ||
      !currentPassword ||
      !newPassword ||
      !confirmNewPassword
    ) {
      setResetError("Please fill in all fields.");
      return;
    }

    const userIndex = users.findIndex((user) => {
      const emailMatch = user.email?.toLowerCase() === normalizedEmail;

      const phoneMatch = phoneMatches(user.phone, enteredPhone);

      return emailMatch && phoneMatch;
    });

    if (userIndex === -1) {
      setResetError(
        "Email and phone number do not match any registered account.",
      );
      return;
    }

    if (users[userIndex].password !== currentPassword) {
      setResetError("Current password is incorrect.");
      return;
    }

    if (newPassword.length < 6) {
      setResetError("New password must contain at least 6 characters.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setResetError("New password and confirm password do not match.");
      return;
    }

    if (newPassword === currentPassword) {
      setResetError("New password cannot be the same as current password.");
      return;
    }

    const updatedUsers = [...users];

    updatedUsers[userIndex] = {
      ...updatedUsers[userIndex],
      password: newPassword,
    };

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedUser && loggedUser.email?.toLowerCase() === normalizedEmail) {
      const updatedLoggedUser = updatedUsers[userIndex];

      localStorage.setItem("loggedInUser", JSON.stringify(updatedLoggedUser));

      if (setLoggedInUser) {
        setLoggedInUser(updatedLoggedUser);
      }
    }

    setResetSuccess("Password updated successfully!");

    setTimeout(() => {
      closeForgotModal();

      setEmail(normalizedEmail);
      setPassword("");

      navigate("/login");
    }, 1800);
  };

  const handleSocialLogin = (provider) => {
    const socialUrls = {
      Google: "https://accounts.google.com/",
      Facebook: "https://www.facebook.com/login/",
      Instagram: "https://www.instagram.com/accounts/login/",
      X: "https://x.com/i/flow/login",
    };

    window.open(socialUrls[provider], "_blank", "noopener,noreferrer");
  };
  return (
    <section className="min-h-screen bg-gray-100 dark:bg-slate-950 flex items-center justify-center py-12 px-6 transition duration-500 relative">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-slate-800">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
          Welcome Back 👋
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-xl text-sm font-semibold text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-600 rounded-xl text-sm font-semibold text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Email or Phone Number
            </label>

            <input
              type="text"
              placeholder="Enter email or registered phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 pr-16 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-orange-500 py-1 px-2 cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={openForgotModal}
              className="text-sm text-orange-500 hover:underline font-medium cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-orange-500/30 cursor-pointer"
          >
            Login 🚀
          </button>
        </form>

        <div className="flex items-center my-7">
          <div className="flex-grow border-t border-gray-300 dark:border-slate-700" />

          <span className="px-3 text-sm text-gray-500 dark:text-gray-400 font-medium">
            Or login with
          </span>

          <div className="flex-grow border-t border-gray-300 dark:border-slate-700" />
        </div>

        <div className="flex justify-center gap-5">
          <button
            type="button"
            onClick={() => handleSocialLogin("Google")}
            title="Continue with Google"
            className="group w-14 h-14 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-[0_6px_0_rgb(180,180,180)] dark:shadow-[0_6px_0_rgb(30,41,59)] hover:shadow-[0_3px_0_rgb(180,180,180)] hover:translate-y-[3px] active:shadow-none active:translate-y-[6px] transition-all duration-200 flex items-center justify-center cursor-pointer"
          >
            <FaGoogle className="text-xl text-red-500 group-hover:scale-110 transition" />
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("Facebook")}
            title="Continue with Facebook"
            className="group w-14 h-14 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-[0_6px_0_rgb(180,180,180)] dark:shadow-[0_6px_0_rgb(30,41,59)] hover:shadow-[0_3px_0_rgb(180,180,180)] hover:translate-y-[3px] active:shadow-none active:translate-y-[6px] transition-all duration-200 flex items-center justify-center cursor-pointer"
          >
            <FaFacebookF className="text-xl text-blue-600 group-hover:scale-110 transition" />
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("Instagram")}
            title="Continue with Instagram"
            className="group w-14 h-14 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-[0_6px_0_rgb(180,180,180)] dark:shadow-[0_6px_0_rgb(30,41,59)] hover:shadow-[0_3px_0_rgb(180,180,180)] hover:translate-y-[3px] active:shadow-none active:translate-y-[6px] transition-all duration-200 flex items-center justify-center cursor-pointer"
          >
            <FaInstagram className="text-xl text-pink-500 group-hover:scale-110 transition" />
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("X")}
            title="Continue with X"
            className="group w-14 h-14 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-[0_6px_0_rgb(180,180,180)] dark:shadow-[0_6px_0_rgb(30,41,59)] hover:shadow-[0_3px_0_rgb(180,180,180)] hover:translate-y-[3px] active:shadow-none active:translate-y-[6px] transition-all duration-200 flex items-center justify-center cursor-pointer"
          >
            <FaTwitter className="text-xl text-gray-900 dark:text-white group-hover:scale-110 transition" />
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-7">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-orange-500 font-bold hover:underline cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </div>

      {showForgotModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 max-w-md w-full rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-slate-800 my-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Reset Password 🔒
              </h3>

              <button
                type="button"
                onClick={closeForgotModal}
                className="text-gray-500 hover:text-red-500 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
              Enter your registered email, phone number and current password.
            </p>

            {resetError && (
              <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-xl text-sm font-semibold text-center">
                {resetError}
              </div>
            )}

            {resetSuccess && (
              <div className="mb-4 p-3 bg-green-100 text-green-600 rounded-xl text-sm font-semibold text-center">
                {resetSuccess}
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Registered Email
                </label>

                <input
                  type="email"
                  placeholder="Enter registered email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Registered Phone Number
                </label>

                <input
                  type="text"
                  placeholder="Enter registered phone number"
                  value={resetPhone}
                  onChange={(e) => setResetPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Current Password
                </label>

                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-16 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 hover:text-orange-500"
                  >
                    {showCurrentPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-16 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 hover:text-orange-500"
                  >
                    {showNewPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Confirm New Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-16 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 hover:text-orange-500"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForgotModal}
                  className="w-1/2 bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-gray-300 font-semibold py-3 rounded-xl hover:bg-gray-300 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-1/2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition shadow-md"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Login;
