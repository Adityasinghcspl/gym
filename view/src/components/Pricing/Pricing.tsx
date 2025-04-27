import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/Utils';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getAllMemberships } from '../../redux/features/membership/membershipSlice';

export default function Pricing() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { membershipsList } = useSelector((state: RootState) => state.membership);

  const pricingPlans = [
    {
      type: 'Monthly',
      price: '800',
      durationInMonths: '1',
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
      type: 'Quarterly',
      price: '2,000',
      durationInMonths: '3',
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
      type: 'Half-Yearly',
      price: '4,800',
      durationInMonths: '6',
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
      type: 'Yearly',
      price: '8,000',
      durationInMonths: '12',
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

  useEffect(() => {
    dispatch(getAllMemberships());
  }, [dispatch]);

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
        {(membershipsList.data && membershipsList.data.length > 0 ? membershipsList.data : pricingPlans).map((plan, index) => (
            <div
              key={index}
              className="ps-item relative text-center p-10 border border-gray-600 skew-y-[-4deg] transition-all duration-500 hover:bg-white hover:border-white"
            >
              {/* Title */}
              <h3 className="text-2xl text-white font-semibold mb-4 skew-y-[4deg] transition-all duration-500 hover:text-black">
                {plan.type}
              </h3>
              {/* Price */}
              <div className="pi-price mb-6 skew-y-[4deg]">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-orange-500 font-semibold">₹{plan.price}</h2>
                <span className="text-gray-400 text-lg font-bold uppercase">{plan.durationInMonths} Months</span>
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
              {/* <button
                onClick={handleEnrollClick}
                className="w-full text-center bg-gray-800 text-white py-3 font-bold uppercase rounded-md transition-all duration-300 hover:bg-orange-600 skew-y-[4deg]"
              >
                Enroll Now
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
