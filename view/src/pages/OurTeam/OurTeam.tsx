import StieBreadcrumb from '../../components/Breadcrumbs/StieBreadcrumb';
import GymTeam from '../../components/GymTeam/GymTeam';
import GetInTouch from '../../components/GetInTouch/GetInTouch';
import Footer from '../../components/Footer/Footer';

export default function OurTeam() {
  return (
    <>
      {/* Breadcrumb Section Begin */}
      <StieBreadcrumb />
      {/* Breadcrumb Section End */}

      {/* Team Section Begin */}
      <GymTeam />
      {/* Team Section End */}

      {/* Get In Touch Section Begin */}
      <GetInTouch />
      {/* Get In Touch Section End  */}
      
      {/* Footer Section Begin */}
      <Footer />
      {/* Footer Section End */}{' '}
    </>
  );
}
