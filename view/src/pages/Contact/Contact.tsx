import StieBreadcrumb from '../../components/Breadcrumbs/StieBreadcrumb';
import Footer from '../../components/Footer/Footer';
import GetInTouch from '../../components/GetInTouch/GetInTouch';

export default function Contact() {
  return (
    <>
      {/* Breadcrumb Section Begin */}
      <StieBreadcrumb />
      {/* Breadcrumb Section End */}

      {/* <!-- Contact Form --> */}
      <div className="bg-black-2 shadow-default shrink-0 justify-center px-10 md:px-25 lg:px-50 py-20">
        {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-[#c4c4c4] dark:text-white">Contact Form</h3>
            </div> */}
        <form action="">
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-[#c4c4c4]">
                  First name <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full rounded border-[1.5px] border-[#545454] bg-transparent py-3 px-5 text-[#c4c4c4] outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-[#c4c4c4]">
                  Last name <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full rounded border-[1.5px] border-[#545454] bg-transparent py-3 px-5 text-[#c4c4c4] outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                />
              </div>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-[#c4c4c4]">
                Email <span className="text-meta-1">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded border-[1.5px] border-[#545454] bg-transparent py-3 px-5 text-[#c4c4c4] outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-[#c4c4c4]">
                Subject <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your subject"
                className="w-full rounded border-[1.5px] border-[#545454] bg-transparent py-3 px-5 text-[#c4c4c4] outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block text-[#c4c4c4]">
                Message <span className="text-meta-1">*</span>
              </label>
              <textarea
                rows={6}
                placeholder="Type your message"
                className="w-full rounded border-[1.5px] border-[#545454] bg-transparent py-3 px-5 text-[#c4c4c4] outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
              ></textarea>
            </div>

            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Send Message
            </button>
          </div>
        </form>

        <div className="">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12087.069761554938!2d-74.2175599360452!3d40.767139456514954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c254b5958982c3%3A0xb6ab3931055a2612!2sEast%20Orange%2C%20NJ%2C%20USA!5e0!3m2!1sen!2sbd!4v1581710470843!5m2!1sen!2sbd"
            height="550"
          ></iframe>
        </div>
      </div>

      {/* Get In Touch Section Begin */}
      <GetInTouch />
      {/* Get In Touch Section End  */}

      {/* Footer Section Begin */}
      <Footer />
      {/* Footer Section End */}
    </>
  );
}
