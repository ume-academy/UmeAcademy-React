
import { TCourseDetail } from '@/interfaces/TCourseDetail';
import { Pagination, Table, TableColumnsType } from 'antd';
import styles from './list_Voucher.module.scss';
import './list_Voucher.scss';
import { TVoucher } from '@/interfaces/TVoucher';
import { formatDate } from '@/constants/utils';

interface PropsListVoucher {
  courseData: TCourseDetail
  isLoading: boolean
}

const List_Voucher = ({courseData, isLoading}: PropsListVoucher) => {
  console.log(courseData)

  const columns: TableColumnsType<TVoucher> = [
    {
      title: 'Stt',
      key: 'key',
      dataIndex: 'key',
      width: 60,
      render: (_, __, index: number) => <p>{index + 1}</p>
    },
    {
      title: 'Mã giả giá',
      key: 'code',
      dataIndex: 'code',
      width: 120,
    },
    {
      title: 'Khóa học',
      key: 'course',
      dataIndex: 'course',
      render: (course: any) => <p>{courseData?.name ? (courseData?.name) :(<span>Áp dụng cho tất cả</span>)}</p>,
      width: 200,
    },
    {
      title: 'Số lượng',
      key: 'quantity',
      dataIndex: 'quantity',
      width: 100,
      align: 'center'
    },
    {
      title: 'Đã sử dụng',
      key: 'used_count',
      dataIndex: 'used_count',
      width: 100,
      align: 'center'
    },
    {
      title: 'Giảm giá (%)',
      key: 'discount',
      dataIndex: 'discount',
      render: (discount: number) => <p>{discount} %</p>,
      width: 100,
      align: 'center'
    },

    {
      title: 'Thời gian bắt đầu',
      key: 'start_date',
      dataIndex: 'start_date',
      render: (start_date: string) => <p>{formatDate(start_date)}</p>,
      width: 140,
      align: 'center'
    },
    {
      title: 'Thời gian kết thúc',
      key: 'end_date',
      dataIndex: 'end_date',
      render: (end_date: string) => <p>{formatDate(end_date)}</p>,
      width: 140,
      align: 'center'
    }
  ]

  return (
    <div className='p-4 md:p-4 lg:p-0'>
        <div
          className={`${styles['parent']} dark:border-transparent dark:bg-[#2B2838] shadow-xl bg-white border border-[#e9ecef] rounded-xl`}
        >
          <div
            className={`${styles['heading']} dark:border-b-[#5a5a5a] border-b-[#e9ecef] dark:text-[#b9b7c0] text-[#685f78] font-title text-2xl p-6`}
          >
            <h3>Danh sách voucher</h3>
          </div>
          <div className={`${styles['content']} p-6 overflow-x-auto`}>
            {courseData?.voucher && courseData?.voucher.length > 0 ? (
              <Table
                dataSource={courseData?.voucher}
                columns={columns}
                pagination={false}
                loading={isLoading}
                className='dark:bg-[#2b2838] dark:text-[#B9B7C0]'
              />
            ) : (
              <div className='flex justify-center items-center h-[366px] dark:text-[#B9B7C0]'>Chưa có voucher</div>
            )}
          </div>
        </div>
      </div>
  )
}

export default List_Voucher
