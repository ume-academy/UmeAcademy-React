import { router } from '@/configs/routes'
import { getTitleTab } from '@/constants/client'
import useLoading from '@/hooks/useLoading'
import { TCategory } from '@/interfaces/TCategory'
import { useGetAllCategoryQuery, useRemoveCategoryMutation } from '@/redux/slices/category/categoryApiSlice'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, message, Modal, Pagination, Table } from 'antd'
import { Pen, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import './listCatalogues.scss'

const List_Catalogues = () => {
  const [page, setPage] = useState(1)

  const { data: catalogues, isError, error, isLoading, isFetching } = useGetAllCategoryQuery(page)

  const [removeCategory] = useRemoveCategoryMutation()

  // console.log(catalogues);

  // loading for something
  const { loading, startLoading, stopLoading } = useLoading()

  // message alert
  // const [messageApi, contextHolder] = message.useMessage();

  // Trạng thái lưu trữ thông tin bản ghi
  // const [selectedItem, setSelectedItem] = useState<any>(null);

  // Xóa bản ghi
  const handleRemove = (item: any) => {
    Modal.confirm({
      title: <span className='text-red-500 font-title'>Xác nhận xóa bản ghi</span>,
      content: (
        <p className='dark:text-[#b9b7c0] text-[#685f78]'>
          Bạn có chắc chắn muốn xóa bản ghi có tên <span className='font-desc'>"{item.name}"</span> hay không?
        </p>
      ),
      okText: 'Đồng ý',
      okType: 'danger',
      okButtonProps: {
        style: { backgroundColor: '#F84563', borderColor: '#F84563', color: '#fff' }
      },
      cancelButtonProps: {
        className: 'custom-cancel-btn' // Thêm lớp CSS tùy chỉnh
      },
      cancelText: 'Hủy',
      centered: true,
      maskClosable: false,
      width: 600,
      icon: null, // Bỏ biểu tượng trong modal
      onOk: () => {
        try {
          // Logic
          const res = removeCategory(item.id) // Xóa bản ghi

          // Alert
          message.success(`Xoá bản ghi thành công!`)
        } catch (error) {
          console.log(error)
        } finally {
          // Dừng loading
          stopLoading()
        }
      }
    })
  }

  const dataSource = catalogues?.data?.map((item: any, index: number) => ({
    key: index + 1,
    ...item
  }))

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      align: 'center' as const
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      minWidth: 200
    },
    {
      title: 'Danh mục con',
      render: (_: any, record: TCategory) => (
        <span className=''>{record?.subcategory === null ? 'Trống' : record?.subcategory}</span>
      ),
      align: 'center' as const
    },
    {
      title: 'Chức năng',
      render: (_: any, item: any) => (
        <div className='flex items-center justify-center'>
          <Link to={`${router.cataloguesUpdate.replace(':id', item.id)}`}>
            <Button type='primary' className='ml-2'>
              <Pen size={20} />
            </Button>
          </Link>

          <Button type='primary' danger className='ml-2' onClick={() => handleRemove(item)}>
            <Trash2 size={20} />
          </Button>
        </div>
      ),
      align: 'center' as const
    }
  ]

  return (
    <>
      <Helmet>
        <title>{getTitleTab('Danh sách danh mục')}</title>
      </Helmet>
      <div className='p-4 md:p-6 dark:bg-[#2b2838] bg-white'>
        <div className='heading flex justify-between items-center pb-4 '>
          <h5 className='font-title text-xl dark:text-[#b9b7c0] text-[#685f78] w-[60%] md:w-full'>
            Danh sách danh mục khóa học
          </h5>

          <Link
            to={router.cataloguesCreate}
            className='
            border 
            border-[#F84563] 
            p-2
            
            w-auto
            rounded-md 
            bg-[#F84563] 
            md:w-[25%] 
            flex 
            justify-center 
            items-center 
            text-white 
            hover:bg-white 
            hover:border-[#F84563] 
            hover:text-[#F84563] 
            gap-2
            lg:w-[10%]
            '
          >
            <PlusCircleOutlined />
            Thêm mới
          </Link>
        </div>

        <div className='content overflow-x-auto'>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            className='table dark:bg-[#2b2838] dark:text-[#B9B7C0]'
            loading={isLoading}
          />
        </div>

        <div className='flex justify-between items-center my-6 text-sm'>
          <p className='dark:text-[#b9b7c0]'>
            Trang số <span className='text-[#F84563] font-subtitle'>{catalogues?.meta?.current_page}</span> trên tổng số{' '}
            <span className='text-[#F84563] font-subtitle'>{catalogues?.meta?.last_page}</span> trang
          </p>

          <Pagination
            pageSize={catalogues?.meta?.per_page}
            total={catalogues?.meta?.total}
            current={catalogues?.meta?.current_page}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </>
  )
}

export default List_Catalogues
