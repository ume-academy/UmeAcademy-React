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

const List_Students = () => {
  const perPage = 5
  const [currentPage, setCurrentPage] = useState(1)
  const { id } = useParams()
  const { data } = useGetStudentsOfCourseQuery({ per_page: perPage, page: currentPage, id: id })
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    smoothScrollToTop()
  }

  const columns: TableColumnType<TStudent>[] = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      render: (_, __, index: number) => <p>{index + 1}</p>
    },
    {
      title: 'Ảnh',
      render: (avatar: string) => (
        <div className=''>
          <Image width={60} height={60} src={avatar} className='rounded-full' />
        </div>
      )
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
            {data?.data ? (
              <Table
                dataSource={data?.data}
                columns={columns}
                pagination={false}
                className='dark:bg-[#2b2838] dark:text-[#B9B7C0]'
              />
            ) : (
              <div className='flex justify-center items-center h-[366px] dark:text-[#B9B7C0]'>Chưa có học viên</div>
            )}
          </div>
        </div>

        {data?.data && (
          <div className='flex justify-end mt-10'>
            <Pagination
              onChange={handlePageChange}
              total={data?.meta?.total}
              current={currentPage}
              pageSize={perPage}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default List_Students
