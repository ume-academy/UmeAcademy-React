import Loading from "@/components/client/commonComponents/Loading/Loading";
import { router } from "@/configs/routes";
import { getTitleTab } from "@/constants/client";
import { TUser } from "@/interfaces/TUser";
import { useGetUsersQuery, useLockUserMutation, useUnLockUserMutation } from "@/redux/slices/user/userSlice";
import { Image, message, Modal, Pagination, Space, Switch, Table, TableColumnsType, TreeSelect } from "antd";
import { Info, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import './List_User_Antd.scss';

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

const List_Users = () => {

  const [data, setData] = useState<any>([]);

  const [searchText, setSearchText] = useState<string>("");

  const [status, setStatus] = useState<any>(undefined);

  const [role, setRole] = useState<any>(undefined);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const [page, setPage] = useState(1);

  // mặc định sẽ lấy trang đầu tiên
  const { data: users, isLoading, isFetching } = useGetUsersQuery({ page: page, status: status, role: role });

  const [lockUser] = useLockUserMutation();

  const [unLockUser] = useUnLockUserMutation();


  console.log(users)

  useEffect(() => {
    if (users?.data) {

      if (users?.data) {
        setData(users?.data);
      }
    }
  }, [users]);

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

  const columns: TableColumnsType<TUser> = [
    {
      title: "STT",
      render: (_, record, index: number) => {
        // Tính toán STT dựa trên trang và số bản ghi mỗi trang
        return (+users?.meta?.current_page - 1) * (+users?.meta?.per_page) + index + 1;
      },
      width: 50,
      align: "center",
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
          // onClick={() => console.log(record)}
          />
        </Space>
      ),
      width: 100
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

  // opts Stt
  const optionsStatus = [
    { value: 'active', title: 'Đang hoạt động' },
    { value: 'locked', title: 'Đã khóa' },
  ];

  // // opts Role
  // const optionsRole = [
  //   { value: 'teacher', title: 'Giảng viên'},
  //   { value: 'user', title: 'Học viên'},
  // ]

  if (isLoading && isFetching) return <div className="min-h-screen flex justify-center items-center"><Loading /> </div>;

  return (
    <div className="dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg p-4">
      <Helmet>
        <title>{getTitleTab('Quản lý tài khoản học viên')}</title>
      </Helmet>

      <p className="mb-4 font-title text-xl">Danh sách học viên</p>

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
          value={status}
          onChange={(value) => setStatus(value as string)}
          className="mb-4 w-full md:w-1/3 lg:w-1/4 h-10"
          treeData={optionsStatus}
          allowClear
        />
{/* 

        <CustomTreeSelect
          placeholder="Lọc theo vai trò"
          value={role}
          onChange={(value) => setRole(value as string)}
          className="mb-4 w-full md:w-1/3 lg:w-1/4 h-10"
          treeData={optionsRole}
          allowClear
        /> */}
      </div>
      <Table
        columns={columns}
        pagination={false}
        dataSource={data}
        rowKey="id"
        scroll={{ x: "max-content" }}
      />
      {contextHolder}

      <div className="pt-4 space-x-3 flex items-center justify-between">
        <p className='dark:text-[#b9b7c0]'>Trang số <span className='text-[#F84563] font-subtitle'>{users?.meta?.current_page}</span> trên tổng số <span className='text-[#F84563] font-subtitle'>{users?.meta?.last_page}</span> trang</p>

        {/* <div className="space-x-2">
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
        </div> */}

        <Pagination
          pageSize={10}
          total={users?.meta?.total}
          current={users?.meta?.current_page}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default List_Users;
