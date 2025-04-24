import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/Utils';

export default function Pricing() {
  const navigate = useNavigate();

  const pricingPlans = [
    {
      title: 'Class Drop-in',
      price: '₹800',
      duration: 'Single Class',
      features: [
        'Free riding',
        'Unlimited equipments',
        'Personal trainer',
        'Weight losing classes',
        'Month to mouth',
        'No time restriction',
      ],
    },
    {
      title: '3 Month Unlimited',
      price: '₹2,000',
      duration: '3 Months',
      features: [
        'Free riding',
        'Unlimited equipments',
        'Personal trainer',
        'Weight losing classes',
        'Month to mouth',
        'No time restriction',
      ],
    },
    {
      title: '6 Month Unlimited',
      price: '₹4,800',
      duration: '6 Months',
      features: [
        'Free riding',
        'Unlimited equipments',
        'Personal trainer',
        'Weight losing classes',
        'Month to mouth',
        'No time restriction',
      ],
    },
    {
      title: '12 Month Unlimited',
      price: '₹8,000',
      duration: '12 Months',
      features: [
        'Free riding',
        'Unlimited equipments',
        'Personal trainer',
        'Weight losing classes',
        'Month to mouth',
        'No time restriction',
      ],
    },
  ];

  const handleEnrollClick = () => {
    if (!isAuthenticated()) {
      navigate('/login');
    } else {
      navigate('/payment');
    }
  };

  return (
    <section className="bg-[#151515] py-20">
      <div className="container mx-auto sm:px-10 lg:px-0 xl:px-20">
        {/* Section Title */}
        <div className="text-center mb-20">
          <span className="text-lg font-semibold text-orange-500 uppercase">Our Plan</span>
          <h2 className="text-4xl font-extrabold mt-3 text-white uppercase">Choose your pricing plan</h2>
        </div>
        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="ps-item relative text-center p-10 border border-gray-600 skew-y-[-4deg] transition-all duration-500 hover:bg-white hover:border-white"
            >
              {/* Title */}
              <h3 className="text-2xl text-white font-semibold mb-4 skew-y-[4deg] transition-all duration-500 hover:text-black">
                {plan.title}
              </h3>
              {/* Price */}
              <div className="pi-price mb-6 skew-y-[4deg]">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-orange-500 font-semibold">{plan.price}</h2>
                <span className="text-gray-400 text-lg font-bold uppercase">{plan.duration}</span>
              </div>
              {/* Features List */}
              <ul className="mb-8 skew-y-[4deg]">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-gray-400 text-sm leading-8 transition-all duration-500 hover:text-black">
                    {feature}
                  </li>
                ))}
              </ul>
              {/* Enroll Button */}
              <button
                onClick={handleEnrollClick}
                className="w-full text-center bg-gray-800 text-white py-3 font-bold uppercase rounded-md transition-all duration-300 hover:bg-orange-600 skew-y-[4deg]"
              >
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
