import { motion, easeInOut, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Helmet } from 'react-helmet'
import { getTitleTab } from '../../../../contants/client'
import { Pagination } from 'antd'
import Card, { CardProps } from '@/components/client/commonComponents/Card/Card'

const Purchased_Courses = () => {
  const bottomRef = useRef(null)
  const isBottomInView = useInView(bottomRef, { amount: 0.05, once: true })
  //data card
  const cardData: CardProps[] = [
    {
      image: 'https://i.pravatar.cc/150?img=1',
      title: 'Thông tin về thiết kế bằng UI/UX',
      instructorName: 'DaddyGiao',
      instructorImage: 'https://i.pravatar.cc/150',
      price: '1.000.000 đ',
      originalPrice: '9.000.000 đ',
      lessonCount: '12+ Bài học',
      duration: '9h 30p',
      rating: 5,
    },
    {
      image: 'https://i.pravatar.cc/150?img=2',
      title: 'Lập trình Web với React',
      instructorName: 'NguyenVanA',
      instructorImage: 'https://i.pravatar.cc/150?img=2',
      price: '800.000 đ',
      originalPrice: '4.000.000 đ',
      lessonCount: '15+ Bài học',
      duration: '10h 0p',
      rating: 4.8,
    },
    {
      image: 'https://i.pravatar.cc/150?img=3',
      title: 'Cơ bản về Python',
      instructorName: 'TruongThiB',
      instructorImage: 'https://i.pravatar.cc/150?img=3',
      price: '600.000 đ',
      originalPrice: '3.500.000 đ',
      lessonCount: '10+ Bài học',
      duration: '8h 45p',
      rating: 4.5,
    },
    {
      image: 'https://i.pravatar.cc/150?img=4',
      title: 'Thiết kế đồ họa với Photoshop',
      instructorName: 'HoangVanC',
      instructorImage: 'https://i.pravatar.cc/150?img=4',
      price: '1.200.000 đ',
      originalPrice: '5.000.000 đ',
      lessonCount: '20+ Bài học',
      duration: '12h 15p',
      rating: 4.9,
    },
    {
      image: 'https://i.pravatar.cc/150?img=5',
      title: 'Marketing Online hiệu quả',
      instructorName: 'LeThiD',
      instructorImage: 'https://i.pravatar.cc/150?img=5',
      price: '700.000 đ',
      originalPrice: '3.200.000 đ',
      lessonCount: '18+ Bài học',
      duration: '7h 30p',
      rating: 4.6,
    },
    {
      image: 'https://i.pravatar.cc/150?img=6',
      title: 'Xử lý dữ liệu với Excel',
      instructorName: 'PhamVanE',
      instructorImage: 'https://i.pravatar.cc/150?img=6',
      price: '500.000 đ',
      originalPrice: '2.500.000 đ',
      lessonCount: '10+ Bài học',
      duration: '6h 0p',
      rating: 4.3,
    },
  ];

  return (
    <div className='max-w-full sm:max-w-[768px] md:max-w-[1024px] lg:max-w-[1280px] mx-auto mt-40  mb-20 text-[#685f78] dark:text-[#B9B7C0]'>
      <Helmet>
        <title>{getTitleTab('Khóa học đã mua')}</title>
      </Helmet>
      <div className='dark:bg-[#2b2838] bg-white rounded-lg border border-[#e9ecef] dark:border-none text-2xl md:text-3xl sm:text-4xl font-title p-6 mb-7'>
        Các khóa học đã mua
      </div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={isBottomInView ? { y: 0, opacity: 100 } : {}}
        transition={{ duration: 1, ease: easeInOut }}
        ref={bottomRef}
        className='flex flex-wrap gap-16 justify-center lg:justify-normal lg:gap-[26px]'
      >
        {cardData.map((data, index) => (
          <Card
            key={index} // Sử dụng index hoặc id của khóa học để đảm bảo mỗi thẻ có một key duy nhất
            image={data.image}
            title={data.title}
            instructorName={data.instructorName}
            instructorImage={data.instructorImage}
            price={data.price}
            originalPrice={data.originalPrice}
            lessonCount={data.lessonCount}
            duration={data.duration}
            rating={data.rating}
          />
        ))}
      </motion.div>
      <div className='flex justify-center mt-10'>
        <Pagination defaultCurrent={1} total={20} />
      </div>
    </div>
  )
}

export default Purchased_Courses
