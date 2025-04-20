import DefaultLayout from '../layout/DefaultLayout';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import ECommerce from '../pages/Dashboard/ECommerce';
import Calendar from '../pages/Calendar';
import Profile from '../pages/Profile';
import Trainer from '../pages/Trainer';
import Settings from '../pages/Settings';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import { useEffect, useState } from 'react';
import { isAuthenticated } from '../utils/Utils';
import User from '../pages/User';
import ResetPassword from '../pages/Authentication/ResetPassword';
import MemberShip from '../pages/MemberShip';

export default function DashboardRoutes() {
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
        <Route
          path="/api/trainer/password-reset/:userId/:token"
          element={
            <>
              <PageTitle title="Reset Password" />
              <ResetPassword />
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
            path="/trainers"
            element={
              <>
                <PageTitle title="Trainer | Admin Dashboard" />
                <Trainer />
              </>
            }
          />
          <Route
            path="/users"
            element={
              <>
                <PageTitle title="User | Admin Dashboard" />
                <User />
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
            path="/membership"
            element={
              <>
                <PageTitle title="MemberShip | Admin Dashboard" />
                <MemberShip />
              </>
            }
          />
          <Route path="/auth/*" element={<Navigate to="/" replace />} />
        </Routes>
      </DefaultLayout>
    </>
  );
}
