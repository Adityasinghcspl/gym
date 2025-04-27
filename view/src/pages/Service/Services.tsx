import Banner from '../../components/Banner/Banner';
import StieBreadcrumb from '../../components/Breadcrumbs/StieBreadcrumb';
import Footer from '../../components/Footer/Footer';
import GetInTouch from '../../components/GetInTouch/GetInTouch';
import Pricing from '../../components/Pricing/Pricing';

const services = [
  {
    image: 'img/services/services-1.jpg',
    title: 'Personal training',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut dolore facilisis.',
  },
  {
    image: 'img/services/services-2.jpg',
    title: 'Group fitness classes',
    description: 'Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus.',
  },
  {
    image: 'img/services/services-3.jpg',
    title: 'Strength training',
    description: 'Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus.',
  },
  {
    image: 'img/services/services-4.jpg',
    title: 'Body building',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut dolore facilisis.',
  },
];

export default function Service() {
  return (
    <>
      {/* Breadcrumb Section Begin */}
      <StieBreadcrumb />
      {/* Breadcrumb Section End */}

      {/* Services Section Begin  */}
      <section className="bg-[#151515] py-10 md:py-15 lg:py-20">
        <div className="container mx-auto px-4 md:px-20 lg:px-40">
          {/* Section Header */}
          <div className="text-center mb-10">
            <span className="text-orange-500 uppercase tracking-wide text-xl font-extrabold">What we do?</span>
            <h2 className="text-white text-3xl font-bold mt-5">PUSH YOUR LIMITS FORWARD</h2>
          </div>
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center group">
                {/* Conditional Layout for Alternating Rows */}
                {index === 0 || index === 1 ? (
                  <>
                    {/* Image First */}
                    <div className="w-full md:w-1/2 h-72">
                      <img src={service.image} alt={service.title} className="object-cover w-full h-full" />
                    </div>
                    {/* Text Section */}
                    <div className="w-full md:w-1/2 bg-[#252525] p-8 flex flex-col justify-center h-72 relative group-hover:bg-[#363636] transition">
                      <h4 className="text-white text-lg font-semibold mb-2">{service.title}</h4>
                      <p className="text-gray-300 text-sm mb-4">{service.description}</p>
                      {/* <a href="#" className="uppercase text-white font-bold text-sm hover:text-orange-500 transition">
                        Explore
                      </a> */}
                      {/* Arrow Indicator */}
                      <div className="absolute w-5 h-5 bg-[#252525] rotate-45 transform top-1/2 -left-2 group-hover:bg-[#363636] transition" />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Text Section First for Second Row First Column */}
                    <div className="w-full md:w-1/2 bg-[#252525] p-8 flex flex-col justify-center h-72 relative group-hover:bg-[#363636] transition">
                      <h4 className="text-white text-lg font-semibold mb-2">{service.title}</h4>
                      <p className="text-gray-300 text-sm mb-4">{service.description}</p>
                      {/* <a href="#" className="uppercase text-white font-bold text-sm hover:text-orange-500 transition">
                        Explore
                      </a> */}
                      {/* Arrow Indicator */}
                      <div className="absolute w-5 h-5 bg-[#252525] rotate-45 transform top-1/2 -right-2 group-hover:bg-[#363636] transition" />
                    </div>
                    {/* Image Second */}
                    <div className="w-full md:w-1/2 h-72">
                      <img src={service.image} alt={service.title} className="object-cover w-full h-full" />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Services Section End  */}

      {/* Banner Section Begin */}
      <Banner />
      {/* Banner Section End */}

      {/* Pricing Section Begin */}
      <Pricing />
      {/* Pricing Section End  */}

      {/* Get In Touch Section Begin */}
      <GetInTouch />
      {/* Get In Touch Section End  */}

      {/* Footer Section Begin */}
      <Footer />
      {/* Footer Section End */}
    </>
  );
}
