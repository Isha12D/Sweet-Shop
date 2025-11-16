import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-pink-600">
          Sweet<span className="text-yellow-500">Isha</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/sweets">Sweets</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            Login
          </Link>

          <Link
            to="/cart"
            className="px-4 py-2 border border-pink-500 text-pink-600 rounded-lg hover:bg-pink-100 transition"
          >
            Cart
          </Link>
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
          <Link className="block" to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link className="block" to="/sweets" onClick={() => setOpen(false)}>Sweets</Link>
          <Link className="block" to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link className="block" to="/contact" onClick={() => setOpen(false)}>Contact</Link>

          <hr className="my-2" />

          <Link
            to="/login"
            className="block px-4 py-2 bg-pink-500 text-white rounded-lg text-center"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>

          <Link
            to="/cart"
            className="block px-4 py-2 border border-pink-500 text-pink-600 rounded-lg text-center"
            onClick={() => setOpen(false)}
          >
            Cart
          </Link>
        </div>
      )}
    </nav>
  );
}
