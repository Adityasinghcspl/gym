import SiteRoutes from './routes/SiteRoutes';
import DashboardRoutes from './routes/DashboardRoutes';
import { ToastContainer } from 'react-toastify';

function App() {
  // Check if running on dashboard subdomain
  const isDashboard = window.location.hostname === 'dashboard.localhost';
  const isDarkMode = document.documentElement.classList.contains('dark');

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
