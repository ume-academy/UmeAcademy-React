import { router } from '@/configs/routes';
import { getTitleTab } from '@/constants/client';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, message, Modal, Pagination, Table } from 'antd';
import { Pen, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './listCatalogues.scss';

const List_Catalogues = () => {

  // loading for something
  const [confirmLoading, setConfirmLoading] = useState(false);

  // message alert
  const [messageApi, contextHolder] = message.useMessage();


  // Trạng thái lưu trữ thông tin bản ghi
  // const [selectedItem, setSelectedItem] = useState<any>(null);

  // Xóa bản ghi
  const handleRemove = (item: any) => {
    Modal.confirm({
      title: (
        <span className='text-red-500 font-title'>Xác nhận xóa bản ghi</span>
      ),
      content: (
        <p className='dark:text-[#b9b7c0] text-[#685f78]'>
          Bạn có chắc chắn muốn xóa bản ghi có tên <span className='font-desc'>"{item.name}"</span> hay không?
        </p>
      ),
      okText: 'Đồng ý',
      okType: 'danger',
      okButtonProps: {
        style: { backgroundColor: '#F84563', borderColor: '#F84563', color: '#fff' },
      },
      cancelButtonProps: {
        className: "custom-cancel-btn", // Thêm lớp CSS tùy chỉnh
      },
      cancelText: 'Hủy',
      centered: true,
      maskClosable: false,
      width: 600,
      icon: null, // Bỏ biểu tượng trong modal
      onOk: () => {
        setConfirmLoading(true);
        return new Promise((resolve) => {
          setTimeout(() => {
            // Logic
            console.log('Đã xóa bản ghi với ID:', item?.id);

            // Alert 
            messageApi.open({
              type: 'success',
              content: 'Xóa thành công!',
            });

            // Dừng loading
            setConfirmLoading(false);
            resolve(undefined);
          }, 2000);
        });
      }
    });

  }

  const data = [
    {
      id: '1',
      name: 'Công Nghệ Thông Tin',
      createdAt: '10/10/2024',
    },
    {
      id: '2',
      name: 'Thiết Kế Đồ Họa',
      createdAt: '30/9/2024',
    }
  ]

  const dataSource = data?.map((item: any, index: number) => (
    {
      key: index + 1,
      ...item
    }
  ));

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      align: 'center' as const,
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      minWidth: 200,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Chức năng',
      render: ((_: any, item: any) => (
        <div className="flex items-center justify-center">
          <Link to={`${router.cataloguesUpdate.replace(':id', item.id)}`}>
            <Button type='primary' className='ml-2'>
              <Pen size={20} />
            </Button>
          </Link>

          <Button
            type='primary'
            danger className='ml-2'
            onClick={() => handleRemove(item)}
          >
            <Trash2 size={20} />
          </Button>
        </div>
      )),
      align: 'center' as const,
    },
  ];


  return (
    <>
      {contextHolder}
      <Helmet>
        <title>{getTitleTab('Danh sách danh mục')}</title>
      </Helmet>
      <div className="p-4 md:p-6">
        <div className="heading flex justify-between items-center pb-4 ">
          <h5 className='font-title text-xl dark:text-[#b9b7c0] text-[#685f78] w-[60%] md:w-full'>Danh sách danh mục khóa học</h5>

          <Link
            to={router.cataloguesCreate}
            className='
            border 
            border-[#F84563] 
            py-2
            px-3
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
            gap-3
            md:py-2 md:px-5
            lg:w-[20%]
            '
          >
            <PlusCircleOutlined />
            Thêm mới
          </Link>
        </div>

        <div className='content' style={{ overflowX: 'auto' }}>
          {/* <Table dataSource={dataSource} columns={columns} className='table' /> */}
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            className='table dark:bg-[#2b2838] dark:text-[#B9B7C0]'
          />
        </div>

        <div className="flex justify-between items-center my-6 text-sm">
          <span className='dark:text-[#b9b7c0]'>Trang số 1 trên tổng số 1 trang</span>

          <Pagination />
        </div>
      </div>
    </>
  )
}

export default List_Catalogues