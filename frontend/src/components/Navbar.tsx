import { useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useAdmin } from "../context/AdminContext";
//import { Request, Response, NextFunction } from "express";
//import jwt from "jsonwebtoken";


export default function Navbar() {
  const [open, setOpen] = useState(false); // Mobile menu
  const [showAuthModal, setShowAuthModal] = useState(false); // Login/Signup modal
  const [showLogin, setShowLogin] = useState(true); // Toggle login/signup
  const [showRoleModal, setShowRoleModal] = useState(false); // Role selection modal
  const [loginRole, setLoginRole] = useState<"user" | "admin">("user");
  
  const { user, setUser } = useUser();
const { admin, setAdmin } = useAdmin();


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
    const res = await axios.post(
      loginRole === "admin"
        ? "http://localhost:5001/api/admin/login"
        : "http://localhost:5001/api/login",
      {
        email: loginEmail,
        password: loginPassword,
      }
    );

    if (loginRole === "admin") {
      setAdmin({
        name: res.data.name,
        role: "admin",
      });

      localStorage.setItem("adminToken", res.data.token);

      alert("Admin logged in!");
      window.location.href = "/admin";
    } else {
      setUser({
        name: res.data.name,
        role: "user",
      });

      localStorage.setItem("token", res.data.token);

      alert("User logged in!");
    }

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
    <>
      {/* ---------------------- NAVBAR ---------------------- */}
      <nav className="w-full sticky top-0 z-50 bg-amber-100/90 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-pink-600">
            Sweet<span className="text-yellow-500">Isha</span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <li className="hover:text-pink-500 transition">Home</li>
            <li className="hover:text-pink-500 transition">Sweets</li>
            <li className="hover:text-pink-500 transition">About Us</li>
            <li className="hover:text-pink-500 transition">Contact</li>
          </ul>

          {/* Buttons */}
          <div className="hidden md:flex space-x-4 items-center">
            {!user ? (
              <button
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
                onClick={() => setShowRoleModal(true)}
              >
                Login
              </button>
            ) : (
              <div className="flex items-center gap-2">
                {/* User initials */}
                <div className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
  {user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "U"} {/* Fallback 'U' */}
</div>

                <span className="text-gray-700 font-medium">{user.role}</span>
              </div>
            )}

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
          <div className="md:hidden bg-amber-100/90 backdrop-blur-md shadow-inner px-6 py-4 space-y-4 rounded-b-xl">
            <div className="hover:text-pink-500 transition">Home</div>
            <div className="hover:text-pink-500 transition">Sweets</div>
            <div className="hover:text-pink-500 transition">About</div>
            <div className="hover:text-pink-500 transition">Contact</div>
            <hr className="my-2 border-pink-300" />
            <button
              className="block px-4 py-2 bg-pink-500 text-white rounded-lg w-full text-center"
              onClick={() => {
                setShowRoleModal(true);
                setOpen(false);
              }}
            >
              Login
            </button>
            <button
              className="block px-4 py-2 border border-pink-500 text-pink-600 rounded-lg w-full text-center"
              onClick={() => setOpen(false)}
            >
              Cart
            </button>
          </div>
        )}
      </nav>

      {/* ---------------------- ROLE SELECTION MODAL ---------------------- */}
      {showRoleModal && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
          <div className="bg-amber-100/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-80 flex flex-col gap-4 items-center relative">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">
              Login as
            </h2>
            <button
              className="w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              onClick={() => {
                setLoginRole("user");
                setShowRoleModal(false);
                setShowAuthModal(true);
                setShowLogin(true);
              }}
            >
              User
            </button>
            <button
              className="w-full py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
              onClick={() => {
                setLoginRole("admin");
                setShowRoleModal(false);
                setShowAuthModal(true);
                setShowLogin(true);
              }}
            >
              Admin
            </button>
            <button
              className="absolute top-3 right-3 text-gray-500 text-xl hover:text-gray-700 transition"
              onClick={() => setShowRoleModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ---------------------- LOGIN/SIGNUP MODAL ---------------------- */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
          <form
            className="bg-amber-100/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96 flex flex-col gap-4 relative"
            onSubmit={showLogin ? handleLogin : handleSignup}
          >
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-500 text-xl hover:text-gray-700 transition"
              onClick={() => setShowAuthModal(false)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-pink-600">
              {showLogin ? "Login" : "Signup"}
            </h2>

            {/* Form Inputs */}
            {showLogin ? (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-pink-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-pink-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
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
                  className="border border-pink-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-pink-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-pink-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </>
            )}

            <button
              className={`w-full py-2 rounded text-white ${
                showLogin
                  ? "bg-pink-500 hover:bg-pink-600"
                  : "bg-yellow-500 hover:bg-yellow-600"
              } transition`}
            >
              {showLogin ? "Login" : "Signup"}
            </button>

            <p className="mt-2 text-sm text-center">
              {showLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                className={`cursor-pointer font-semibold ${
                  showLogin ? "text-yellow-500" : "text-pink-500"
                }`}
                onClick={() => setShowLogin(!showLogin)}
              >
                {showLogin ? "Signup" : "Login"}
              </span>
            </p>
          </form>
        </div>
      )}
    </>
  );
}
