const classes = [
  {
    title: 'Weightlifting',
    category: 'Strength',
    img: '/img/classes/class-1.jpg',
  },
  {
    title: 'Indoor Cycling',
    category: 'Cardio',
    img: '/img/classes/class-2.jpg',
  },
  {
    title: 'Kettlebell Power',
    category: 'Strength',
    img: '/img/classes/class-3.jpg',
  },
  {
    title: 'Indoor Cycling',
    category: 'Cardio',
    img: '/img/classes/class-4.jpg',
  },
  { title: 'Boxing', category: 'Training', img: '/img/classes/class-5.jpg' },
];

export default function Classes() {
  return (
    <section className="bg-[#151515] py-20">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <span className="text-lg font-semibold text-orange-500 uppercase">Our Classes</span>
          <h2 className="text-4xl font-extrabold mt-3 text-white">WHAT WE CAN OFFER</h2>
        </div>

        {/* Class Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((item, index) => (
            <div key={index} className="class-item overflow-hidden rounded-lg">
              {/* Class Image */}
              <div className="ci-pic w-full">
                <img src={item.img} alt={item.title} className="w-full object-cover" />
              </div>

              {/* Class Text */}
              <div className="ci-text relative bg-[#0a0a0a] p-6">
                <span className="text-orange-500 uppercase font-bold text-sm">{item.category}</span>
                <h5 className="text-white text-2xl font-semibold mt-2">{item.title}</h5>

                {/* Arrow Button */}
                <a href="#" className="arrow-btn absolute bottom-4 right-4">
                  <i className="fa fa-angle-right text-white text-2xl"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
