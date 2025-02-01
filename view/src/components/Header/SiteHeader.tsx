import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaBars } from 'react-icons/fa';

export default function SiteHeader(props: {
  activeBarOpen: string | boolean | undefined;
  setActiveBararOpen: (arg0: boolean) => void;
}) {
  const location = useLocation();
  const { pathname } = location;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute left-0 top-0 w-full px-4 pt-14 z-50 bg-transparent">
      <div className="container mx-auto flex items-center justify-between">
        <div className="logo">
          <a href="./index.html">
            <img src="img/logo.png" alt="Logo" className="h-10" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8 text-white text-sm font-semibold uppercase">
          <Link
            to="/"
            className={`hover:text-orange-500 ${(pathname === '/' || pathname.includes('home')) && 'text-orange-500'}`}
          >
            Home
          </Link>
          <Link to="/about-us" className={`hover:text-orange-500 ${pathname === '/about-us' && 'text-orange-500'}`}>
            About Us
          </Link>
          <a href="./class-details.html" className="hover:text-orange-500">
            Classes
          </a>
          <a href="./services.html" className="hover:text-orange-500">
            Services
          </a>
          <a href="./team.html" className="hover:text-orange-500">
            Our Team
          </a>
          <div className="relative group">
            <button className="hover:text-orange-500">Pages</button>
            <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-gray-900 text-white w-44 p-3 rounded-lg">
              <a href="./about-us.html" className="block py-1 hover:text-orange-500">
                About us
              </a>
              <a href="./class-timetable.html" className="block py-1 hover:text-orange-500">
                Classes timetable
              </a>
              <a href="./bmi-calculator.html" className="block py-1 hover:text-orange-500">
                BMI Calculator
              </a>
              <a href="./gallery.html" className="block py-1 hover:text-orange-500">
                Gallery
              </a>
              <a href="./blog.html" className="block py-1 hover:text-orange-500">
                Our Blog
              </a>
              <a href="./404.html" className="block py-1 hover:text-orange-500">
                404
              </a>
            </div>
          </div>
          <a href="./contact.html" className="hover:text-orange-500">
            Contact
          </a>
        </nav>

        {/* Search and Social Icons */}
        <div className="hidden lg:flex items-center space-x-4 text-white md:px-10">
          {/* <FaSearch className="cursor-pointer text-lg hover:text-orange-500" /> */}
          <FaFacebook className="cursor-pointer hover:text-orange-500" />
          <FaTwitter className="cursor-pointer hover:text-orange-500" />
          <FaYoutube className="cursor-pointer hover:text-orange-500" />
          <FaInstagram className="cursor-pointer hover:text-orange-500" />
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-gray-900 text-white p-4">
          <a href="./index.html" className="block py-2">
            Home
          </a>
          <a href="./about-us.html" className="block py-2">
            About Us
          </a>
          <a href="./class-details.html" className="block py-2">
            Classes
          </a>
          <a href="./services.html" className="block py-2">
            Services
          </a>
          <a href="./team.html" className="block py-2">
            Our Team
          </a>
          <a href="./contact.html" className="block py-2">
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
