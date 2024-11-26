import { getTitleTab } from '@/constants/client'
import { formatPrice } from '@/constants/utils'
import { useGetStatisticQuery } from '@/redux/slices/teacher/revenue/revenueApiSlice'
import { HandCoins, Star, Users } from 'lucide-react'
import { Helmet } from 'react-helmet'
import Chart from './Chart'
import './DatePickerAntd.scss'

const Revenue = () => {
  const { data } = useGetStatisticQuery({})

  return (
    <div className='md:flex md:flex-col md:justify-center lg:flex-none p-4 lg:p-0'>
      <Helmet>
        <title>{getTitleTab('Doanh thu')}</title>
      </Helmet>
      <div className=' border border-[#e9ecef] rounded-lg dark:border-transparent  text-[#685f78] dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white'>
        <div className='border-b border-[#e9ecef]  dark:border-[#5a5a5a]'>
          <p className='p-4 lg:p-6 dark:text-[#b9b7c0] text-[#685f78] text-2xl font-title'>Thu Nhập</p>
        </div>
        <div className='p-4 lg:p-6 grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='p-4 lg:p-6 space-y-2 rounded-lg border border-[#e9ecef] dark:border-[#5a5a5a] '>
            <div className='flex justify-between'>
              <h3 className=''>Doanh thu</h3>
              <HandCoins className=' lg:w-8 lg:h-8  text-[#f24f3a]' />
            </div>
            <h1 className='md:text-xl lg:text-2xl font-bold dark:text-[#b9b7c0] text-[#685f78]'>
              {formatPrice(Number(data?.revenue))}
            </h1>
            <p className='text-sm'>Tổng doanh thu bạn đã kiếm được từ các khóa học</p>
          </div>

          <div className=' p-4 lg:p-6 space-y-2 rounded-lg border border-[#e9ecef] dark:border-[#5a5a5a] '>
            <div className='flex justify-between'>
              <h3 className=''>Học viên</h3>
              <Users className=' lg:w-8 lg:h-8  text-[#f24f3a]' />
            </div>
            <h1 className='md:text-xl lg:text-2xl font-bold dark:text-[#b9b7c0] text-[#685f78]'>
              {data?.total_student}
            </h1>
            <p className='text-sm'>Tổng số học viên đã tham gia khóa học</p>
          </div>

          <div className=' p-4 lg:p-6 space-y-2 rounded-lg border border-[#e9ecef] dark:border-[#5a5a5a] '>
            <div className='flex justify-between'>
              <h3 className=''>Xếp hạng khóa học</h3>
              <Star className=' lg:w-8 lg:h-8  text-[#f24f3a]' />
            </div>
            <h1 className='md:text-xl lg:text-2xl font-bold dark:text-[#b9b7c0] text-[#685f78]'>
              {data?.total_rating}
            </h1>
            <p className='text-sm'>Mức đánh giá trung bình của các học viên</p>
          </div>
        </div>
        <Chart />
      </div>
    </div>
  )
}

export default Revenue
