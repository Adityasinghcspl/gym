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
import BMICalculator from '../pages/BMICalculator/BMICalculator';
import Exercise from '../pages/Exercises/Exercise';
import { useEffect, useState } from 'react';
import { isAuthenticated } from '../utils/Utils';
import NotFound from '../pages/NotFound/NotFound';

export default function SiteRoutes() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(isAuthenticated());

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthorized(isAuthenticated());
    };

    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);
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
          {isAuthorized ? (
            <>
              <Route
                path="/bmi-calculator"
                element={
                  <>
                    <PageTitle title="BMI-Calculator" />
                    <BMICalculator />
                  </>
                }
              />
              <Route
                path="/exercise"
                element={
                  <>
                    <PageTitle title="Exercise" />
                    <Exercise />
                  </>
                }
              />
            </>
          ) : null}
          {/* 404 Page Route (always at the bottom) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DefaultSiteLayout>
    </>
  );
}
