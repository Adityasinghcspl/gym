export default function ChoseUs() {
  return (
    <section className="choseus-section spad">
      <div className="px-4 py-20 bg-[#0a0a0a]">
        {/* Section Title */}
        <div className="text-center">
          <span className="text-xl font-semibold text-orange-500">Why choose us?</span>
          <h2 className="text-3xl font-extrabold mt-4 text-white">PUSH YOUR LIMITS FORWARD</h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 px-20">
          {/* Feature Item 1 */}
          <div className="flex flex-col items-center text-center">
            <span className="flaticon-034-stationary-bike flex items-center justify-center w-24 h-24 bg-white/10 text-orange-500 rounded-full text-4xl transition-all duration-300 hover:bg-orange-500 hover:text-white"></span>
            <h4 className="text-2xl font-semibold mt-4 text-white">Modern equipment</h4>
            <p className="mt-2 text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore
              facilisis.
            </p>
          </div>

          {/* Feature Item 2 */}
          <div className="flex flex-col items-center text-center">
            <span className="flaticon-033-juice flex items-center justify-center w-24 h-24 bg-white/10 text-orange-500 rounded-full text-4xl transition-all duration-300 hover:bg-orange-500 hover:text-white"></span>
            <h4 className="text-2xl font-semibold mt-4 text-white">Healthy nutrition plan</h4>
            <p className="mt-2 text-gray-400">
              Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </p>
          </div>

          {/* Feature Item 3 */}
          <div className="flex flex-col items-center text-center">
            <span className="flaticon-002-dumbell flex items-center justify-center w-24 h-24 bg-white/10 text-orange-500 rounded-full text-4xl transition-all duration-300 hover:bg-orange-500 hover:text-white"></span>
            <h4 className="text-2xl font-semibold mt-4 text-white">Professional training plan</h4>
            <p className="mt-2 text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore
              facilisis.
            </p>
          </div>

          {/* Feature Item 4 */}
          <div className="flex flex-col items-center text-center">
            <span className="flaticon-014-heart-beat flex items-center justify-center w-24 h-24 bg-white/10 text-orange-500 rounded-full text-4xl transition-all duration-300 hover:bg-orange-500 hover:text-white"></span>
            <h4 className="text-2xl font-semibold mt-4 text-white">Unique to your needs</h4>
            <p className="mt-2 text-gray-400">
              Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
