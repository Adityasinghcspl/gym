import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { SignInUserForm } from '../../types/type';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { signInUser, userSendResetPasswordLink } from '../../redux/features/auth/authSlice';
import { AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

interface ResetPasswordForm {
  email: string;
}

const SiteLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isResetMode, setIsResetMode] = useState<boolean>(false);

  // Login form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInUserForm>();

  // Reset form
  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
  } = useForm<ResetPasswordForm>();

  const onLoginSubmit: SubmitHandler<SignInUserForm> = async (data) => {
    await toast.promise(
      dispatch(signInUser(data))
        .unwrap()
        .then(() => {
          window.dispatchEvent(new Event('storage'));
          navigate('/');
        }),
      {
        pending: 'Signing in...',
        success: 'Login successful!',
        error: {
          render({ data }) {
            return (data as string) || 'Login failed';
          },
        },
      },
    );
  };

  const onResetSubmit: SubmitHandler<ResetPasswordForm> = async (data) => {
    await toast.promise(
      dispatch(userSendResetPasswordLink(data.email))
        .unwrap()
        .then(() => {
          setIsResetMode(true);
        }),
      {
        pending: 'Password reset link sent to your email....',
        success: 'Send email successfully!',
        error: {
          render({ data }) {
            return (data as string) || 'Failed to send reset link.';
          },
        },
      },
    );
  };

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/img/hero/hero-1.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />

      {/* Form Card */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-xl p-8 sm:p-12 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            {isResetMode ? 'Forgot Password' : 'Log In'}
          </h2>

          {isResetMode ? (
            <form className="flex flex-col space-y-4" onSubmit={handleResetSubmit(onResetSubmit)}>
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  {...registerReset('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email format',
                    },
                  })}
                />
                {typeof resetErrors.email?.message === 'string' && (
                  <p className="text-sm text-red-300 mt-1">{resetErrors.email.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 transition duration-300 text-white font-semibold py-2 rounded-md"
              >
                Send Reset Link
              </button>

              <p className="text-sm text-white text-center mt-4">
                Remembered your password?{' '}
                <button type="button" className="text-orange-400 underline" onClick={() => setIsResetMode(false)}>
                  Back to Login
                </button>
              </p>
            </form>
          ) : (
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onLoginSubmit)}>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email format',
                    },
                  })}
                />
                {typeof errors.email?.message === 'string' && (
                  <p className="text-sm text-red-300 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full px-4 py-2 pr-12 rounded-md bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-xl"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </button>
                </div>
                {typeof errors.password?.message === 'string' && (
                  <p className="text-sm text-red-300 mt-1">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 transition duration-300 text-white font-semibold py-2 rounded-md"
              >
                Log In
              </button>

              <p className="text-sm text-white text-center mt-4">
                Forgot your password?{' '}
                <button type="button" className="text-orange-400 underline" onClick={() => setIsResetMode(true)}>
                  Reset it here
                </button>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SiteLogin;
