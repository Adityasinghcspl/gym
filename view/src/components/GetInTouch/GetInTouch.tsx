import { FaMapMarkerAlt, FaMobileAlt, FaEnvelope } from 'react-icons/fa';

export default function GetInTouch() {
  return (
    <div className="bg-[#0a0a0a] py-10">
      <div className="container mx-auto px-0  xl:px-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Address */}
          <div className="gt-text flex flex-col items-center md:flex-row ">
            <div className="gt-icon">
              <FaMapMarkerAlt className="text-white text-2xl" />
            </div>
            <p className="gt-info">
              333 Middle Winchendon Rd, Rindge, <br /> NH 03461
            </p>
          </div>

          {/* Phone Numbers */}
          <div className="gt-text flex flex-col items-center md:flex-row ">
            <div className="gt-icon">
              <FaMobileAlt className="text-white text-2xl" />
            </div>
            <ul className="gt-info flex gap-3">
              <li className="relative after:content-['|'] after:absolute after:right-[-12px] after:text-gray-500 last:after:hidden">
                125-711-811
              </li>
              <li>125-668-886</li>
            </ul>
          </div>

          {/* Email */}
          <div className="gt-text flex flex-col items-center md:flex-row ">
            <div className="gt-icon">
              <FaEnvelope className="text-white text-2xl" />
            </div>
            <p className="gt-info">Support.gymcenter@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
