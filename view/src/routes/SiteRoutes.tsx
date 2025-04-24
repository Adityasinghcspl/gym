import { Route, Routes } from 'react-router-dom';
import DefaultSiteLayout from '../layout/DefaultSiteLayout';
import PageTitle from '../components/PageTitle';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Service from '../pages/Service/Services';
import OurTeam from '../pages/OurTeam/OurTeam';
import Contact from '../pages/Contact/Contact';
import SiteLogin from '../pages/Authentication/SiteLogin';
import BookAppointment from '../pages/BookAppointment/BookAppointment';
import SiteResetPassword from '../pages/Authentication/SiteResetPassword';

export default function SiteRoutes() {
  return (
    <>
      <DefaultSiteLayout>
        <Routes>
          <Route
            path="/login"
            element={
              <>
                <PageTitle title="LogIn" />
                <SiteLogin />
              </>
            }
          />
          <Route
            path="/appointment"
            element={
              <>
                <PageTitle title="Book Appointment" />
                <BookAppointment />
              </>
            }
          />
          <Route
            path="/api/user/password-reset/:userId/:token"
            element={
              <>
                <PageTitle title="Reset Password" />
                <SiteResetPassword />
              </>
            }
          />
          <Route
            index
            element={
              <>
                <PageTitle title="Home" />
                <Home />
              </>
            }
          />
          <Route
            path="/about-us"
            element={
              <>
                <PageTitle title="About US" />
                <About />
              </>
            }
          />
          <Route
            path="/services"
            element={
              <>
                <PageTitle title="Services" />
                <Service />
              </>
            }
          />
          <Route
            path="/our-team"
            element={
              <>
                <PageTitle title="Our Team" />
                <OurTeam />
              </>
            }
          />
          <Route
            path="/contact-us"
            element={
              <>
                <PageTitle title="Contact-Us" />
                <Contact />
              </>
            }
          />
        </Routes>
      </DefaultSiteLayout>
    </>
  );
}
