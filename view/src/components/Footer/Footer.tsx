import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <section className="bg-black-2 pt-12">
      <div className="container mx-auto px-4 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* About Section */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2">
            <div className="mb-6">
              <Link to="/">
                <img src="/img/logo.png" alt="Logo" className="mb-6" />
              </Link>
              <p className="text-gray-400 leading-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                dolore magna aliqua.
              </p>
            </div>
            <div className="flex space-x-4 text-gray-400 text-xl">
              <Link to="#">
                <FaFacebookF />
              </Link>
              <Link to="#">
                <FaTwitter />
              </Link>
              <Link to="#">
                <FaYoutube />
              </Link>
              <Link to="#">
                <FaInstagram />
              </Link>
              <Link to="#">
                <FaEnvelope />
              </Link>
            </div>
          </div>

          {/* Useful Links */}
          <div className="sm:col-span-1 md:col-span-1 lg:col-span-1">
            <h4 className="text-white font-semibold mb-4">Useful Links</h4>
            <ul className="text-gray-400 space-y-2">
              <li>
                <Link to="/about-us">About</Link>
              </li>
              <li>
                <Link to="/services">Service</Link>
              </li>
              <li>
                <Link to="/our-team">Our Teams</Link>
              </li>
              <li>
                <Link to="/contact-us">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          {/* <div className="sm:col-span-1 md:col-span-1 lg:col-span-1">
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="text-gray-400 space-y-2">
              <li>
                <Link to="#">Login</Link>
              </li>
              <li>
                <Link to="#">My Account</Link>
              </li>
              <li>
                <Link to="#">Subscribe</Link>
              </li>
              <li>
                <Link to="#">Contact</Link>
              </li>
            </ul>
          </div> */}

          {/* Tips & Guides */}
          <div className="sm:col-span-2 md:col-span-1 lg:col-span-2">
            <h4 className="text-white font-semibold mb-4">Tips & Guides</h4>
            <div className="border-b border-gray-700 pb-4 mb-4">
              <h6 className="text-gray-400">
                <Link to="#">Physical fitness may help prevent depression, anxiety</Link>
              </h6>
              <ul className="text-sm text-gray-500 flex space-x-4">
                <li>3 min read</li>
                <li>20 Comments</li>
              </ul>
            </div>
            <div>
              <h6 className="text-gray-400">
                <Link to="#">Fitness: The best exercise to lose belly fat and tone up...</Link>
              </h6>
              <ul className="text-sm text-gray-500 flex space-x-4">
                <li>3 min read</li>
                <li>20 Comments</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center border-t border-gray-700 mt-8 py-6">
          <p className="text-gray-400 text-sm">Copyright &copy; {new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </section>
  );
}
