export default function Banner() {
  return (
    <>
      <section
        className="relative h-[550px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/img/banner-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase mb-6">
            Registration now to get more deals
          </h2>
          <div className="text-lg sm:text-xl text-gray-300 font-semibold uppercase mb-8">
            Where health, beauty, and fitness meet.
          </div>
          <a
            href="#"
            className="inline-block border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-lg text-lg font-semibold uppercase transition duration-300 hover:bg-orange-500 hover:text-white"
          >
            Appointment
          </a>
        </div>
      </section>
    </>
  );
}
