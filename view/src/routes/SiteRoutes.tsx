import { Route, Routes } from 'react-router-dom';
import DefaultSiteLayout from '../layout/DefaultSiteLayout';
import PageTitle from '../components/PageTitle';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Service from '../pages/Service/Services';
import OurTeam from '../pages/OurTeam/OurTeam';
import Contact from '../pages/Contact/Contact';

export default function SiteRoutes() {
  return (
    <>
      <DefaultSiteLayout>
        <Routes>
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
            index
            path="/about-us"
            element={
              <>
                <PageTitle title="About US" />
                <About />
              </>
            }
          />
          <Route
            index
            path="/services"
            element={
              <>
                <PageTitle title="Services" />
                <Service />
              </>
            }
          />
          <Route
            index
            path="/our-team"
            element={
              <>
                <PageTitle title="Our Team" />
                <OurTeam />
              </>
            }
          />
          <Route
            index
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
