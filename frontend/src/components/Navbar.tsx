import { useState } from "react";
import axios from "axios";

export default function Navbar() {
  const [open, setOpen] = useState(false); // Mobile menu
  const [showAuthModal, setShowAuthModal] = useState(false); // Login/Signup modal
  const [showLogin, setShowLogin] = useState(true); // Toggle between login/signup

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // --- LOGIN ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/login", {
        email: loginEmail,
        password: loginPassword,
      });
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      setShowAuthModal(false);
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // --- SIGNUP ---
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/signup", {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
      });
      alert("Signup successful! Please login.");
      setShowLogin(true);
    } catch (err: any) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-pink-600">
          Sweet<span className="text-yellow-500">Isha</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li>Home</li>
          <li>Sweets</li>
          <li>About Us</li>
          <li>Contact</li>
        </ul>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <button
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            onClick={() => {
              setShowAuthModal(true);
              setShowLogin(true);
            }}
          >
            Login
          </button>
          <button className="px-4 py-2 border border-pink-500 text-pink-600 rounded-lg hover:bg-pink-100 transition">
            Cart
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-inner px-6 py-4 space-y-4">
          <div>Home</div>
          <div>Sweets</div>
          <div>About</div>
          <div>Contact</div>
          <hr className="my-2" />
          <button
            className="block px-4 py-2 bg-pink-500 text-white rounded-lg w-full text-center"
            onClick={() => {
              setShowAuthModal(true);
              setShowLogin(true);
              setOpen(false);
            }}
          >
            Login
          </button>
          <button className="block px-4 py-2 border border-pink-500 text-pink-600 rounded-lg w-full text-center" onClick={() => setOpen(false)}>
            Cart
          </button>
        </div>
      )}

      {/* ---------------------- LOGIN/SIGNUP MODAL ---------------------- */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            className="bg-white p-8 rounded shadow-md w-96 relative"
            onSubmit={showLogin ? handleLogin : handleSignup}
          >
            <h2 className="text-2xl font-bold mb-6">
              {showLogin ? "Login" : "Signup"}
            </h2>

            {showLogin ? (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  className="border p-2 w-full mb-4"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border p-2 w-full mb-4"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  className="border p-2 w-full mb-4"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border p-2 w-full mb-4"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border p-2 w-full mb-4"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </>
            )}

            <button className={`w-full py-2 rounded text-white ${showLogin ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}>
              {showLogin ? "Login" : "Signup"}
            </button>

            <p className="mt-4 text-sm text-center">
              {showLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                className={`cursor-pointer ${showLogin ? "text-green-500" : "text-blue-500"}`}
                onClick={() => setShowLogin(!showLogin)}
              >
                {showLogin ? "Signup" : "Login"}
              </span>
            </p>

            <button
              type="button"
              className="absolute top-2 right-2 text-gray-500 text-xl"
              onClick={() => setShowAuthModal(false)}
            >
              ✕
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}
