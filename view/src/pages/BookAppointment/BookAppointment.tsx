import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import { AppointmentForm } from '../../types/type';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { bookAppointment } from '../../redux/features/user/userSlice';

export default function BookAppointment() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentForm>();

  const onSubmit: SubmitHandler<AppointmentForm> = async (data) => {
    try {
      setLoading(true); // ✅ show loader
      const result = await dispatch(bookAppointment(data));
      const payload = result.payload as { message: string };
      if (payload.message) {
        toast.success(payload.message);
        reset(); // ✅ reset form fields
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoading(false); // ✅ always hide loader
    }
  };

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/img/banner-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />

      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-xl p-8 sm:p-12 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-6">Book Appointment</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-white focus:ring-2 focus:ring-orange-500 outline-none"
            />
            {errors.name && <p className="text-sm text-red-300">{errors.name.message}</p>}

            <input
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email format',
                },
              })}
              className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-white focus:ring-2 focus:ring-orange-500 outline-none"
            />
            {errors.email && <p className="text-sm text-red-300">{errors.email.message}</p>}

            <input
              type="text"
              placeholder="Phone Number"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Phone number must be 10 digits',
                },
              })}
              className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-white focus:ring-2 focus:ring-orange-500 outline-none"
            />
            {errors.phone && <p className="text-sm text-red-300">{errors.phone.message}</p>}

            <input
              type="date"
              {...register('date', { required: 'Date is required' })}
              className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-white focus:ring-2 focus:ring-orange-500 outline-none"
            />
            {errors.date && <p className="text-sm text-red-300">{errors.date.message}</p>}

            <textarea
              placeholder="Message"
              {...register('message')}
              className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-white focus:ring-2 focus:ring-orange-500 outline-none"
            />

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-md w-full transition duration-300 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
