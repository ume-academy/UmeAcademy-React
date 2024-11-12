import { getTitleTab } from "@/contants/client";
import { DatePicker, Modal, Table, Tag, TreeSelect } from "antd";
import { Info } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

interface Transaction {
  id: number
  fullName: string,
  price: number,
  created_at?: string;
  status: number,
  withdrawal_method: string
}
const List_Transactions_Instructor = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [isModal, setIsModal] = useState(false)
  const [startDate, setStartDate] = useState<string | null>(null)
  const [endDate, setEndDate] = useState<string | null>(null)

  const showModal = () => {
    setIsModal(true)
  }

  const [data, setData] = useState<Transaction[]>([
    {
      id: 12323321,
      fullName: "Vũ Ngọc Giao",
      price: 30000000,
      created_at: "2024-11-01",
      status: 0,
      withdrawal_method: "Chuyển khoản ngân hàng"
    },
    {
      id: 12323221,
      fullName: "Vũ Ngọc Giao",
      price: 30000000,
      created_at: "2024-12-01",
      status: 1,
      withdrawal_method: "Chuyển khoản ngân hàng"
    }
  ])
  const filteredDate = (transaction: Transaction) => {
    const createdAt = transaction.created_at ? new Date(transaction.created_at) : '';

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return (
      (!start || createdAt >= start) &&
      (!end || createdAt <= end)
    );
  };

  const filteredStatus = (transaction: Transaction) => {
    return selectedStatus === undefined || transaction.status === Number(selectedStatus)
  }

  const filteredData = () => {
    return data.filter(transaction => (
      filteredDate(transaction) && filteredStatus(transaction)
    ))


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
  const columns = [
    {
      title: "Stt",
      key: 'index',
      dataIndex: "index",
      render: (_: any, __: any, index: number) => (<p>{index + 1}</p>),
      width: 60
    },
    {
      title: "Mã giao dịch",
      key: 'id',
      dataIndex: "id",
      width: 120
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
      width: 220
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: 0 | 1 | 2) => (
        <Tag className="text-sm py-1 px-2 min-w-[120px] text-center" color={status === 0 ? "blue" : status === 1 ? "green" : "red"}>
          {
            status === 0 ? "Chưa thanh toán" : status === 1 ? "Đã thanh toán" : "Đã từ chối"
          }
        </Tag>
      ),
      width: 100
    }
  ]

  return (
    <div className="dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg p-4">
      <Helmet>
        <title>{getTitleTab('Quản lý giao dịch')}</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
        <p className="text-xl font-semibold">Danh sách giao dịch của giảng viên</p>
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 items-center mt-4 md:mt-2 lg:mt-0">
          <div className="flex gap-2 items-center">
            <DatePicker
              value={startDate}
              placeholder="Ngày bắt đầu"
              className="dark:bg-[#2b2838] bg-white h-9"
              onChange={setStartDate}
            />
            <span className="hidden sm:block">-</span>
            <DatePicker
              value={endDate}
              placeholder="Ngày kết thúc"
              className="dark:bg-[#2b2838] bg-white h-9"
              onChange={setEndDate}
            />
          </div>
          <CustomTreeSelect
            placeholder="Lọc theo trạng thái"
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value as string)}
            className="w-full sm:w-40 h-10"
            treeData={[
              { value: 0, title: 'Chưa thanh toán' },
              { value: 1, title: 'Đã thanh toán' },
              { value: 2, title: 'Đã từ chối' },
            ]}
            allowClear
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData()}
        scroll={{ x: "max-content" }}
      />

      {isModal && (
        <Modal
          title={<span className="text-red-500 font-semibold">Thông tin phương thức thanh toán</span>}
          visible={isModal}
          closable={false}
          footer={null}
          centered
          width={500}
        >
          <div className="dark:text-gray-300 text-gray-700 space-y-2">
            <p className="font-semibold">Họ và tên: <span className="font-normal">Vũ Ngọc Giao</span></p>
            <p className="font-semibold">Phương thức: <span className="font-normal">Chuyển khoản ngân hàng</span></p>
            <p className="font-semibold">Ngân hàng hưởng thụ: <span className="font-normal">MB Bank</span></p>
            <p className="font-semibold">Số tài khoản: <span className="font-normal">998111999</span></p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModal(false)}
                className="px-6 py-1 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                Đóng
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default List_Transactions_Instructor