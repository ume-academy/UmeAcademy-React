import { getTitleTab } from '@/constants/client';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Table, TableColumnType } from 'antd';
import { Pen, Trash2 } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

interface Payment_MethodType {
  id: number;
  name: string;
  created_at: string;
}

const List_Payment_Method = () => {
  const data: Payment_MethodType[] = ([
    { id: 1, name: "Nguyễn Văn A", created_at: "2024-10-29T10:00:00Z" },
    { id: 2, name: "Trần Thị B", created_at: "2024-10-28T14:30:00Z" },
    { id: 3, name: "Lê Văn C", created_at: "2024-10-27T09:15:00Z" },
    { id: 4, name: "Phạm Thị D", created_at: "2024-10-26T12:45:00Z" },
    { id: 5, name: "Đinh Văn E", created_at: "2024-10-25T16:20:00Z" },
  ]);


  const columns: TableColumnType<Payment_MethodType>[] = [
    {
      title: "Stt",
      key: "stt",
      render: (_, record, index: number) => <div>{index + 1}</div>,
      width: 50
    },
    {
      title: "Tên phương thức thanh toán",
      dataIndex: "name",
      key: "name",
      width: 200
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => (
        <div>{created_at ? new Date(created_at).toLocaleDateString() : "vi-VN"}</div>
      ),
      width: 200
    },
    {
      title: 'Hành động',
      render: ((_: any, item: any) => (
        <div className="flex items-center justify-center">
          <Link to={`/admin/form-payment-method/${item.id}`}>
            <Button type='primary' className='ml-2'>
              <Pen size={20} />
            </Button>
          </Link>

          <Button
            type='primary'
            danger className='ml-2'
          >
            <Trash2 size={20} />
          </Button>
        </div>
      )),
      width: 200,
      align: 'center' as const,
    }

  ];

  return (
    <div>
      <div className="dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg p-4">
      <Helmet>
        <title>{getTitleTab('Quản lý phương thức thanh toán')}</title>
      </Helmet>
      <div className="flex justify-between flex-col md:flex-row lg:flex-row mb-4">
          <p className="font-title text-xl">Danh sách phương thức thanh toán</p>
          <Link
            to={'/admin/form-payment-method'}
            className='border mt-4 md:mt-0 lg:mt-0 w-[140px] flex justify-center items-center border-[#F84563] py-2 px-5 rounded-md bg-[#F84563] text-white hover:bg-white hover:border-[#F84563] hover:text-[#F84563] gap-3'
          >
            <PlusCircleOutlined />
            Thêm mới
          </Link>
        </div>
      <Table
        scroll={{ x: 966 }}
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
    </div>
    </div>
  )
}

export default List_Payment_Method
