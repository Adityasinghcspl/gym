import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { logout } from '../../redux/features/auth/authSlice';
import { getTokenData, isAuthenticated } from '../../utils/Utils';

export default function SiteHeader(_props: {
  activeBarOpen: string | boolean | undefined;
  setActiveBararOpen: (arg0: boolean) => void;
}) {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [user, setUser] = useState<{ name?: string } | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(isAuthenticated());
  const [loginClicked, setLoginClicked] = useState<boolean>(false);

  useEffect(() => {
    const handleAuthChange = () => {
      const auth = isAuthenticated();
      setIsAuthorized(auth);
      if (auth) {
        const userData = getTokenData();
        setUser(userData);
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleAuthChange);
    handleAuthChange(); // Initial check

    return () => {
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setUser(null);
    setIsAuthorized(false);
    setDropdownOpen(false);
    setLoginClicked(false);
    navigate('/');
  };

  const handleLoginClick = () => {
    setLoginClicked(true);
    navigate('/login');
  };

  return (
    <header className="absolute left-0 top-0 w-full px-4 pt-14 z-50 bg-transparent">
      <div className="container mx-auto flex items-center justify-between relative">
        {/* Logo */}
        <div className="logo absolute left-4 lg:static">
          <a href="#">
            <img src="img/logo.png" alt="Logo" className="h-10" />
          </a>
        </div>

        {/* Centered Navigation */}
        <nav className="hidden lg:flex space-x-8 text-white text-sm font-semibold uppercase absolute left-1/2 transform -translate-x-1/2">
          <Link
            to="/"
            className={`hover:text-orange-500 ${(pathname === '/' || pathname.includes('home')) && 'text-orange-500'}`}
          >
            Home
          </Link>
          <Link to="/about-us" className={`hover:text-orange-500 ${pathname === '/about-us' && 'text-orange-500'}`}>
            About Us
          </Link>
          <Link to="/services" className={`hover:text-orange-500 ${pathname === '/services' && 'text-orange-500'}`}>
            Services
          </Link>
          <Link to="/our-team" className={`hover:text-orange-500 ${pathname === '/our-team' && 'text-orange-500'}`}>
            Our Team
          </Link>
          {isAuthorized && user ? (
            <div className="relative group">
              <button className="hover:text-orange-500 uppercase">Pages</button>
              <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-gray-900 text-white w-44 p-3 rounded-lg z-50">
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
          ) : null}
          <Link to="/contact-us" className={`hover:text-orange-500 ${pathname === '/contact-us' && 'text-orange-500'}`}>
            Contact
          </Link>
        </nav>

        {/* Profile or Login / Mobile Toggle */}
        <div className="absolute right-4 lg:static flex items-center gap-4">
          {isAuthorized && user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center uppercase font-bold"
              >
                {user.name?.charAt(0) || 'U'}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-20 z-50">
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            !loginClicked && (
              <button
                onClick={handleLoginClick}
                className="bg-orange-500 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition duration-300 h-10 flex items-center"
              >
                Log In
              </button>
            )
          )}

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-gray-900 text-white p-4 z-40">
          <Link to="/" className="block py-2">
            Home
          </Link>
          <Link to="/about-us" className="block py-2">
            About Us
          </Link>
          <Link to="/class-details" className="block py-2">
            Classes
          </Link>
          <Link to="/services" className="block py-2">
            Services
          </Link>
          <Link to="/our-team" className="block py-2">
            Our Team
          </Link>
          <Link to="/contact-us" className="block py-2">
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
