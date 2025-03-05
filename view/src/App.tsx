import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import SiteRoutes from './routes/SiteRoutes';
import DashboardRoutes from './routes/DashboardRoutes';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const { pathname } = useLocation();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  // Check if running on dashboard subdomain
  const isDashboard = window.location.hostname === 'dashboard.localhost';

  // return loading ? (
  // <Loader />
  return isDashboard ? <DashboardRoutes /> : <SiteRoutes />;
}

export default App;
