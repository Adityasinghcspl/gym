import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#151515] p-6 text-white">
      <h1 className="text-8xl md:text-9xl font-bold mb-4">
        <span className=" text-orange-500 px-6 py-2 transition-colors">
          404
        </span>
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold mt-2 text-center">
        Page Not Found
      </h2>
      <p className="text-gray-400 mt-2 mb-6 text-center max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block border-2 rounded-lg border-orange-500 text-orange-500 px-6 py-2 hover:bg-orange-500 hover:text-white transition"
      >
        Go Home
      </Link>
    </div>
  );
}
