import StieBreadcrumb from '../../components/Breadcrumbs/StieBreadcrumb';
import ChoseUs from '../../components/ChoseUs/ChoseUs';
import GymTeam from '../../components/GymTeam/GymTeam';
import Banner from '../../components/Banner/Banner';
import TestimonialCarousel from '../../components/Testimonial/TestimonialCarousel';
import GetInTouch from '../../components/GetInTouch/GetInTouch';
import Footer from '../../components/Footer/Footer';

export default function About() {
  return (
    <>
      {/* Breadcrumb Section Begin */}
      <StieBreadcrumb />
      {/* Breadcrumb Section End */}

      {/* ChoseUs Section Begin */}
      <ChoseUs />
      {/* ChoseUs Section End */}

      {/* Our Teams Begin */}
      <GymTeam />
      {/* Our Teams End */}

      {/* Banner Section Begin */}
      <Banner />
      {/* Banner Section End */}

      {/* Testimonial Section Begin */}
      <TestimonialCarousel />
      {/* Testimonial Section End */}

      {/* Get In Touch Section Begin */}
      <GetInTouch />
      {/* Get In Touch Section End  */}

      {/* Footer Section Begin */}
      <Footer />
      {/* Footer Section End */}
    </>
  );
}
