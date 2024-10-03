import { easeInOut, motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './SliderCategory.scss';



const images = [
  { src: "https://dreamslms.dreamstechnologies.com/html/assets/img/categories-icon-02.png", title: "Angular Development", instructors: 40 },
  { src: "https://dreamslms.dreamstechnologies.com/html/assets/img/categories-icon-03.png", title: "Docker Development", instructors: 45 },
  { src: "https://dreamslms.dreamstechnologies.com/html/assets/img/categories-icon-04.png", title: "Node JS Frontend", instructors: 40 },
  { src: "https://dreamslms.dreamstechnologies.com/html/assets/img/categories-icon-04.png", title: "Swift Development", instructors: 23 },
  { src: "https://dreamslms.dreamstechnologies.com/html/assets/img/categories-icon-02.png", title: "Angular Development", instructors: 40 },
  { src: "https://dreamslms.dreamstechnologies.com/html/assets/img/categories-icon-03.png", title: "Docker Development", instructors: 45 },
  { src: "https://dreamslms.dreamstechnologies.com/html/assets/img/categories-icon-04.png", title: "Node JS Frontend", instructors: 40 },
  { src: "https://dreamslms.dreamstechnologies.com/html/assets/img/categories-icon-04.png", title: "Swift Development", instructors: 23 },
  { src: "https://dreamslms.dreamstechnologies.com/html/assets/img/categories-icon-02.png", title: "Angular Development", instructors: 40 },
  { src: "https://dreamslms.dreamstechnologies.com/html/assets/img/categories-icon-03.png", title: "Docker Development", instructors: 45 },
  { src: "https://dreamslms.dreamstechnologies.com/html/assets/img/categories-icon-04.png", title: "Node JS Frontend", instructors: 40 },
  { src: "https://dreamslms.dreamstechnologies.com/html/assets/img/categories-icon-04.png", title: "Swift Development", instructors: 23 },
  { src: "https://dreamslms.dreamstechnologies.com/html/assets/img/categories-icon-02.png", title: "Angular Development", instructors: 40 },
  { src: "https://dreamslms.dreamstechnologies.com/html/assets/img/categories-icon-03.png", title: "Docker Development", instructors: 45 },
  { src: "https://dreamslms.dreamstechnologies.com/html/assets/img/categories-icon-04.png", title: "Node JS Frontend", instructors: 40 },
  { src: "https://dreamslms.dreamstechnologies.com/html/assets/img/categories-icon-04.png", title: "Swift Development", instructors: 23 }
];

const SliderCategory = () => {
  const ref = useRef(null)
  const isInview = useInView(ref, {amount: 0.1, once: true})

  return (
    <motion.div 
      initial={{y: 100, opacity: 0}}
      animate={isInview ? { y: 0, opacity: 100 } : {}}
      transition={{ duration: 1, ease: easeInOut }}
      ref={ref}
      className="">
      <Swiper
      spaceBetween={30}
      slidesPerView={4}
      pagination={{ clickable: true }}
      slidesPerGroup={4}
      modules={[Pagination, Autoplay]}
      loop={true}
      speed={1300}
      autoplay={{
        delay:100000,
        disableOnInteraction:true
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="bg-white dark:bg-[#2b2838] dark:border-transparent dark:hover:bg-[#413655] border-[1px] rounded-lg p-5 text-center flex flex-col items-center hover:bg-[#413655] group transition-all duration-300 ease-in-out">
            <img src={image.src} alt={image.title} className="w-[105px] h-[105px] mb-4 object-cover" />
            <div className="max-w-[130px] mx-auto">
              <h3 className="text-lg font-title text-gray-800 mb-[16px] group-hover:text-[#fff] dark:text-[#B9B7C0] transition-all duration-300 ease-in-out">{image.title}</h3>
              <p className="text-gray-600 text-[14px] group-hover:text-[#fff] dark:text-[#B9B7C0] transition-all duration-300 ease-in-out">{image.instructors} Instructors</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    
    </motion.div>
  );
};

export default SliderCategory;
