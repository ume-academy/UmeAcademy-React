import { router } from "@/configs/routes";
import { getTitleTab } from "@/constants/client";
import { TUser } from "@/interfaces/TUser";
import { Form, Image, message, Modal, Select, Space, Switch, Table, TableColumnsType, TreeSelect } from "antd";
import { Info, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import '../../User/List_Users/List_User_Antd.scss';
import { PlusCircleOutlined } from "@ant-design/icons";
import { useAssignRoleUserByIdMutation, useGetAllUsersSystemQuery, useLockUserMutation, useUnLockUserMutation } from "@/redux/slices/user/userSlice";
import { useGetAllRoleQuery } from "@/redux/slices/role/roleApiSlice";
import Loading from "@/components/client/commonComponents/Loading/Loading";
import { TRole } from "@/interfaces/TRole";
import useLoading from "@/hooks/useLoading";

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

const System_Users = () => {

  const [data, setData] = useState<any>([]);

  const { loading, startLoading, stopLoading } = useLoading();

  const [searchText, setSearchText] = useState<string>("");

  const [selectedRole, setSelectedRole] = useState<any>(undefined);

  const [selectedStatus, setSelectedStatus] = useState<any>(undefined);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  // const [page, setPage] = useState(1);

  const { data: usersSystem, isLoading, isFetching } = useGetAllUsersSystemQuery([]);

  const [lockUser] = useLockUserMutation();

  const [unLockUser] = useUnLockUserMutation();

  const { data: roles } = useGetAllRoleQuery([]);

  const [updateRole] = useAssignRoleUserByIdMutation();

  // console.log(data);

  useEffect(() => {
    if (usersSystem?.data) {

      if (usersSystem?.data) {
        setData(usersSystem?.data);
      }
    }
  }, [undefined, usersSystem, data]);

  const onHandleChangeUpdateRole = async (roleName: string, userId: number) => {


    try {
      startLoading();
  
      const res = await updateRole({
        id: userId,
        role: roleName
      }).unwrap();
  
      if (res?.data) {
        // Cập nhật lại state với role mới
        // setData((prevData: TUser[]) =>
        //   prevData.map((user) =>
        //     user.id === userId
        //       ? {
        //           ...user,
        //           role: user.role.map((r) =>
        //             r.name === roleName ? { ...r, name: roleName } : r
        //           ),
        //         }
        //       : user
        //   )
        // );
  
        stopLoading();
        return message.success('Cập nhật vai trò thành công!');
      }
    } catch (error) {
      console.error(error);
      stopLoading();
      message.error('Cập nhật vai trò thất bại!');
    }
  };
  

  const handleChangeStatus = (id: string, checked: any) => {
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
      onOk: async () => {
        try {

          if (!id) return;

          const res = checked ? await unLockUser(id).unwrap() : await lockUser(id).unwrap();

          console.log(res)

          if (res?.data) {
            message.success(`${checked ? "Mở khóa" : "Khóa"} tài khoản thành công!`)
          }

        } catch (error: any) {
          console.log(error)

          return message.error(error?.data?.message || 'Có lỗi từ hệ thống, vui lòng thử lại sau')
        }
      }
    });
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

  const rolesData = roles?.data?.data?.map((item: TRole, index: number) => (
    {
      key: index + 1,
      value: item.id,
      label: item.name
    }
  ));

  const columns: TableColumnsType<TUser> = [
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
        <Image src={record?.avatar} alt={record?.avatar ? record?.avatar : 'Chưa có avatar'} width={100} height={100} className="object-cover" />
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
      render: (_: any, record) => (
        record?.role?.map((role) => (
          <Select
            loading={loading}
            key={`${record.id}-${role.id}`}
            options={rolesData}
            style={{ width: '100%' }}
            onChange={(newRoleId) => {
              const selectedRole = rolesData.find((r: any) => r.value === newRoleId);
              onHandleChangeUpdateRole(selectedRole?.label, record.id);
            }}
            defaultValue={role.id} // Hiển thị name hiện tại
          />
        ))
      ),
      width: 120,
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

  if (isLoading && isFetching) return <div className="min-h-screen flex justify-center items-center"><Loading /> </div>;

  return (
    <div className="dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg p-4">
      <Helmet>
        <title>{getTitleTab('Quản lý tài khoản hệ thống')}</title>
      </Helmet>

      <div className="heading pb-4 flex justify-between items-center">
        <p className="font-title text-xl">Danh sách người dùng hệ thống</p>

        {/* <Link to={router.userSystemCreate}>Thêm mới</Link> */}

        <Link
          to={router.userSystemCreate}
          className='
            border 
            border-[#F84563] 
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
            gap-x-3
            md:py-2 md:px-5
            lg:w-auto
            '
        >
          <PlusCircleOutlined />
          Thêm mới
        </Link>
      </div>


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
            { value: 2, title: 'Mặc định' },
            { value: 1, title: 'Khóa' },
            { value: 0, title: 'Mở' }
          ]}
          allowClear
        />

        <CustomTreeSelect
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
        />
      </div>

      <Table
        columns={columns}
        pagination={false}
        dataSource={filteredData}
        rowKey="id"
        scroll={{ x: "max-content" }}
      />
      {contextHolder}

      {/* <div className="pt-4 space-x-3 flex items-center justify-between">
        <p className='dark:text-[#b9b7c0]'>Trang số <span className='text-[#F84563] font-subtitle'>{users?.meta?.current_page}</span> trên tổng số <span className='text-[#F84563] font-subtitle'>{users?.meta?.last_page}</span> trang</p>

        <Pagination
          pageSize={users?.meta?.per_page}
          total={users?.meta?.total}
          current={users?.meta?.current_page}
          onChange={(page) => setPage(page)}
        />
      </div> */}
    </div>
  );
};

export default System_Users;
