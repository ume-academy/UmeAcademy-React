import { WalletFilled } from '@ant-design/icons';
import { Pagination, Table, Tag } from 'antd';
import { CircleAlert, Landmark, X } from 'lucide-react';
import { useState } from 'react';
import '@/scss/PaginationAntd.scss'
interface Withdraw {
  key: string;
  method: string;
  date: string;
  amount: string;
  status: '0' | '1';
}

const withdraw: Withdraw[] = [
  { key: '1', method: 'Chuyển khoản ngân hàng', date: '10/12/2024', amount: '1000222', status: '1' },
  { key: '2', method: 'Chuyển khoản ngân hàng', date: '10/12/2024', amount: '500000', status: '0' },
  { key: '3', method: 'Chuyển khoản ngân hàng', date: '10/12/2024', amount: '300000', status: '1' },
  { key: '4', method: 'Chuyển khoản ngân hàng', date: '10/12/2024', amount: '300000', status: '1' }
];

const formatCurrency = (amount: string) => {
  const absAmount = Math.abs(parseInt(amount))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${parseInt(amount) < 0 ? '-' : ''}${absAmount} ₫`;
};

const Withdraw_Money = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: <div className='pl-5'>STT</div>,
      key: 'stt',
      width: 50,
      render: (_: any, __: any, index: number) => <div className='pl-5'>{index + 1}</div>
    },
    {
      title: 'Phương thức',
      dataIndex: 'method',
      key: 'method',
      width: 200,
      render: (type: string) => <div className='text-[16px]'>{type}</div>
    },
    {
      title: 'Thời gian yêu cầu',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (date: string) => <div className='text-[16px]'>{date}</div>
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      render: (amount: string) => (
        <span className='text-[16px]'>
          {formatCurrency(amount)}
        </span>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: '0' | '1') => (
        <Tag className='text-[16px] py-2 px-9' color={status === '1' ? 'green' : 'volcano'}>
          {status === '1' ? 'Thành công' : 'Thất bại'}
        </Tag>
      ),
      width: 100
    }
  ];

  return (
    <div>
      <div className='mb-4 dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] text-xl rounded-lg'>
        <p className='font-semibold border-b border-[#e9ecef] dark:border-[#5a5a5a] p-6'>Ví Ume</p>
        <div className='flex justify-between items-center p-6'>
          <div className='flex gap-4 items-center'>
            <div className='relative flex items-center'>
              <WalletFilled className='text-[#ff4667] text-[50px]' />
              <span className='absolute top-[-3px] left-2 text-[#fff] font-bold text-[10px]'>UME</span>
            </div>
            <div>
              <p>Số dư hiện tại</p>
              <p className='dark:hover:text-white'>Bạn đang có: 1000.000.000₫</p>
            </div>
          </div>
          <button
            onClick={openModal}
            className='bg-[#ff4667] text-white h-10 px-6 text-[15px] hover:border hover:text-[#ff4667] rounded-lg hover:border-[#ff4667] hover:bg-white'>
            Yêu cầu rút tiền
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] text-xl rounded-lg  relative w-[46%] p-6">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 border border-[#ff4667] rounded-full p-1 bg-white text-[#ff4667] hover:bg-[#ff4667] hover:text-white">
              <X size={16} />
            </button>
            <h2 className="font-semibold mb-4">Yêu cầu rút tiền</h2>
            <p className='text-[15px] mb-4'>Vui lòng kiểm tra thông báo giao dịch của bạn trên phương thức rút tiền bạn đã đăng kí</p>
            <div className='text-[16px] flex justify-between items-center mb-4'>
              <div>
                <p>Số dư hiện tại</p>
                <p className='text-[#ff4667]'>1000.000.000₫</p>
              </div>
              <div>
                <div className='flex gap-2'>
                  <span>Phương thức</span>
                  <span><Landmark size={22} /></span>
                </div>
                <p className=''>Chuyển khoản ngân hàng</p>
              </div>
            </div>
            <form>
              <div className="mb-6 text-[14px] space-y-2">
                <label htmlFor="amount" className="font-medium">
                  Số tiền
                </label>
                <input
                  id="amount"
                  type="number"
                  className="w-full pl-4 pr-4 py-2 dark:bg-[#131022] dark:border-none border border-[#e9ecef] outline-none rounded-md placeholder-gray-400"
                  placeholder="đ"
                />
                <div className="text-sm text-gray-400 flex items-center gap-1 pt-2">
                  <CircleAlert size={14} className='mr-2' />
                  <p>Số tiền rút tối thiểu là:</p>
                  <p className="text-white">50.000đ</p>
                </div>
              </div>
              <div className="flex justify-start text-[16px] gap-4">
                <button
                  type="submit"
                  className="bg-[#ff4667] border border-[#ff4667] text-white py-2 px-6 hover:border hover:text-[#ff4667] rounded-lg hover:border-[#ff4667] hover:bg-white">
                  Gửi yêu cầu
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className=" text-[#ff4667] py-2 px-4 rounded-lg border border-[#ff4667] hover:bg-[#ff4667] hover:text-white">
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      <div className='rounded-lg border border-[#e9ecef] dark:border-none dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78]'>
        <h2 className='text-xl font-semibold border-b border-[#e9ecef] dark:border-[#5a5a5a] p-6'>Lịch sử rút tiền</h2>
        <Table
          columns={columns}
          dataSource={withdraw}
          pagination={false}
          className='dark:bg-[#2b2838] dark:text-[#B9B7C0] p-6 '
        />
      </div>

      <div className='flex justify-end mt-6'>
        <Pagination defaultCurrent={1} total={22} />
      </div>
    </div>
  );
};

export default Withdraw_Money;
