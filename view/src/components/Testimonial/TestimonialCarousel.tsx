import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';

const testimonials = [
  {
    id: 1,
    image: 'img/testimonial/testimonial-1.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    name: 'Marshmello Gomez',
    rating: 5,
  },
  {
    id: 2,
    image: 'img/testimonial/testimonial-2.jpg',
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    name: 'Marshmello Gomez',
    rating: 5,
  },
];

const TestimonialCarousel = () => {
  return (
    <section className="bg-[#151515] py-12 overflow-hidden">
      <div className="container mx-auto text-center px-4 lg:px-8 xl:px-30">
        <div className="mb-8">
          <span className="mt-4 mb-4 text-orange-500 font-bold uppercase">Testimonial</span>
          <h2 className="mt-4 mb-4 text-white text-3xl font-bold uppercase">Our Client Say</h2>
        </div>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          centeredSlides={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="flex justify-center">
              <div className="text-center p-6 flex flex-col items-center max-w-lg mx-auto w-full">
                <div className="flex justify-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-40 w-40 rounded-full border-4 border-gray-500"
                  />
                </div>
                <p className="text-gray-300 text-lg px-6">{testimonial.text}</p>
                <h5 className="text-white font-semibold uppercase mt-4">{testimonial.name}</h5>
                <div className="flex justify-center mt-2">
                  <div className="bg-yellow-500 px-3 py-1 rounded-md">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star text-white"></i>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
