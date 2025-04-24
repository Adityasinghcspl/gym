import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Link } from 'react-router-dom';

const teamMembers = [
  {
    name: 'Athart Rachel',
    role: 'Gym Trainer',
    image: '/img/team/team-1.jpg',
  },
  { name: 'John Doe', role: 'Fitness Coach', image: '/img/team/team-2.jpg' },
  {
    name: 'Jane Smith',
    role: 'Personal Trainer',
    image: '/img/team/team-3.jpg',
  },
  {
    name: 'Michael Lee',
    role: 'Yoga Instructor',
    image: '/img/team/team-4.jpg',
  },
  {
    name: 'Sarah Connor',
    role: 'Crossfit Coach',
    image: '/img/team/team-5.jpg',
  },
];

export default function GymTeam() {
  return (
    <div className="bg-[#151515] py-16 px-5 sm:px-1 lg:px-20 xl:px-30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <div className="text-left">
            <span className="text-orange-500 uppercase text-sm font-semibold">Our Team</span>
            <h2 className="text-3xl font-bold text-white">TRAIN WITH EXPERTS</h2>
          </div>
          <Link
            to="/appointment"
            className="border-2 border-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-500 transition"
          >
            Appointment
          </Link>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={3} // Show 3 slides at a time
          slidesPerGroup={1} // Move 1 slide at a time
          pagination={{
            clickable: true,
            dynamicBullets: true,
            renderBullet: (className) => `<span class="${className} !bg-gray-500 !w-3 !h-3 !mx-1 rounded-full"></span>`,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false, // Ensures autoplay continues even after interaction
          }}
          loop={true} // Keeps carousel moving continuously in one direction
          breakpoints={{
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
          }}
          className="pb-10"
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={index}>
              <div className="class-item relative group rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                <img src={member.image} alt={member.name} className="w-full object-cover" />

                {/* Hidden by default, appears on hover */}
                <div className="ci-text absolute bottom-0 left-0 w-full bg-[#0a0a0a] p-6 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <h5 className="text-white text-2xl font-semibold mt-2">{member.name}</h5>
                  <span className="text-orange-500 uppercase font-bold text-sm">{member.role}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
