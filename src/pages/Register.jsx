import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const countries = [
  { code: "+91", name: "India", flag: "ðŸ‡®ðŸ‡³", digits: 10 },
  { code: "+1", name: "USA", flag: "ðŸ‡ºðŸ‡¸", digits: 10 },
  { code: "+44", name: "UK", flag: "ðŸ‡¬ðŸ‡§", digits: 10 },
  { code: "+971", name: "UAE", flag: "ðŸ‡¦ðŸ‡ª", digits: 9 },
  { code: "+61", name: "Australia", flag: "ðŸ‡¦ðŸ‡º", digits: 9 },
  { code: "+65", name: "Singapore", flag: "ðŸ‡¸ðŸ‡¬", digits: 8 },
  { code: "+81", name: "Japan", flag: "ðŸ‡¯ðŸ‡µ", digits: 10 },
];

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedCountry =
    countries.find((country) => country.code === countryCode) ||
    countries[0];

  const handlePhoneChange = (event) => {
    const numbersOnly = event.target.value.replace(/\D/g, "");
    setPhone(numbersOnly.slice(0, selectedCountry.digits));
    setError("");
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    if (!cleanName) {
      setError("Please enter your name.");
      return;
    }

    if (cleanName.length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (cleanPhone.length !== selectedCountry.digits) {
      setError(
        `${selectedCountry.name} phone number must contain exactly ${selectedCountry.digits} digits.`
      );
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    try {
      setLoading(true);

      const fullPhoneNumber = `${countryCode}${cleanPhone}`;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            phone: fullPhoneNumber,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to create the account."
        );
      }

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      console.error("Registration error:", error);
      setError(
        error.message ||
          "Unable to create the account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 py-10">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Create Account
          </h1>

          <p className="mt-3 text-gray-500 dark:text-gray-400 text-lg">
            Join FoodieHub today
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl bg-red-100 dark:bg-red-500/20 border border-red-300 dark:border-red-500/40 px-4 py-3 text-red-600 dark:text-red-400 text-sm font-medium">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-xl bg-green-100 dark:bg-green-500/20 border border-green-300 dark:border-green-500/40 px-4 py-3 text-green-600 dark:text-green-400 text-sm font-medium">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError("");
              }}
              className="w-full rounded-2xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-5 py-4 text-gray-900 dark:text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              className="w-full rounded-2xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-5 py-4 text-gray-900 dark:text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />

            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Each email address can be used for only one account.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Phone Number
            </label>

            <div className="flex gap-3">
              <select
                value={countryCode}
                onChange={(event) => {
                  setCountryCode(event.target.value);
                  setPhone("");
                  setError("");
                }}
                className="w-36 rounded-2xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3 py-4 text-gray-900 dark:text-white outline-none focus:border-orange-500"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>

              <input
                type="text"
                inputMode="numeric"
                placeholder={`${selectedCountry.digits} digit phone number`}
                value={phone}
                onChange={handlePhoneChange}
                className="flex-1 rounded-2xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-5 py-4 text-gray-900 dark:text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {selectedCountry.name} numbers must contain exactly{" "}
              {selectedCountry.digits} digits.
            </p>
          </div>

          <div className="relative">
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              className="w-full rounded-2xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-5 py-4 pr-20 text-gray-900 dark:text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 bottom-4 font-medium text-orange-500 hover:text-orange-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="relative">
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setError("");
              }}
              className="w-full rounded-2xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-5 py-4 pr-20 text-gray-900 dark:text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-5 bottom-4 font-medium text-orange-500 hover:text-orange-600"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-orange-500 py-4 text-lg font-bold text-white shadow-lg transition duration-300 hover:bg-orange-600 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-orange-500 hover:text-orange-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

