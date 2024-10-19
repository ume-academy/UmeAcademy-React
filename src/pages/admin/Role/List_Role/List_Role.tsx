import { getTitleTab } from "@/contants/client";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, message, Modal, Table, TableColumnsType } from "antd"
import { Pen, Trash2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

interface Permission {
  id: number;
  name: string;
  description: string;
}

interface Role {
  id: number;
  title: string;
  created_at?: Date;
  description: string;
  permissions: Permission[];
}

const List_Role = () => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  // message alert
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<Role[]>([
    {
      id: 1,
      title: "Admin",
      created_at: new Date("2023-07-01"),
      description: "Quản lí các chức năng admin",
      permissions: [
        { id: 1, name: "create", description: "Có thể tạo mới các mục" },
        { id: 2, name: "read", description: "Có thể xem tất cả các mục" },
        { id: 3, name: "update", description: "Có thể cập nhật các mục hiện có" },
        { id: 4, name: "delete", description: "Có thể xóa các mục" }
      ]
    },
    {
      id: 2,
      title: "Quản trị viên",
      created_at: new Date("2023-06-20"),
      description: "Tất cả mọi quyền",
      permissions: [
        { id: 1, name: "create", description: "Có thể tạo mới các mục" },
        { id: 2, name: "read", description: "Có thể xem tất cả các mục" },
        { id: 3, name: "update", description: "Có thể cập nhật các mục hiện có" },
        { id: 4, name: "delete", description: "Có thể xóa các mục" },
        { id: 5, name: "manage-users", description: "Có thể quản lý người dùng" }
      ]
    }
  ]);
  const columns: TableColumnsType<Role> = [
    {
      title: "Stt",
      key: "stt",
      render: (_, record, index: number) => <div>{index + 1}</div>,
      width: 100
    },
    {
      title: "Tên nhóm quyền",
      key: "title",
      dataIndex: "title",
      width: 250
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => (
        <div>{created_at ? new Date(created_at).toLocaleDateString('vi-VN') : "N/A"}</div>
      ),
      width: 150
    },
    {
      title: "Mô tả",
      key: "description",
      dataIndex: "description",
      width: 350
    },
    {
      title: 'Tools',
      render: ((_: any, item: any) => (
        <div className="flex items-center justify-center">
          <Link to={`/admin/roles/update/${item.id}`}>
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
  ]
  // Xóa bản ghi
  const handleRemove = (item: any) => {
    Modal.confirm({
      title: (
        <span className='text-red-500 font-title'>Xác nhận xóa quyền</span>
      ),
      content: (
        <p className='dark:text-[#b9b7c0] text-[#685f78]'>
          Bạn có chắc chắn muốn xóa quyền này hay không?
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


  return (
    <div>
      <Helmet>
        <title>{getTitleTab('Quản lý phân quyền')}</title>
      </Helmet>
      {contextHolder}
      <div className="dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg p-4">
        <div className="flex justify-between mb-4">
          <p className="font-title text-xl">Danh sách phân quyền</p>
          <Link
            to={'/admin/roles/create'}
            className='border border-[#F84563] py-2 px-5 rounded-md bg-[#F84563] text-white hover:bg-white hover:border-[#F84563] hover:text-[#F84563] flex items-center gap-3'
          >
            <PlusCircleOutlined />
            Thêm mới
          </Link>
        </div>
        <Table
          columns={columns}
          pagination={false}
          rowKey="id"
          dataSource={data}
        />
      </div>
    </div>
  )
}

export default List_Role