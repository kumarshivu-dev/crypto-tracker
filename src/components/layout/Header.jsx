"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  // State to track whether the mobile menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Toggles the mobile menu open/close state
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="bg-[#0e1117] border-b border-gray-800 shadow-md">
      <div className="p-4 md:p-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 pr-4 border-gray-400">
          <Image src="/coin.svg" alt="crypto" height={30} width={30} />
          <span className="text-white text-xl font-semibold tracking-wide">
            Crypto-Tracker
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-6 text-white text-base font-medium">
          <Link href="/">Home</Link>
          <Link href="/converter">Converter</Link>
        </nav>

        {/* Mobile menu toggle button */}
        <button
          className="md:hidden text-white cursor-pointer"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile navigation menu  */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-white text-base font-medium">
          <Link href="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/converter" onClick={() => setIsOpen(false)}>
            Converter
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
