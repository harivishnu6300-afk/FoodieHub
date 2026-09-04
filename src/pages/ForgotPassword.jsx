import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [matchedUser, setMatchedUser] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email.trim() || !phone.trim()) {
      setError("Please enter your registered email and phone number.");
      return;
    }

    let users = [];

    try {
      const savedUsers = localStorage.getItem("users");

      if (savedUsers) {
        users = JSON.parse(savedUsers);
      } else {
        const singleUser = localStorage.getItem("user");

        if (singleUser) {
          users = [JSON.parse(singleUser)];
        }
      }
    } catch {
      setError("Unable to verify user details.");
      return;
    }

    const user = users.find(
      (item) =>
        item.email?.toLowerCase() === email.trim().toLowerCase() &&
        String(item.phone || item.phoneNumber || "") ===
          String(phone.trim())
    );

    if (!user) {
      setError(
        "Email and phone number do not match any registered account."
      );
      return;
    }

    setMatchedUser(user);
    setMessage("Account verified successfully.");
    setStep(2);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!newPassword || !confirmPassword) {
      setError("Please enter both password fields.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const savedUsers = localStorage.getItem("users");

      if (savedUsers) {
        const users = JSON.parse(savedUsers);

        const updatedUsers = users.map((user) =>
          user.email?.toLowerCase() ===
            matchedUser.email?.toLowerCase()
            ? {
                ...user,
                password: newPassword,
              }
            : user
        );

        localStorage.setItem(
          "users",
          JSON.stringify(updatedUsers)
        );
      }

      const savedUser = localStorage.getItem("user");

      if (savedUser) {
        const user = JSON.parse(savedUser);

        if (
          user.email?.toLowerCase() ===
          matchedUser.email?.toLowerCase()
        ) {
          const updatedUser = {
            ...user,
            password: newPassword,
          };

          localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
          );
        }
      }

      setMessage(
        "Password updated successfully. Redirecting to login..."
      );

      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch {
      setError("Something went wrong while updating the password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 transition duration-500">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8">
        {step === 1 ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Reset Password 🔐
              </h1>

              <p className="text-gray-500 dark:text-gray-400 mt-3">
                Enter your registered email address and phone number.
              </p>
            </div>

            <form onSubmit={handleVerify}>
              <div className="mb-5">
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  className="w-full px-4 py-4 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your registered phone number"
                  className="w-full px-4 py-4 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {error && (
                <div className="mb-5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="flex-1 py-4 rounded-xl bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white font-bold hover:scale-105 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg hover:scale-105 transition"
                >
                  Verify Account
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Create New Password 🔒
              </h1>

              <p className="text-gray-500 dark:text-gray-400 mt-3">
                Account verified. Create your new password.
              </p>
            </div>

            <form onSubmit={handleResetPassword}>
              <div className="mb-5">
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={
                      showNewPassword
                        ? "text"
                        : "password"
                    }
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                    placeholder="Enter new password"
                    className="w-full px-4 py-4 pr-14 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNewPassword(!showNewPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-lg"
                  >
                    {showNewPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm new password"
                    className="w-full px-4 py-4 pr-14 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-lg"
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {error && (
                <div className="mb-5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {message && (
                <div className="mb-5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 p-3 rounded-xl text-sm">
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg hover:scale-105 transition"
              >
                Update Password 🔐
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setError("");
                  setMessage("");
                }}
                className="w-full mt-4 py-3 rounded-xl border-2 border-gray-300 dark:border-slate-700 text-gray-700 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-slate-800 transition"
              >
                Back
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;