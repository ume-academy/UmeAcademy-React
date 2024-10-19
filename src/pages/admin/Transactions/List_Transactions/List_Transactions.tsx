import { getTitleTab } from "@/contants/client";
import { message, Modal, Table, TreeSelect } from "antd";
import { Info } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

interface Transaction {
  id: number
  fullName: string,
  price: number,
  created_at?: Date;
  status: number,
  withdrawal_method: string
}
const List_Transactions = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [isModal, setIsModal] = useState(false)

  const showModal = () => {
    setIsModal(true)
  }

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
  const [data, setData] = useState<Transaction[]>([
    {
      id: 12323321,
      fullName: "Vũ Ngọc Giao",
      price: 30000000,
      created_at: new Date(),
      status: 0,
      withdrawal_method: "Chuyển khoản ngân hàng"
    }
  ])
  const filteredData = data.filter(transaction => selectedStatus === undefined || transaction.status === Number(selectedStatus))
  const handleChangeStatus = (id: number, value: number) => {
    Modal.confirm({
      title: (
        <span className='text-red-500 font-title'>Xác nhận thay đổi trạng thái</span>
      ),
      content: (
        <p className='dark:text-[#b9b7c0] text-[#685f78]'>
          Bạn có chắc chắn muốn <span className='font-desc'>"{value === 1 ? "phê duyệt" : "từ chối"}"</span> khoản rút này không?
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
      icon: null,
      width: 600,
      onOk: () => {
        setConfirmLoading(true); // Set loading state
        return new Promise((resolve) => {
          setTimeout(() => {
            setData(preData =>
              preData.map(t => t.id === id ? { ...t, status: value } : t)
            )

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
  }
  const columns = [
    {
      title: "Stt",
      key: 'index',
      dataIndex: "index",
      render: (_: any, record: any, index: number) => (<p>{index + 1}</p>),
      width: 60
    },
    {
      title: "Mã giao dịch",
      key: 'id',
      dataIndex: "id",
      width: 100
    },
    {
      title: "Họ và tên",
      key: 'fullName',
      dataIndex: "fullName",
      width: 160
    },
    {
      title: "Số tiền",
      key: 'price',
      dataIndex: "price",
      render: (price: number) => (
        <p>{price?.toLocaleString('vi-VN')}đ</p>
      ),
      width: 120
    },
    {
      title: "Thời gian",
      key: 'created_at',
      dataIndex: "created_at",
      render: (created_at: Date) => (
        <p>{created_at?.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
      ),
      width: 150
    },
    {
      title: "Phương thức giao dịch",
      key: 'withdrawal_method',
      dataIndex: "withdrawal_method",
      render: (withdrawal_method: string) => (
        <div title="thông tin"
          className="flex gap-1 items-center hover:text-[#ff4667] cursor-pointer"
          onClick={() => showModal()}
        >
          <p>{withdrawal_method}</p>
          <Info size={14} />
        </div>
      ),
      width: 200
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: number, record: any) => {
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
      width: 100
    }
  ]

  return (
    <div>
      {contextHolder}
      <div className="dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg p-4 ">
      <Helmet>
        <title>{getTitleTab('Quản lý giao dịch')}</title>
      </Helmet>
        <div className="flex justify-between mb-4">
          <p className="font-title text-xl">Danh sách giao dịch</p>
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
          dataSource={filteredData} />
      </div>
      {isModal && (
        <Modal
          title={<span className='text-red-500 font-title'>Thông tin phương thức thanh toán</span>}
          visible={isModal}
          closable={false}
          footer={null}
          centered={true}
          width={500}
        >
          <div className='dark:text-[#b9b7c0] text-[#685f78] space-y-2'>
            <p className="font-semibold">Họ và tên: <span className="font-normal">Vũ Ngọc Giao</span></p>
            <p className="font-semibold">Phương thức: <span className="font-normal">Chuyển khoản ngân hàng</span></p>
            <p className="font-semibold">Ngân hàng hưởng thụ: <span className="font-normal">MB Bank</span></p>
            <p className="font-semibold">Số tài khoản: <span className="font-normal">998111999</span></p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModal(false)}
                className="hover:bg-[#F84563] border border-[#F84563] hover:text-white text-[#F84563] bg-white px-6 py-1 rounded-lg transition-all duration-300 ease-in-out">
                Đóng
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  )
}

export default List_Transactions