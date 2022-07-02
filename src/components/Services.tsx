import {
  FaLaptopCode,
  FaMobileAlt,
  FaCodepen,
  FaPaperPlane,
  FaPlane,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ServicesProps {}

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      // type: 'spring',
      // stiffness: 100,
    },
  },
  hover: {
    y: -20,
  },
};

const items = [
  {
    title: 'Web Development',
    color: 'green',
    icon: <FaLaptopCode className='icon' />,
  },
  {
    title: 'Web Development',
    color: 'crimson',
    icon: <FaMobileAlt className='icon' />,
  },
  {
    title: 'Web Development',
    color: 'yellow',
    icon: <FaPlane className='icon' />,
  },
  {
    title: 'Web Development',
    color: 'primary',
    icon: <FaPaperPlane className='icon' />,
  },
  {
    title: 'Web Development',
    color: 'pink',
    icon: <FaCodepen className='icon' />,
  },
];

const Services: React.FC<ServicesProps> = (props) => {
  return (
    <div className='services py-5'>
      <div className='container'>
        <div className='title'>الخدمات اللتى نقدمها</div>
        <div className='cards'>
          <div className='row g-1'>
            {items.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial='hidden'
                whileInView='visible'
                whileHover='hover'
                viewport={{ once: true }}
                className={`card bg-${item.color} col-12 col-md-6 col-lg-3`}
              >
                {item.icon}
                <h3>{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
