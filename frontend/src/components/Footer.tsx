export default function Footer() {
  return (
    <footer className="bg-pink-50 mt-10 py-12 border-t border-pink-200">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* Logo section */}
        <div>
          <h2 className="text-3xl font-bold text-pink-600">
            Sweet<span className="text-yellow-500">Isha</span>
          </h2>
          <p className="text-gray-600 mt-3">
            Delicious sweets delivered fresh to your home ❤️  
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Home</li>
            <li>Sweets</li>
            <li>Contact</li>
            <li>About Us</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Contact Us</h3>
          <p className="text-gray-600">📍 Gujarat, India</p>
          <p className="text-gray-600">📧 sweetisha@gmail.com</p>
          <p className="text-gray-600">📞 +91 98765 43210</p>

          <div className="flex space-x-4 mt-4">
            <div className="w-9 h-9 rounded-full bg-pink-300 flex items-center justify-center cursor-pointer">📘</div>
            <div className="w-9 h-9 rounded-full bg-pink-300 flex items-center justify-center cursor-pointer">📸</div>
            <div className="w-9 h-9 rounded-full bg-pink-300 flex items-center justify-center cursor-pointer">🐦</div>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-10 text-sm">
        © 2025 Sweet Isha. All Rights Reserved.
      </div>
    </footer>
  );
}
