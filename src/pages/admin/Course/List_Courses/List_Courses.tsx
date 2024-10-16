import { Modal, TreeSelect, TableColumnType, Table, message } from "antd";
import { Info } from "lucide-react";
import { useState } from "react";
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
  const handleChangeStatus = (id: number, value: number) => {
    const currentCourse = data.find(course => course.id === id);

    if (currentCourse && currentCourse.status === 0) {
      Modal.confirm({
        title: (
          <span className='text-red-500 font-title'>Xác nhận thay đổi trạng thái</span>
        ),
        content: (
          <p className='dark:text-[#b9b7c0] text-[#685f78]'>
            Bạn có chắc chắn muốn <span className='font-desc'>"{value === 1 ? "phê duyệt" : "từ chối"}"</span> khóa học này không?
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
        icon: null,
        width: 600,
        onOk: () => {
          setConfirmLoading(true); // Set loading state
          return new Promise((resolve) => {
            setTimeout(() => {
              setData(prevData =>
                prevData.map(course =>
                  course.id === id ? { ...course, status: value } : course
                )
              );

              messageApi.open({
                type: 'success',
                content: `${value === 1 ? "Phê duyệt" : "Từ chối"} khóa học thành công!`,
              });

              setConfirmLoading(false); // Stop loading
              resolve(undefined);
            }, 2000); // Giả lập thời gian xử lý
          });
        }
      });
    } else {
      Modal.warning({
        title: "Cảnh báo",
        content: "Trạng thái này không thể thay đổi.",
        okText: 'Đồng ý',
        okButtonProps: {
          style: { backgroundColor: '#F84563', color: '#fff' }, // Thêm style cho nút OK trong cảnh báo
        },
      });
    }
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

  const columns: TableColumnType<Course>[] = [
    {
      title: "Stt",
      key: "stt",
      render: (_, record, index: number) => <div>{index + 1}</div>,
      width: 50
    },
    {
      title: "Ảnh",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail) => <img src={thumbnail} alt="Course thumbnail" width={100} />,
      width: 80
    },
    {
      title: "Tên khóa học",
      dataIndex: "title",
      key: "title",
      width: 250
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
      width: 150
    },
    {
      title: "Số tiền",
      dataIndex: "price",
      key: "price",
      render: (price) => <div>{price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>, // Format price
      width: 100
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        if (status === 0) {
          return (
            <CustomTreeSelect
              value='Chờ phê duyệt'
              treeDefaultExpandAll
              className="w-[140px] mt-1"
              onChange={(value) => handleChangeStatus(record.id, value ? 1 : 2)}
              treeData={[
                { value: true, title: <span className="text-green-500">Phê duyệt</span> },
                { value: false, title: <span className="text-[#ff4667]">Từ chối</span> }
              ]}
            />
          );
        } else if (status === 1) {
          return <span className="text-green-500">Đã phê duyệt</span>;
        } else if (status === 2) {
          return <span className="text-red-500">Đã bị từ chối</span>;
        }
      },
      width: 150
    },
    {
      title: "Chi tiết",
      key: "actions",
      width: 80,
      render: (record) => (
        <div>
          <Link to={`/admin/course-detail/${record.id}`}>
            <Info className="flex-1 text-xl hover:text-[#ff4667] ml-3" />
          </Link>
        </div>
      ),
    }
  ];

  return (
    <>
      {contextHolder}
      <div className="dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg p-4">
        <div className="flex justify-between mb-4">
          <p className="font-title text-2xl">Danh sách khóa học</p>
          <CustomTreeSelect
            placeholder="Lọc theo trạng thái"
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value as string)}
            className="w-40 h-10"
            treeData={[
              { value: 0, title: 'Chờ phê duyệt' },
              { value: 1, title: 'Đã phê duyệt' },
              { value: 2, title: 'Đã từ chối' }
            ]}
            allowClear
          />
        </div>
        <Table
          columns={columns}
          pagination={false}
          rowKey="id"
          dataSource={filteredData}
        />
      </div>
    </>
  );

}

export default List_Courses;
