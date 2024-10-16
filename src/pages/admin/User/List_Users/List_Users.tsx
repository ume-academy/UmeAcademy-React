import { message, Modal, Space, Switch, Table, TableColumnType, TreeSelect } from "antd";
import { Info, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import './List_User_Antd.scss';

interface User {
  id: number;
  fullname: string;
  email: string;
  created_at?: Date;
  role: number;
  status: number;
}

const List_Users = () => {
  const [data, setData] = useState<User[]>([
    { id: 1, fullname: "Vũ Ngọc Giao", email: "daddyGiao@email.com", created_at: new Date(), role: 1, status: 1 },
    { id: 2, fullname: "Tran Thi B", email: "ttb@daddy.com", created_at: new Date(), role: 0, status: 0 }
  ]);

  const [searchText, setSearchText] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<number | undefined>(undefined); // Lọc vai trò
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(undefined); // Lọc trạng thái
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleChangeStatus = (id: number, checked: boolean) => {
    Modal.confirm({
      title: (
        <span className='text-red-500 font-title'>Xác nhận thay đổi trạng thái</span>
      ),
      content: (
        <p className='dark:text-[#b9b7c0] text-[#685f78]'>
          Bạn có chắc chắn muốn <span className='font-desc'>"{checked ? "mở khóa" : "khóa"}"</span> tài khoản này không?
        </p>
      ),
      okText: 'Đồng ý',
      okType: 'danger',
      okButtonProps: { 
        style: { backgroundColor: '#F84563', borderColor: '#F84563', color: '#fff' },
      },
      cancelButtonProps: { 
        style: { backgroundColor: '#e5e0e3', color: '#000' },
      },
      cancelText: 'Hủy',
      centered: true,
      maskClosable: false,
      width: 600,
      icon: null, 
      onOk: () => {
        setConfirmLoading(true);
        return new Promise((resolve) => {
          setTimeout(() => {
            const newStatus = checked ? 0 : 1;
            setData(prevData =>
              prevData.map(user =>
                user.id === id ? { ...user, status: newStatus } : user
              )
            );
  
            messageApi.open({
              type: 'success',
              content: `${checked ? "Mở khóa" : "Khóa"} tài khoản thành công!`,
            });
  
            setConfirmLoading(false);
            resolve(undefined);
          }, 2000); 
        });
      }
    });
  };
  

  const CustomTreeSelect = styled(TreeSelect)`
    .ant-select-selector {
      background-color: #fafafa !important;
      border: 1px solid #c1c9d2 !important;
    }
    .dark & .ant-select-selector {
      background-color: #131022 !important;
      border: 1px solid #c7c7c740 !important;
    }
    .ant-select-selector .ant-select-selection-placeholder {
      color: #6e82a3 !important;
    }
    .dark & .ant-select-selector .ant-select-selection-placeholder {
      color: #e9ecef !important;
    }
  `;

  const handleChangeRole = (id: number, value: number) => {
    setData(prevData =>
      prevData.map(user =>
        user.id === id ? { ...user, role: value } : user
      )
    );
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  // Lọc dữ liệu dựa trên vai trò và trạng thái từ TreeSelect
  const filteredData = data.filter(user => {
    const isMatchingEmail = user.email.toLowerCase().includes(searchText.toLowerCase());
    const isMatchingRole = selectedRole === undefined || user.role === selectedRole;
    const isMatchingStatus = selectedStatus === undefined || user.status === selectedStatus;

    return isMatchingEmail && isMatchingRole && isMatchingStatus;
  });

  const columns: TableColumnType<User>[] = [
    {
      title: "Stt",
      key: "stt",
      render: (_, record, index: number) => <div>{index + 1}</div>,
      width: 50
    },
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      key: "fullname",
      width: 150
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => (
        <div>{created_at ? new Date(created_at).toLocaleDateString() : "vi-VN"}</div>
      ),
      width: 150
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <Space direction="vertical">
          <Switch
            checkedChildren="Mở"
            unCheckedChildren="Khóa"
            checked={record.status === 0}
            onChange={(checked) => handleChangeStatus(record.id, checked)}
          />
        </Space>
      ),
      width: 100
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (_, record) => (
        <CustomTreeSelect
          value={record.role}
          treeDefaultExpandAll
          className="w-[120px]"
          onChange={(value) => handleChangeRole(record.id, value as number)}
          treeData={[
            { value: 1, title: <span className="text-[#ff4667]">Admin</span> },
            { value: 0, title: <span className="text-green-500">User</span> }
          ]}
        />
      ),
      width: 120
    },
    {
      title: <div>Chi tiết</div>,
      key: "actions",
      width: 110,
      render: (record) => (
        <div>
          <Link to={`/admin/user-detail/${record.id}`}>
            <Info className="flex-1 text-xl hover:text-[#ff4667] ml-3" />
          </Link>
        </div>
      ),
    }
  ];

  return (
    <div className="dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg p-4">
      <p className="mb-4 font-title text-2xl">Danh sách người dùng</p>
      <div className="flex gap-2">
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Search size={20} />
          </span>
          <input
            placeholder="Tìm theo email"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            className='border border-[#dce0eb] outline-none dark:bg-[#4a4755] dark:border-[#2b2838] py-2 pl-10 rounded-lg w-60'
          />
        </div>
        {/* Lọc theo Trạng thái */}
        <CustomTreeSelect
          placeholder="Lọc theo trạng thái"
          value={selectedStatus}
          onChange={(value) => setSelectedStatus(value as number)}
          className="mb-4 w-40 h-10"
          treeData={[
            { value: 0, title: 'Khóa' },
            { value: 1, title: 'Mở' }
          ]}
          allowClear
        />
        {/* Lọc theo Vai trò */}
        <CustomTreeSelect
          placeholder="Lọc theo vai trò"
          value={selectedRole}
          onChange={(value) => setSelectedRole(value as number)}
          className="mb-4 w-40 h-10"
          treeData={[
            { value: 1, title: 'Admin' },
            { value: 0, title: 'User' }
          ]}
          allowClear
        />
      </div>
      <Table
        columns={columns}
        pagination={false}
        dataSource={filteredData}
        rowKey="id"
      />
    </div>
  );
};

export default List_Users;
