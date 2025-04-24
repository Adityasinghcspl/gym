import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userResetPassword } from '../../redux/features/auth/authSlice';

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

const SiteResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { userId, token } = useParams<{ userId: string; token: string }>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordForm>();

  const onSubmit: SubmitHandler<ResetPasswordForm> = async (data) => {
    if (!userId || !token) {
      toast.error('Invalid or expired reset link.');
      return;
    }

    await toast.promise(
      dispatch(userResetPassword({ id: userId, token, password: data.password }))
        .unwrap()
        .then(() => {
          navigate('/login');
        }),
      {
        pending: 'Password Reset....',
        success: 'Password Reset successfully!',
        error: {
          render({ data }) {
            console.log(data);
            return (data as string) || 'Failed to Reset Password.';
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
          <h2 className="text-3xl font-bold text-white text-center mb-6">Reset Password</h2>

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* New Password Field */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="New Password"
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
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
              {errors.password && <p className="text-sm text-red-300 mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 pr-12 rounded-md bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === watch('password') || 'Passwords do not match',
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-xl"
                onClick={() => setShowConfirm((prev) => !prev)}
              >
                {showConfirm ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
              {errors.confirmPassword && <p className="text-sm text-red-300 mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 transition duration-300 text-white font-semibold py-2 rounded-md"
            >
              Reset Password
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default SiteResetPassword;
