import { formatPrice } from '@/constants/utils'
import { TCourse } from '@/interfaces/TCourse'
import { useGetTopCourseQuery } from '@/redux/slices/course/courseApiSlice'
import { Table } from 'antd'
import { useEffect } from 'react'

const Courses_Top = () => {
  const { data, refetch } = useGetTopCourseQuery({})

  useEffect(() => {
    refetch()
  }, [])

  const dataCourse = data?.data?.map((course: TCourse) => ({
    ...course,
    revenue: Number(course.price) * Number(course.total_student)
  }))

  const columns = [
    {
      title: 'Khóa học',
      key: 'course',
      render: (record: TCourse) => (
        <div className='hover:text-ellipsis flex gap-4 items-center w-[300px] md:w-[456px] lg:w-[550px]'>
          <img src={record?.thumbnail} alt='Course' className='w-[66px] md:w-[90px] rounded-lg' />
          <div className=' text-sm md:text-[16px]'>{record?.name}</div>
        </div>
      )
    },
    {
      title: 'Giá bán',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <span className=''>{formatPrice(price)}</span>,
      width: 120
    },
    {
      title: 'Lượt bán',
      dataIndex: 'total_student',
      key: 'total_student',
      render: (total_student: number) => <span className=''>{total_student}</span>,
      width: 110
    },

    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (revenue: number) => <p className=''>{formatPrice(revenue)}</p>,
      width: 120
    }
  ]

  return (
    <div className='mt-5 border border-[#e9ecef] rounded-lg dark:border-transparent text-[#685f78] dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white'>
      <div className='border-b border-[#e9ecef] dark:border-[#5a5a5a]  '>
        <p className='p-4 lg:p-6 dark:text-[#b9b7c0] text-[#685f78] text-xl font-title'>Top 5 khóa học bán chạy nhất</p>
      </div>
      <div className='p-4 lg:p-6'>
        <Table
          columns={columns}
          dataSource={dataCourse}
          pagination={false}
          rowKey='id'
          className='dark:bg-[#2b2838] dark:text-[#B9B7C0]'
          scroll={{ x: 670 }}
        />
      </div>
    </div>
  )
}

export default Courses_Top
