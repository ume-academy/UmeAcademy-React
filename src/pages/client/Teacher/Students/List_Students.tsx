import { Image, Pagination, Progress, Table, TableColumnType } from 'antd'
import styles from './listStudent.module.scss'
import './listStudents.scss'
import { Helmet } from 'react-helmet'
import { getTitleTab } from '@/constants/client'
import { useGetStudentsOfCourseQuery } from '@/redux/slices/teacher/student/studentApiSlice'
import { useState } from 'react'
import { formatDate, smoothScrollToTop } from '@/constants/utils'
import { TStudent } from '@/interfaces/TStudent'
import { useParams } from 'react-router-dom'
import Loading from '@/components/client/commonComponents/Loading/Loading'

const List_Students = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { id } = useParams()
  const { data, isLoading, isFetching } = useGetStudentsOfCourseQuery({ page: currentPage, id: id })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    smoothScrollToTop()
  }
  console.log(data)

  const columns: TableColumnType<TStudent>[] = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      render: (_, __, index: number) => <p>{index + 1}</p>,
      align: 'center'
    },
    {
      title: 'Ảnh',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string) => (
        <div className=''>
          <Image width={60} height={60} src={avatar} className='rounded-full' />
        </div>
      ),
      align: 'center'
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullname',
      key: 'fullname',
      minWidth: 140
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Thời gian đăng ký',
      dataIndex: 'registered_at',
      key: 'registered_at',
      render: (registered_at: string) => <p>{formatDate(registered_at)} </p>
    },
    {
      title: 'Tiến độ',
      dataIndex: 'progress',
      key: 'progress',
      render: (_: any, item: any) => (
        <div className=''>
          <Progress type='circle' percent={item.progress} size={32} />
        </div>
      ),
      align: 'center'
    }
  ]

  return (
    <>
      <Helmet>
        <title>{getTitleTab('Danh sách học viên')}</title>
      </Helmet>

      <div className='p-4 md:p-4 lg:p-0'>
        <div
          className={`${styles['parent']} dark:border-transparent dark:bg-[#2B2838] shadow-xl bg-white border border-[#e9ecef] rounded-xl`}
        >
          <div
            className={`${styles['heading']} dark:border-b-[#5a5a5a] border-b-[#e9ecef] dark:text-[#b9b7c0] text-[#685f78] font-title text-2xl p-6`}
          >
            <h3>Danh sách học viên</h3>
          </div>
          <div className={`${styles['content']} p-6 overflow-x-auto`}>
            {data?.data && data?.data.length > 0 ? (
              <Table
                dataSource={data?.data}
                columns={columns}
                pagination={false}
                loading={isLoading}
                className='dark:bg-[#2b2838] dark:text-[#B9B7C0]'
              />
            ) : (
              <div className='flex justify-center items-center h-[366px] dark:text-[#B9B7C0]'>Chưa có học viên</div>
            )}
          </div>
        </div>

        <div className='flex justify-between items-center my-6 text-sm'>
          <p className='dark:text-[#b9b7c0]'>
            Trang số <span className='text-[#F84563] font-subtitle'>{data?.meta?.current_page}</span> trên tổng số{' '}
            <span className='text-[#F84563] font-subtitle'>{data?.meta?.last_page}</span> trang
          </p>
          <Pagination
            pageSize={data?.meta?.per_page}
            total={data?.meta?.total}
            current={currentPage}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </>
  )
}

export default List_Students
