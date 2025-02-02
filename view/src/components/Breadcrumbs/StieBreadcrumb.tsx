import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

export default function StieBreadcrumb() {
  const location = useLocation();
  const pathname = location.pathname.replace("/", ""); 
  return (
    <section
      className="relative h-[500px] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/img/breadcrumb-bg.jpg')" }}
    >
      <div className="container mx-auto text-center">
        <div className="text-white">
          <h2 className="text-5xl font-semibold uppercase mb-4">{pathname}</h2>
          <div className="flex justify-center items-center space-x-4 text-lg font-bold">
            <Link
              to="/"
              className="relative text-white after:absolute after:-right-3 after:top-1 after:text-sm after:font-normal after:font-awesome"
            >
              Home
            </Link>
            <IoIosArrowForward size={15}/>
            <span className="text-orange-500">{pathname.charAt(0).toUpperCase() + pathname.slice(1)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
