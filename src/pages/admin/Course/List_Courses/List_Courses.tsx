import { getTitleTab } from "@/constants/client";
import { Modal, TreeSelect, TableColumnType, Table, message, Tag } from "antd";
import { Info } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Course {
  id: number;
  title: string;
  thumbnail: string;
  author: string;
  created_at?: Date;
  price: number;
  status: number;
}

const List_Courses = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<Course[]>([
    {
      id: 1,
      title: "React cho người mới bắt đầu",
      thumbnail: "https://i.pravatar.cc",
      author: "Vũ Ngọc Giao",
      created_at: new Date("2023-07-01"),
      price: 1000000,
      status: 0 // Đang chờ duyệt
    },
    {
      id: 2,
      title: "Node.js nâng cao",
      thumbnail: "https://i.pravatar.cc",
      author: "Daddy Giao",
      created_at: new Date("2023-06-20"),
      price: 1500000,
      status: 1 // Đã phê duyệt
    },
    {
      id: 3,
      title: "Giới thiệu về TypeScript",
      thumbnail: "https://i.pravatar.cc",
      author: "Dao",
      created_at: new Date("2023-05-15"),
      price: 2000000,
      status: 2 // Đã bị từ chối
    }
  ]);

  const filteredData = data.filter(course =>
    selectedStatus === undefined || course.status === Number(selectedStatus)
  );

  // const handleChangeStatus = (id: number, value: number) => {
  //   const currentCourse = data.find(course => course.id === id);

  //   if (currentCourse && currentCourse.status === 0) {
  //     Modal.confirm({
  //       title: (
  //         <span className='text-red-500 font-title'>Xác nhận thay đổi trạng thái</span>
  //       ),
  //       content: (
  //         <p className='dark:text-[#b9b7c0] text-[#685f78]'>
  //           Bạn có chắc chắn muốn <span className='font-desc'>"{value === 1 ? "phê duyệt" : "từ chối"}"</span> khóa học này không?
  //         </p>
  //       ),
  //       okText: 'Đồng ý',
  //       okType: 'danger',
  //       onOk: () => {
  //         setConfirmLoading(true);
  //         return new Promise((resolve) => {
  //           setTimeout(() => {
  //             setData(prevData =>
  //               prevData.map(course =>
  //                 course.id === id ? { ...course, status: value } : course
  //               )
  //             );

  //             messageApi.open({
  //               type: 'success',
  //               content: `${value === 1 ? "Phê duyệt" : "Từ chối"} khóa học thành công!`,
  //             });

  //             setConfirmLoading(false);
  //             resolve(undefined);
  //           }, 2000);
  //         });
  //       },
  //       cancelText: 'Hủy',
  //       centered: true,
  //       maskClosable: false,
  //       icon: null,
  //       width: 600,
  //     });
  //   } else {
  //     Modal.warning({
  //       title: "Cảnh báo",
  //       content: "Trạng thái này không thể thay đổi.",
  //       okText: 'Đồng ý',
  //     });
  //   }
  // };

  const CustomTreeSelect = styled(TreeSelect)`
    .ant-select-selector {
      background-color: #fafafa !important;
      border: 1px solid #c1c9d2 !important;
    }
    .dark & .ant-select-selector {
      background-color: #131022 !important;
      border: 1px solid #c7c7c740 !important;
    }
    @media (max-width: 768px) {
      .ant-select-selector {
        width: 100% !important;
      }
    }
  `;

  const columns: TableColumnType<Course>[] = [
    {
      title: "Stt",
      key: "stt",
      render: (_, record, index: number) => <div>{index + 1}</div>,
      width: 50,
      responsive: ["md"],
    },
    {
      title: "Ảnh",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail) => <img src={thumbnail} alt="Course thumbnail" width={100} />,
      width: 80,
      responsive: ["sm"],
    },
    {
      title: "Tên khóa học",
      dataIndex: "title",
      key: "title",
      width: 250,
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
      width: 150,
      responsive: ["md"],
    },
    {
      title: "Số tiền",
      dataIndex: "price",
      key: "price",
      render: (price) => <div>{price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>,
      width: 100,
      responsive: ["md"],
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => (
        <div>{created_at ? new Date(created_at).toLocaleDateString('vi-VN') : "N/A"}</div>
      ),
      width: 150,
      responsive: ["lg"],
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      // render: (status, record) => {
      //   if (status === 0) {
      //     return (
      //       <CustomTreeSelect
      //         value='Chờ phê duyệt'
      //         onChange={(value) => handleChangeStatus(record.id, value ? 1 : 2)}
      //         treeData={[
      //           { value: true, title: <span className="text-green-500">Phê duyệt</span> },
      //           { value: false, title: <span className="text-[#ff4667]">Từ chối</span> }
      //         ]}
      //       />
      //     );
      //   } else if (status === 1) {
      //     return <span className="text-green-500">Đã phê duyệt</span>;
      //   } else if (status === 2) {
      //     return <span className="text-red-500">Đã bị từ chối</span>;
      //   }
      // },
      render: (status: 0 | 1 | 2) => (
        <Tag className="text-sm py-1 px-2 min-w-[110px] text-center" color={status === 0 ? "blue" : status === 1 ? "green" : "red"}>
          {
            status === 0 ? "Chưa phê duyệt" : status === 1 ? "Đã phê duyệt" : "Đã từ chối"
          }
        </Tag>
      ),
      width: 150,
    },
    {
      title: "Chi tiết",
      key: "actions",
      render: (record) => (
        <Link to={`/admin/check-course/${record.id}`}>
          <Info className="flex-1 text-xl hover:text-[#ff4667] ml-3" />
        </Link>
      ),
      width: 80,
    }
  ];

  return (
    <>
      <Helmet>
        <title>{getTitleTab('Quản lý khóa học')}</title>
      </Helmet>
      {contextHolder}
      <div className="dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg p-4">
        <div className="flex flex-wrap justify-between items-center pb-4">
          <p className="font-title text-xl">Danh sách khóa học</p>
          <CustomTreeSelect
            placeholder="Lọc theo trạng thái"
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value as string)}
            className="w-40 h-10 mt-4 md:mt-0"
            treeData={[
              { value: 0, title: 'Chờ phê duyệt' },
              { value: 1, title: 'Đã phê duyệt' },
              { value: 2, title: 'Đã từ chối' }
            ]}
            allowClear
          />
        </div>
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            pagination={false}
            rowKey="id"
            dataSource={filteredData}
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
    </>
  );
}

export default List_Courses;
