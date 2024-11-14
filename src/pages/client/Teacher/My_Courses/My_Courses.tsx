import Card, { CardProps } from '@/components/client/commonComponents/Card/Card'
import { getTitleTab } from '@/constants/client'
import { Pagination } from 'antd'
import { motion, easeInOut, useInView } from 'framer-motion'
import { useRef } from "react"
import { Helmet } from 'react-helmet'

const My_Courses = () => {
  const bottomRef = useRef(null)
  const isBottomInView = useInView(bottomRef, { amount: 0.05, once: true })
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
      purchaseDate: ""

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
      purchaseDate: ""

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
      purchaseDate: ""

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
      purchaseDate: ""

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
      purchaseDate: ""

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
      purchaseDate: ""

    },
  ];

  return (
    <div>
      <Helmet>
        <title>{getTitleTab('Danh sách khóa học')}</title>
      </Helmet>
      <div className=" border border-[#e9ecef] rounded-lg dark:border-transparent  text-[#685f78] dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white  max-w-[400px] md:max-w-[800px] p-4 lg:p-0 lg:max-w-full ">
        <div className="border-b border-[#e9ecef]  dark:border-[#5a5a5a]">
          <p className="p-4 lg:p-6 dark:text-[#b9b7c0] text-[#685f78]  text-2xl font-title">
            Các khóa học của tôi
          </p>
        </div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={isBottomInView ? { y: 0, opacity: 100 } : {}}
          transition={{ duration: 1, ease: easeInOut }}
          ref={bottomRef} className="flex flex-wrap gap-10 justify-center md:justify-between lg:gap-2  p-3">
          {cardData.map((data, index) => (
            <Card
              key={index}
              {...data}
            />
          ))}
        </motion.div>
      </div>
      <div className='flex justify-end mt-10 '>
        <Pagination defaultCurrent={1} total={20} />
      </div>
    </div>
  )
}

export default My_Courses