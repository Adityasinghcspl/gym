// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

import SiteRoutes from './routes/SiteRoutes';
import DashboardRoutes from './routes/DashboardRoutes';
import { ToastContainer } from 'react-toastify';

function App() {
  // const [loading, setLoading] = useState<boolean>(false);
  // const { pathname } = useLocation();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  // Check if running on dashboard subdomain
  const isDashboard = window.location.hostname === 'dashboard.localhost';
  const isDarkMode = document.documentElement.classList.contains('dark');
  // return loading ? (
  // <Loader />
  return (
    <>
      {isDashboard ? <DashboardRoutes /> : <SiteRoutes />}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme={isDarkMode ? 'dark' : 'light'}
      />
    </>
  );
}

export default App;
