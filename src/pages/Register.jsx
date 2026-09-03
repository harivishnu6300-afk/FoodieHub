import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Eye symbol states for password fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Full Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email format";
    }

    if (!emailOtp) {
      newErrors.emailOtp = "Email OTP is required";
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits";
    }

    if (!mobileOtp) {
      newErrors.mobileOtp = "Mobile OTP is required";
    }

    // Strong Password Validation (Min 8 chars, Uppercase, Lowercase, Number, Special Character)
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      newErrors.password = "Password is required";
    } else if (!strongPasswordRegex.test(password)) {
      newErrors.password = "Min 8 chars: include Upper, Lower, Number & Special char";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }

    return newErrors;
  };

  const register = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const user = {
        name,
        email,
        countryCode,
        mobile,
        password,
      };

      localStorage.setItem("user", JSON.stringify(user));
      setSuccessMessage("Registration Successful 🎉 Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-orange-100 via-amber-50 to-orange-200 py-10">
      
      {/* Smooth Moving Food Background Animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-16 text-5xl animate-float-1 opacity-80 filter drop-shadow-lg">
          🍔
        </div>
        <div className="absolute top-32 right-20 text-6xl animate-float-2 opacity-80 filter drop-shadow-lg">
          🍕
        </div>
        <div className="absolute bottom-28 left-24 text-5xl animate-float-3 opacity-80 filter drop-shadow-lg">
          🍟
        </div>
        <div className="absolute bottom-32 right-28 text-6xl animate-float-1 opacity-80 filter drop-shadow-lg">
          🥤
        </div>
        <div className="absolute top-1/2 left-10 text-5xl animate-float-2 opacity-75 filter drop-shadow-lg">
          🍜
        </div>
        <div className="absolute top-1/3 right-12 text-5xl animate-float-3 opacity-75 filter drop-shadow-lg">
          🍰
        </div>
      </div>

      {/* Background Soft Glow Blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      {/* Register Card */}
      <div className="relative z-10 bg-white/85 backdrop-blur-md w-full max-w-lg p-8 rounded-2xl shadow-2xl border border-orange-200">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Register</h1>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center text-sm font-medium">
            {successMessage}
          </div>
        )}

        <form onSubmit={register} className="space-y-4">
          {/* Full Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email Address */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Email OTP */}
          <div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Email OTP"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button type="button" className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap hover:bg-black transition">
                Send OTP
              </button>
            </div>
            {errors.emailOtp && <p className="text-red-500 text-xs mt-1">{errors.emailOtp}</p>}
          </div>

          {/* Country Code & Mobile Number */}
          <div>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <input
                type="text"
                placeholder="10-digit Mobile Number"
                maxLength="10"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
          </div>

          {/* Mobile OTP */}
          <div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Mobile OTP"
                value={mobileOtp}
                onChange={(e) => setMobileOtp(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button type="button" className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap hover:bg-black transition">
                Send OTP
              </button>
            </div>
            {errors.mobileOtp && <p className="text-red-500 text-xs mt-1">{errors.mobileOtp}</p>}
          </div>

          {/* Password with Eye Symbol */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password (e.g., Abc@1234)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg pr-12 bg-white/90 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm font-semibold"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password with Eye Symbol */}
          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg pr-12 bg-white/90 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm font-semibold"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Terms Checkbox */}
          <div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the Terms and Conditions
              </label>
            </div>
            {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 font-semibold shadow-md transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;