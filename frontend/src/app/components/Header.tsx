// components/Header.js
import React from "react";

const Header = () => {
  return (
    <header className="bg-black text-white py-4 font-analytico shadow-lg shadow-white z-10">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">
          <span className="text-green-500">Analytico</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-8 items-center">
          <a
            href="#documentation"
            className="hover:text-green-500 transition duration-300"
          >
            Documentation
          </a>
          <a href="#examples" className="hover:text-green-500 transition duration-300">
            Examples
          </a>
          <a href="#contact" className="bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
