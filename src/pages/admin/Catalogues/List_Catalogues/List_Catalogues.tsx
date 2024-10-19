import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, message, Modal, Table } from 'antd';
import { Pen, Trash2 } from 'lucide-react';
import { useState } from 'react';
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
      okButtonProps: { // Sửa dấu '=' thành ':'
        style: { backgroundColor: '#F84563', borderColor: '#F84563', color: '#fff' }, // Màu nền, viền và chữ nút OK
      },
      cancelButtonProps: { // Sửa dấu '=' thành ':'
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
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Tools',
      render: ((_: any, item: any) => (
        <div className="flex items-center justify-center">
          <Link to={`/admin/catalogues/update/${item.id}`}>
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
      <div className="heading flex justify-between items-center pb-4 ">
        <h5 className='font-title text-xl dark:text-[#b9b7c0] text-[#685f78]'>Danh sách danh mục khóa học</h5>

        <Link
          to={'/admin/catalogues/create'}
          className='
            border-none 
            py-1 px-4
            flex
            items-center
            gap-3
            rounded-md
            bg-[#F84563] 
            text-white
            hover:bg-[#ee9aa8]
            hover:text-black'
        >
          <PlusCircleOutlined />
          Thêm mới
        </Link>
      </div>

      <div className="content">
        <Table dataSource={dataSource} columns={columns} className='table' />
      </div>
    </>
  )
}

export default List_Catalogues