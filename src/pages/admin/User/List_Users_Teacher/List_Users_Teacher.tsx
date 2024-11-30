import { Button, Image, message, Modal, Space, Spin, Switch, Table, TableColumnType, TreeSelect } from "antd";
import { Info, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import './List_User_Antd.scss';
import { getTitleTab } from "@/constants/client";
import { Helmet } from "react-helmet";
import { router } from "@/configs/routes";
import { useGetUsersQuery } from "@/redux/slices/user/userSlice";
import { TUser } from "@/interfaces/TUser";

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

const List_Users_Teacher = () => {

  const [page, setPage] = useState(1);

  // mặc định sẽ lấy trang đầu tiên
  const { data: users, isLoading, isFetching, isError, error } = useGetUsersQuery(page);

  // console.log(users)

  const [data, setData] = useState<any>([
    // { id: 1, fullname: "Vũ Ngọc Giao", email: "daddyGiao@email.com", created_at: new Date(), role: 1, status: 1 },
    // { id: 2, fullname: "Tran Thi B", email: "ttb@daddy.com", created_at: new Date(), role: 0, status: 0 }
  ]);

  // console.log('data', users)

  useEffect(() => {
    if (users?.data) {

      const usersData = users?.data?.filter((user: TUser) => user?.is_teacher !== false);

      setData(usersData)
    }
  }, [users])


  const [searchText, setSearchText] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<any>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<any>(0);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleChangeStatus = (id: number, checked: any) => {
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
        className: "custom-cancel-btn",
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
            const newStatus = checked ? 1 : 0;

            setData((prevData: any) =>
              prevData.map((user: TUser) =>
                user.id === id ? { ...user, is_lock: newStatus } : user
              )
            );

            // console.log('new status', newStatus)

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

  const handleChangeRole = (id: number, value: number) => {
    setData((prevData: any) =>
      prevData.map((user: TUser) =>
        user.id === id ? { ...user, role: value } : user
      )
    );
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const filteredData = data.filter((user: TUser) => {
    const isMatchingEmail = user.email.toLowerCase().includes(searchText.toLowerCase());
    const isMatchingRole = selectedRole === undefined || user?.is_teacher === selectedRole;
    const isMatchingStatus = selectedStatus === undefined || user?.is_lock === selectedStatus;

    return isMatchingEmail && isMatchingRole && isMatchingStatus;
  });

  const columns: TableColumnType<TUser>[] = [
    {
      title: "STT",
      key: "stt",
      render: (_, record, index: number) => <div>{index + 1}</div>,
      width: 50,
      align: "center"
    },
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      key: "fullname",
      width: 150
    },
    {
      title: "Avatar",
      render: (_: any, record: TUser) => (
        <Image src={record?.avatar} alt={record?.avatar ? record?.avatar : 'Chưa có avatar'} width={100} height={100}/>
      ),
      align: "center",
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
        <div>{created_at ? new Date(created_at).toLocaleDateString("vi-VN") : ""}</div>
      ),
      width: 150
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_: any, record, index: number) => (
        <Space direction="vertical" key={index + 1}>
          <Switch
            checkedChildren="Mở"
            unCheckedChildren="Khóa"
            checked={record?.is_lock === 0}
            onChange={(checked) => handleChangeStatus(record?.id, checked)}
          />
        </Space>
      ),
      width: 100
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (_: any, record, index: number) => (
        <CustomTreeSelect
          value={record?.is_teacher}
          treeDefaultExpandAll
          className="w-full md:w-32"
          onChange={(value) => handleChangeRole(record?.id, value as number)}
          key={index + 1}
          treeData={[
            { value: 0, title: <span className="text-[#ff4667]">Admin</span> },
            { value: false, title: <span className="text-green-500">User</span> },
            { value: true, title: <span className="text-green-500">Teacher</span> },
          ]}
        />
      ),
      width: 120
    },
    {
      title: <div>Chi tiết</div>,
      key: "actions",
      width: 110,
      render: (_: any, record, index: number) => (
        <div key={index + 1}>
          <Link to={`${router.userDetail.replace(':id', record.id)}`}>
            <Info className="flex-1 text-xl hover:text-[#ff4667] ml-3" />
          </Link>
        </div>
      ),
    }
  ];

  if (isLoading && isFetching) return <div className="min-h-screen flex justify-center items-center"><Spin /> </div>;

  return (
    <div className="dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg p-4">
      <Helmet>
        <title>{getTitleTab('Quản lý tài khoản giảng viên')}</title>
      </Helmet>

      <p className="mb-4 font-title text-xl">Danh sách giảng viên</p>

      <div className="flex flex-wrap gap-2">
        <div className="relative mb-4 w-full md:w-1/3 lg:w-1/4">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Search size={20} />
          </span>
          <input
            placeholder="Tìm theo email"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            className="border border-[#dce0eb] outline-none dark:bg-[#4a4755] dark:border-[#2b2838] py-2 pl-10 rounded-lg w-full"
          />
        </div>

        <CustomTreeSelect
          placeholder="Lọc theo trạng thái"
          value={selectedStatus}
          onChange={(value) => setSelectedStatus(value as number)}
          className="mb-4 w-full md:w-1/3 lg:w-1/4 h-10"
          treeData={[
            { value: 1, title: 'Khóa' },
            { value: 0, title: 'Mở' }
          ]}
          allowClear
        />

        {/* <CustomTreeSelect
          placeholder="Lọc theo vai trò"
          value={selectedRole}
          onChange={(value) => setSelectedRole(value as number)}
          className="mb-4 w-full md:w-1/3 lg:w-1/4 h-10"
          treeData={[
            { value: 1, title: 'Admin' },
            { value: false, title: 'User' },
            { value: true, title: 'Teacher' }
          ]}
          allowClear
        /> */}
      </div>
      <Table
        columns={columns}
        pagination={false}
        dataSource={filteredData}
        rowKey="id"
        scroll={{ x: "max-content" }}
      />
      {contextHolder}

      <div className="pt-4 space-x-3 flex items-center justify-between">
        <p className='dark:text-[#b9b7c0]'>Trang số <span className='text-[#F84563] font-subtitle'>{users?.meta?.current_page}</span> trên tổng số <span className='text-[#F84563] font-subtitle'>{users?.meta?.last_page}</span> trang</p>

        <div className="space-x-2">
          {users?.meta?.last_page > 0 && (
            Array.from({ length: users?.meta?.last_page }, (_, index) => (
              <Button
                key={`page-${index}`}
                onClick={() => setPage(index + 1)}
                style={{
                  fontWeight: page === index + 1 ? 'bold' : 'normal', // Làm nổi bật trang hiện tại
                  backgroundColor: page === index + 1 ? '#f84563' : 'transparent', // Làm nổi bật trang hiện tại
                  color: page === index + 1 ? '#fff' : '#f84563', // Làm nổi bật trang hiện tại
                  height: '40px',
                }}
              >
                {index + 1}
              </Button>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default List_Users_Teacher;
