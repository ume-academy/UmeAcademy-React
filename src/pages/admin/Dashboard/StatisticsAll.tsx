import DotLoader from '@/components/client/commonComponents/Loader/DotLoader'
import { formatPrice } from '@/constants/utils'
import { useStatisticsAllQuery } from '@/redux/slices/admin/dashboardApiSlice'
import { ArrowRightLeft, CircleDollarSign, GraduationCap, HandCoins, School, Users } from 'lucide-react'

const StatisticsAll = () => {
  const { data, isLoading } = useStatisticsAllQuery({})
  if (isLoading) {
    return <DotLoader />
  }
  return (
    <div>
      <div className=' grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='p-4 lg:p-6 space-y-2 rounded-lg bg-white dark:bg-[#2b2838] shadow-md border border-[#e9ecef] dark:border-[#5a5a5a]'>
          <div className='flex justify-between'>
            <h3 className='text-xl font-title'>Doanh thu</h3>
            <HandCoins className='lg:w-8 lg:h-8 text-[#f24f3a]' />
          </div>
          <h1 className='md:text-xl lg:text-2xl font-bold dark:text-[#b9b7c0] text-[#685f78]'>
            {data ? formatPrice(Number(data?.revenue)) : <p>0 đ</p>}
          </h1>
          <p className='text-sm'>Tổng doanh thu từ các khóa học</p>
        </div>

        <div className='p-4 lg:p-6 space-y-2 rounded-lg bg-white dark:bg-[#2b2838] shadow-md border border-[#e9ecef] dark:border-[#5a5a5a]'>
          <div className='flex justify-between'>
            <h3 className='text-xl font-title'>Lợi nhuận</h3>
            <CircleDollarSign className='lg:w-8 lg:h-8 text-[#f24f3a]' />
          </div>
          <h1 className='md:text-xl lg:text-2xl font-bold dark:text-[#b9b7c0] text-[#685f78]'>
            {data ? formatPrice(Number(data?.profit)) : <p>0 đ</p>}
          </h1>
          <p className='text-sm'>Lợi nhuận hoa hồng từ các khóa học</p>
        </div>

        <div className='p-4 lg:p-6 space-y-2 rounded-lg bg-white dark:bg-[#2b2838] shadow-md border border-[#e9ecef] dark:border-[#5a5a5a]'>
          <div className='flex justify-between'>
            <h3 className='text-xl font-title'>Giao dịch</h3>
            <ArrowRightLeft className='lg:w-8 lg:h-8 text-[#f24f3a]' />
          </div>
          <h1 className='md:text-xl lg:text-2xl font-bold dark:text-[#b9b7c0] text-[#685f78]'>
            {data ? data?.total_transaction : <p>0</p>}
          </h1>
          <p className='text-sm'>Tổng số giao dịch đã thực hiện</p>
        </div>

        <div className='p-4 lg:p-6 space-y-2 rounded-lg bg-white dark:bg-[#2b2838] shadow-md border border-[#e9ecef] dark:border-[#5a5a5a]'>
          <div className='flex justify-between'>
            <h3 className='text-xl font-title'>Học viên</h3>
            <Users className='lg:w-8 lg:h-8 text-[#f24f3a]' />
          </div>
          <h1 className='md:text-xl lg:text-2xl font-bold dark:text-[#b9b7c0] text-[#685f78]'>
            {data ? data?.total_user : <p>0</p>}
          </h1>
          <p className='text-sm'>Tổng số học viên đã tham gia khóa học</p>
        </div>

        <div className='p-4 lg:p-6 space-y-2 rounded-lg bg-white dark:bg-[#2b2838] shadow-md border border-[#e9ecef] dark:border-[#5a5a5a]'>
          <div className='flex justify-between'>
            <h3 className='text-xl font-title'>Giảng viên</h3>
            <School className='lg:w-8 lg:h-8 text-[#f24f3a]' />
          </div>
          <h1 className='md:text-xl lg:text-2xl font-bold dark:text-[#b9b7c0] text-[#685f78]'>
            {data ? data?.total_teacher : <p>0</p>}
          </h1>
          <p className='text-sm'>Tổng số giảng viên đã tham gia</p>
        </div>

        <div className='p-4 lg:p-6 space-y-2 rounded-lg bg-white dark:bg-[#2b2838] shadow-md border border-[#e9ecef] dark:border-[#5a5a5a]'>
          <div className='flex justify-between'>
            <h3 className='text-xl font-title'>Khóa học</h3>
            <GraduationCap className='lg:w-8 lg:h-8 text-[#f24f3a]' />
          </div>
          <h1 className='md:text-xl lg:text-2xl font-bold dark:text-[#b9b7c0] text-[#685f78]'>
            {data ? data?.total_course : <p>0</p>}
          </h1>
          <p className='text-sm'>Tổng số khóa học hiện có</p>
        </div>
      </div>
    </div>
  )
}

export default StatisticsAll
