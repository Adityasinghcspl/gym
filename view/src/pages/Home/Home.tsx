import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ChoseUs from '../../components/ChoseUs/ChoseUs';
import Classes from '../../components/Classes/Classes';
import Banner from '../../components/Banner/Banner';
import Pricing from '../../components/Pricing/Pricing';
import Gallery from '../../components/Gallery/Gallery';
import GymTeam from '../../components/GymTeam/GymTeam';
import GetInTouch from '../../components/GetInTouch/GetInTouch';
import Footer from '../../components/Footer/Footer';

const images = ['/img/hero/hero-1.jpg', '/img/hero/hero-2.jpg'];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section Begin */}
      <section className="relative w-full h-screen overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            className="absolute inset-0 w-full h-full bg-cover"
            style={{ backgroundImage: `url(${images[currentIndex]})` }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="container mx-auto flex items-center pt-22 h-full">
              <div className="w-full lg:w-1/2 ml-auto text-white px-16">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="text-lg font-bold uppercase tracking-[5px] sm:tracking-[10px]">Shape your body</span>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-5 uppercase tracking-wide">
                    Be <strong className="text-[#f36100]">strong</strong> <br />
                    training hard
                  </h1>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
      {/* Hero Section End */}

      {/* ChoseUs Section Begin */}
      <ChoseUs />
      {/* ChoseUs Section End  */}

      {/* Classes Section Begin */}
      <Classes />
      {/* Classes Section End */}

      {/* Banner Section Begin */}
      <Banner />
      {/* Banner Section End */}

      {/* Pricing Section Begin */}
      <Pricing />
      {/* Pricing Section End  */}

      {/* Gallery Section Begin */}
      <Gallery />
      {/* Gallery Section End */}

      {/* Team Section Begin */}
      <GymTeam />
      {/* Team Section End */}

      {/* Get In Touch Section Begin */}
      <GetInTouch />
      {/* Get In Touch Section End  */}

      {/* Footer Section Begin */}
      <Footer />
      {/* Footer Section End */}
    </>
  );
};

export default Home;
