import DefaultLayout from '../layout/DefaultLayout';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import ECommerce from '../pages/Dashboard/ECommerce';
import Calendar from '../pages/Calendar';
import Profile from '../pages/Profile';
import FormElements from '../pages/Form/FormElements';
import FormLayout from '../pages/Form/FormLayout';
import Tables from '../pages/Tables';
import Settings from '../pages/Settings';
import Alerts from '../pages/UiElements/Alerts';
import Buttons from '../pages/UiElements/Buttons';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import { useEffect, useState } from 'react';

export default function DashboardRoutes() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(!!localStorage.getItem('accessToken'));

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthorized(!!localStorage.getItem('accessToken'));
    };

    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  console.log(isAuthorized, 'localStorage.getItem', localStorage.getItem('accessToken'));
  if (!isAuthorized) {
    return (
      <Routes>
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Sign In" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Sign Up" />
              <SignUp />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/auth/signin" replace />} />
      </Routes>
    );
  }

  return (
    <>
      <DefaultLayout>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <PageTitle title="Gym Admin Dashboard" />
                <ECommerce />
              </>
            }
          />
          <Route
            path="/calendar"
            element={
              <>
                <PageTitle title="Calendar | Admin Dashboard" />
                <Calendar />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile | Admin Dashboard" />
                <Profile />
              </>
            }
          />
          <Route
            path="/forms/form-elements"
            element={
              <>
                <PageTitle title="Form Elements | Admin Dashboard" />
                <FormElements />
              </>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <>
                <PageTitle title="Form Layout | Admin Dashboard" />
                <FormLayout />
              </>
            }
          />
          <Route
            path="/tables"
            element={
              <>
                <PageTitle title="Tables | Admin Dashboard" />
                <Tables />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings | Admin Dashboard" />
                <Settings />
              </>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <>
                <PageTitle title="Alerts | Admin Dashboard" />
                <Alerts />
              </>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <>
                <PageTitle title="Buttons | Admin Dashboard" />
                <Buttons />
              </>
            }
          />  
          <Route path="/auth/*" element={<Navigate to="/" replace />} />
        </Routes>
      </DefaultLayout>
    </>
  );
}
