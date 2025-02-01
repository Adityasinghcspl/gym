
export default function Footer() {
  return (
    <section className="bg-black-2 pt-12">
      <div className="container mx-auto px-4 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* About Section */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
            <div className="mb-6">
              <a href="#">
                <img src="/img/logo.png" alt="Logo" className="mb-6" />
              </a>
              <p className="text-gray-400 leading-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                dolore magna aliqua.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 text-lg">
                <i className="fa fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 text-lg">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 text-lg">
                <i className="fa fa-youtube-play"></i>
              </a>
              <a href="#" className="text-gray-400 text-lg">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 text-lg">
                <i className="fa fa-envelope-o"></i>
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div className="sm:col-span-1 md:col-span-1 lg:col-span-1">
            <h4 className="text-white font-semibold mb-4">Useful Links</h4>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Classes</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="sm:col-span-1 md:col-span-1 lg:col-span-1">
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="#">Login</a>
              </li>
              <li>
                <a href="#">My Account</a>
              </li>
              <li>
                <a href="#">Subscribe</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          {/* Tips & Guides */}
          <div className="sm:col-span-2 md:col-span-1 lg:col-span-2">
            <h4 className="text-white font-semibold mb-4">Tips & Guides</h4>
            <div className="border-b border-gray-700 pb-4 mb-4">
              <h6 className="text-gray-400">
                <a href="#">Physical fitness may help prevent depression, anxiety</a>
              </h6>
              <ul className="text-sm text-gray-500 flex space-x-4">
                <li>3 min read</li>
                <li>20 Comments</li>
              </ul>
            </div>
            <div>
              <h6 className="text-gray-400">
                <a href="#">Fitness: The best exercise to lose belly fat and tone up...</a>
              </h6>
              <ul className="text-sm text-gray-500 flex space-x-4">
                <li>3 min read</li>
                <li>20 Comments</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center border-t border-gray-700 mt-8 py-6">
          <p className="text-gray-400 text-sm">
            Copyright &copy; {new Date().getFullYear()} All rights reserved 
          </p>
        </div>
      </div>
    </section>
  );
}
