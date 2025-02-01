export default function Pricing() {
  const pricingPlans = [
    {
      title: 'Class Drop-in',
      price: '$39.0',
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
      title: '12 Month Unlimited',
      price: '$99.0',
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
      title: '6 Month Unlimited',
      price: '$59.0',
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
  ];

  return (
    <section className="bg-[#151515] py-20">
      <div className="container mx-auto px-8 sm:px-10 lg:px-20 xl:px-40">
        {/* Section Title */}
        <div className="text-center mb-12">
          <span className="text-lg font-semibold text-orange-500 uppercase">Our Plan</span>
          <h2 className="text-4xl font-extrabold mt-3 text-white">Choose your pricing plan</h2>
        </div>
        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
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
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-orange-500 font-semibold">{plan.price}</h2>
                <span className="text-gray-400 text-lg font-bold uppercase">{plan.duration}</span>
              </div>
              {/* Features List */}
              <ul className="mb-8 skew-y-[4deg]">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-gray-400 text-sm leading-8 transition-all duration-500 hover:text-black ">
                    {feature}
                  </li>
                ))}
              </ul>
              {/* Enroll Button */}
              <a
                href="#"
                className="primary-btn block bg-gray-700 text-white px-6 py-3 font-bold uppercase rounded-md transition-all duration-500 hover:bg-orange-600 skew-y-[4deg]"
              >
                Enroll Now
              </a>
              {/* Icon */}
              <a
                href="#"
                className="thumb-icon absolute left-12 bottom-28 text-5xl text-orange-500 opacity-0 transition-all duration-500 hover:opacity-100"
              >
                <i className="fa fa-picture-o"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
