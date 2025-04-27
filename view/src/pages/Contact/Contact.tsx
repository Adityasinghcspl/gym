import { useForm, SubmitHandler } from 'react-hook-form';
import StieBreadcrumb from '../../components/Breadcrumbs/StieBreadcrumb';
import Footer from '../../components/Footer/Footer';
import GetInTouch from '../../components/GetInTouch/GetInTouch';
import { ContactFormInputs } from '../../types/type';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { contactUS } from '../../redux/features/user/userSlice';
import { useState } from 'react';

export default function Contact() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      setLoading(true); // ✅ show loader
      const result = await dispatch(contactUS(data));
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
    <>
      {/* Breadcrumb Section Begin */}
      <StieBreadcrumb />
      {/* Breadcrumb Section End */}

      {/* Contact Form */}
      <div className="bg-black-2 shadow-default shrink-0 justify-center px-10 md:px-25 lg:px-50 py-20">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              {/* First Name */}
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-[#c4c4c4]">
                  First name <span className="text-meta-1">*</span>
                </label>
                <input
                  {...register('firstName', { required: 'First name is required' })}
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full rounded border-[1.5px] border-[#545454] bg-transparent py-3 px-5 text-[#c4c4c4] outline-none transition focus:border-primary active:border-primary"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
              </div>

              {/* Last Name */}
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-[#c4c4c4]">
                  Last name <span className="text-meta-1">*</span>
                </label>
                <input
                  {...register('lastName', { required: 'Last name is required' })}
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full rounded border-[1.5px] border-[#545454] bg-transparent py-3 px-5 text-[#c4c4c4] outline-none transition focus:border-primary active:border-primary"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Email */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-[#c4c4c4]">
                Email <span className="text-meta-1">*</span>
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/, message: 'Invalid email address' },
                })}
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded border-[1.5px] border-[#545454] bg-transparent py-3 px-5 text-[#c4c4c4] outline-none transition focus:border-primary active:border-primary"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Subject */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-[#c4c4c4]">
                Subject <span className="text-meta-1">*</span>
              </label>
              <input
                {...register('subject', { required: 'Subject is required' })}
                type="text"
                placeholder="Enter your subject"
                className="w-full rounded border-[1.5px] border-[#545454] bg-transparent py-3 px-5 text-[#c4c4c4] outline-none transition focus:border-primary active:border-primary"
              />
              {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="mb-2.5 block text-[#c4c4c4]">
                Message <span className="text-meta-1">*</span>
              </label>
              <textarea
                {...register('message', { required: 'Message is required' })}
                rows={6}
                placeholder="Type your message"
                className="w-full rounded border-[1.5px] border-[#545454] bg-transparent py-3 px-5 text-[#c4c4c4] outline-none transition focus:border-primary active:border-primary"
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex w-full justify-center items-center gap-2 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 disabled:opacity-70"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              ) : (
                'Send Message'
              )}
            </button>
          </div>
        </form>

        {/* Map */}
        <div className="p-6.5 py-20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14232.304556241148!2d81.49680034503633!3d25.475220756195214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399db5d4d8e909a7%3A0x4f0c4a6e2558a8e5!2sBanda%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sbd!4v1581710470843!5m2!1sen!2sbd"
            width="100%"
            height="550"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Get In Touch Section */}
      <GetInTouch />

      {/* Footer Section */}
      <Footer />
    </>
  );
}
