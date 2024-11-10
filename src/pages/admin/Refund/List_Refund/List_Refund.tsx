import { message, Pagination, Table, Tag } from 'antd';
import { useState } from 'react';
import './listRefundAntd.scss';
import { Helmet } from 'react-helmet';
import { getTitleTab } from '@/contants/client';

const List_Refund = () => {

  // loading for something
  const [confirmLoading, setConfirmLoading] = useState(false);

  // message alert
  const [messageApi, contextHolder] = message.useMessage();

  const data = [
    {
      id: '1',
      name: 'Công Nghệ Thông Tin',
      transactionCode: 'HD123456',
      refundPrice: '1.000.000đ',
      reason: 'Không hài lòng về chất lượng khóa học',
      requestAt: '10/10/2024',
      refundAt: '11/10/2024',
      status: 'Đã hoàn tiền',
    },
    {
      id: '2',
      name: 'Thiết kế đồ họa',
      transactionCode: 'FD163456',
      refundPrice: '1.200.000đ',
      reason: 'Tệ',
      requestAt: '10/11/2024',
      refundAt: '',
      status: 'Đang chờ xử lý',
    },
    {
      id: '3',
      name: 'Marketing',
      transactionCode: 'XD357896',
      refundPrice: '2.000.000đ',
      reason: 'Chưa nghĩ ra',
      requestAt: '10/10/2024',
      refundAt: '11/10/2024',
      status: 'Không được hoàn tiền',
    },
  ]

  const dataSource = data?.map((item: any, index: number) => (
    {
      key: index + 1,
      ...item
    }
  ));

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      align: 'center' as const,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      minWidth: 180,
    },
    {
      title: 'Mã giao dịch',
      dataIndex: 'transactionCode',
      key: 'transactionCode',
      minWidth: 200,
      align: 'center' as const,
    },
    {
      title: 'Lý do hoàn trả',
      // dataIndex: 'reason',
      // key: 'reason',
      render: ((_: any, item: any) => (
        <div className="">
          <p className='w-[120px] overflow-hidden text-ellipsis whitespace-nowrap'>{item.reason}</p>
        </div>
      )),
    },
    {
      title: 'Ngày yêu cầu',
      dataIndex: 'requestAt',
      key: 'requestAt',
      align: 'center' as const,
      minWidth: 150,
    },
    {
      title: 'Ngày hoàn trả',
      dataIndex: 'refundAt',
      key: 'refundAt',
      align: 'center' as const,
      minWidth: 150,
    },
    {
      title: 'Trạng thái',
      render: ((_: any, item: any) => (
        <div className="flex items-center justify-center">
          <Tag
            className='min-w-[180px] text-sm lg:text-[16px] py-1 lg:py-2 text-center'
            color={
              item.status === 'Đã hoàn tiền' ? 'green' :
                item.status === 'Đang chờ xử lý' ? 'gold' :
                  item.status === 'Không được hoàn tiền' ? 'red' : 'defaultColor'
            }
          >
            {item.status}
          </Tag>
        </div>
      )),
      align: 'center' as const,
    },
  ];

  return (
    <>
      {contextHolder}
      <Helmet>
        <title>{getTitleTab('Danh sách sản phẩm hoàn tiền')}</title>
      </Helmet>
      <div className="p-4 md:p-6">
        <div className="heading flex justify-between items-center pb-4 ">
          <h5 className='font-title text-xl dark:text-[#b9b7c0] text-[#685f78]'>Danh sách sản phẩm hoàn tiền</h5>

          {/* <Link
            to={'/admin/catalogues/create'}
            className='
            border 
            border-[#F84563] 
            py-2
            px-3
            w-auto
            rounded-md 
            bg-[#F84563] 
            md:w-[15%] 
            flex 
            justify-center 
            items-center 
            text-white 
            hover:bg-white 
            hover:border-[#F84563] 
            hover:text-[#F84563] 
            gap-3
            md:py-2 md:px-5
            '
          >
            <PlusCircleOutlined />
            Thêm mới
          </Link> */}
        </div>

        <div className='content' style={{ overflowX: 'auto' }}>
          {/* <Table dataSource={dataSource} columns={columns} className='table' /> */}
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            className='table dark:bg-[#2b2838] dark:text-[#B9B7C0]'
          />
        </div>

        <div className="flex justify-between items-center my-6 text-sm">
          <span className='dark:text-[#b9b7c0]'>Trang số 1 trên tổng số 1 trang</span>

          <Pagination />
        </div>
      </div>
    </>
  )
}

export default List_Refund