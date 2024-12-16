import { router } from '@/configs/routes'
import { getTitleTab } from '@/constants/client'
import { formatDate, smoothScrollToTop } from '@/constants/utils'
import { TVoucher } from '@/interfaces/TVoucher'
import { useGetAllVoucherByAdminQuery, useRemoveVoucherByAdminMutation } from '@/redux/slices/voucher/voucherApiSlice'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, message, Modal, Pagination, Table, TableColumnsType } from 'antd'
import { Pen, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const List_Voucher = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading } = useGetAllVoucherByAdminQuery({ per_page: 10, page: currentPage })
  console.log(data)
  const [removeVoucher] = useRemoveVoucherByAdminMutation()
  const handleRemove = (id: number) => {
    Modal.confirm({
      title: <span className='text-red-500 font-title'>Xác nhận xóa giảm giá</span>,
      content: <p className='dark:text-[#b9b7c0] text-[#685f78]'>Bạn có chắc chắn muốn xóa giảm giá này hay không?</p>,
      okText: 'Đồng ý',
      okType: 'danger',
      okButtonProps: {
        style: { backgroundColor: '#F84563', borderColor: '#F84563', color: '#fff' }
      },
      cancelText: 'Hủy',
      centered: true,
      maskClosable: false,
      width: 600,
      icon: null,
      onOk: () => {
        return new Promise((resolve) => {
          setTimeout(async () => {
            try {
              await removeVoucher(id).unwrap()
              message.success('Xóa mã giảm giá thành công')
            } catch (error) {
              message.error('Đã có lỗi xảy ra khi bạn xóa mã giảm giágiá')
            }
            resolve(undefined)
          }, 666)
        })
      }
    })
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    smoothScrollToTop()
  }

  const dataSource = data?.data.map((item: TVoucher, index: number) => ({
    key: index + 1,
    ...item
  }))

  const columns: TableColumnsType<TVoucher> = [
    {
      title: 'Stt',
      key: 'key',
      dataIndex: 'key',
      width: 60
    },
    {
      title: 'Mã giả giá',
      key: 'code',
      dataIndex: 'code',
      width: 120
    },
    {
      title: 'Khóa học',
      key: 'course',
      dataIndex: 'course',
      render: (course: any) => <p>{course?.name ? course?.name : <span>Áp dụng cho tất cả</span>}</p>,
      width: 200
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
    },
    {
      title: 'Chức năng',
      render: (_: any, record: any) => (
        <div className='flex items-center justify-center gap-2'>
          <Link to={`${router.VouchersUpdate.replace(':id', record?.id)}`}>
            <Button type='primary'>
              <Pen size={20} />
            </Button>
          </Link>

          <Button type='primary' danger onClick={() => handleRemove(record.id)}>
            <Trash2 size={20} />
          </Button>
        </div>
      ),
      align: 'center',
      width: 140
    }
  ]

  return (
    <>
      <div className='dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg p-4'>
        <Helmet>
          <title>{getTitleTab('Quản lý mã giảm giá khóa học')}</title>
        </Helmet>
        <div className='flex justify-between items-center flex-col md:flex-row lg:flex-row mb-4'>
          <p className='font-title text-xl'>Danh sách mã giảm giá khóa học</p>
          <Link
            to={`${router.VouchersCreate}`}
            className='border mt-4 md:mt-0 lg:mt-0 w-[140px] flex justify-center items-center border-[#F84563] py-2 px-5 rounded-md bg-[#F84563] text-white hover:bg-white hover:border-[#F84563] hover:text-[#F84563] gap-3'
          >
            <PlusCircleOutlined />
            Thêm mới
          </Link>
        </div>
        <Table
          scroll={{ x: 966 }}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey='id'
          loading={isLoading}
        />
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

export default List_Voucher
