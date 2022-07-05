import { motion } from 'framer-motion';
import Services from '../components/Services';

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
  return (
    <>
      <div className='home pt-8'>
        <div className='container'>
          <div className='home-content'>
            <div className='row'>
              <div className='col-12 col-lg-6 pt-5'>
                <motion.div
                  className='banner mb-7 pr-lg-3'
                  transition={{ duration: 0.3, type: 'spring' }}
                  initial={{ opacity: 0, x: '100%' }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className='line'>SOME TEXT</div>
                  <div className='text'>Online Coaching Lessons Remote Learning</div>
                </motion.div>
              </div>
              <div className='avatar col-12 col-lg-6'>
                <motion.img
                  src='images/hero-img.png'
                  alt='avatar'
                  transition={{ duration: 0.3, type: 'spring' }}
                  initial={{ opacity: 0, x: '-100%' }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          </div>
        </div>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
          <path
            fill='#ffffff'
            fillOpacity='1'
            d='M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
          ></path>
        </svg>
      </div>
      <Services />
    </>
  );
};

export default Home;
