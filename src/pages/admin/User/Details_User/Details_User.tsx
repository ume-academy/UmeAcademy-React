import Loading from '@/components/client/commonComponents/Loading/Loading';
import { getTitleTab } from '@/constants/client';
import { useGetAStudentByIdQuery } from '@/redux/slices/user/userSlice';
import { FileDoneOutlined, HistoryOutlined } from '@ant-design/icons';
import { Avatar, Pagination, Table, Tabs, Tag } from 'antd';
import { User } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import styles from './detailsUser.module.scss';
import './detailsUserAntd.scss';
import { useGetHistoriesWalletByUserIdQuery } from '@/redux/slices/teacher/wallet/walletApiSlice';
import { THistoryWallet } from '@/interfaces/THistoryWallet';
import { formatDate, formatPrice } from '@/constants/utils';
import { TCourse } from '@/interfaces/TCourse';
import Card from '@/components/client/commonComponents/Card/Card';
import { useGetAllPurchasedCoursesByUserIdQuery } from '@/redux/slices/course/courseApiSlice';

const Details_User = () => {

  const { id } = useParams();

  // Tab information
  const { data: infoStudent, isLoading, isFetching } = useGetAStudentByIdQuery(id);

  // Tab wallet histories
  const { data: walletStudentHistories } = useGetHistoriesWalletByUserIdQuery(id);

  const { data: purchasedCourses } = useGetAllPurchasedCoursesByUserIdQuery(id);

  // Ưallet history
  const dataSource = walletStudentHistories?.data?.map((item: THistoryWallet, index: number) => (
    {
      key: index + 1,
      ...item
    }
  ))

  const columns = [
    {
      title: 'STT',
      key: 'key',
      dataIndex: 'key',
      width: 50,
      align: 'center' as const

    },
    {
      title: 'Mã giao dịch',
      dataIndex: 'code',
      key: 'code',
      minWidth: 120,
      align: 'center' as const
    },
    {
      title: 'Loại',
      render: (_: any, record: THistoryWallet) => (
        <span>{record?.type === 'deposit' ? 'Nạp tiền' : 'Rút tiền'}</span>
      ),
      align: 'center' as const
    },
    {
      title: 'Biến động số dư',
      render: (_: any, record: THistoryWallet) => (
        <span>{formatPrice(record?.balance_tracking)}</span>
      ),
      align: 'center' as const
    },
    {
      title: 'Ngày giao dịch',
      render: (_: any, record: THistoryWallet) => (
        <span>{formatDate(record?.created_at)}</span>
      )
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
    }
  ]

  if (isLoading && isFetching) return <div className="min-h-screen flex justify-center items-center"><Loading /> </div>;

  return (
    <div className="">
      <Helmet>
        <title>{getTitleTab('Chi tiết tài khoản')}</title>
      </Helmet>
      <div className={`${styles['parent']} rounded-xl dark:text-[#B9B7C0] dark:border-none dark:bg-[#2B2838]`}>
        <div className={`${styles['heading']} p-6`}>
          <h3 className="font-title text-2xl">Chi tiết tài khoản</h3>
        </div>

        <div className={`${styles['content']}`}>

          <div className="">
            <Tabs defaultActiveKey="1" className="tabsBar">
              {/* Thông tin tài khoản */}
              <Tabs.TabPane
                tab={
                  <div className="flex items-center justify-center gap-3">
                    <User size={20} />
                    Thông tin tài khoản
                  </div>
                }
                key="1"
              >
                {/* Nội dung tab 1 */}
                <div className={`${styles['tabContent']} dark:text-[#B9B7C0] `}>
                  <div className={`${styles['info']} flex flex-col md:flex-row items-center space-y-4 space-x-4 md:space-y-0 px-0 py-4 md:px-6`}>
                    <div className="avt">
                      <Avatar size={120} src={infoStudent?.avatar} className="border-[#F84563]" />
                    </div>

                    <div className={`${styles['subContent']} space-y-4`}>
                      <div className="">
                        <h2 className="font-title text-xl">Ảnh đại diện</h2>
                      </div>
                    </div>
                  </div>

                  <div className={`${styles['form']} flex space-x-4 p-6`}>
                    <div className={`${styles['heading']} pb-6`}>
                      <h3 className="font-title text-lg md:text-2xl">Thông tin cá nhân</h3>
                    </div>

                    <div className="flex flex-col gap-2 md:gap-4">
                      <div className="flex flex-col md:flex-row gap-2">
                        {/* Fullname */}
                        <div className="flex-1 flex items-start gap-x-2">
                          <span className='font-title'>Họ và tên: </span>

                          <p>{infoStudent?.fullname}</p>
                        </div>

                        {/* Display name */}
                        <div className="flex-1 flex items-start gap-x-2">
                          <span className='font-title'>Email: </span>

                          <p>{infoStudent?.email}</p>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-2">
                        {/* Phone number */}
                        <div className="flex-1 flex items-start gap-x-2">
                          <span className='font-title'>Trạng thái tài khoản: </span>

                          <p>{infoStudent?.is_lock === 0 ? 'Không khóa' : 'Đang khóa'}</p>
                        </div>

                        {/* Phone number */}
                        <div className="flex-1 flex items-start gap-x-2">
                          <span className='font-title'>Chức vụ: </span>

                          <p>{infoStudent?.is_teacher === true ? 'Giảng viên' : 'Học viên'}</p>
                        </div>
                      </div>

                      {/* Bio */}
                      <div className="">
                        <span className='font-title'>Giới thiệu: </span>

                        <p className='text-justify'>
                          {infoStudent?.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs.TabPane>

              {/* Lịch sử Ví UME */}
              <Tabs.TabPane
                tab={
                  <div className="flex items-center justify-center gap-3">
                    <HistoryOutlined />
                    Lịch sử Ví UME
                  </div>
                }
                key="2"
              >
                {/* Nội dung tab 2 */}

                {
                  walletStudentHistories ? (
                    <div className={`${styles['tabContent']} dark:text-[#B9B7C0] `}>

                      <div className="p-4 md:p-4 lg:p-0">
                        <div className={`${styles['parent']} p-4 dark:border-transparent dark:bg-[#2B2838] bg-white border border-[#e9ecef] rounded-xl`}>
                          <div className={`${styles['heading']} dark:border-b-[#5a5a5a] border-b-[#e9ecef] dark:text-[#b9b7c0] text-[#685f78] font-title text-lg md:text-2xl pb-4`}>
                            <h3>Danh sách giao dịch Ví UME</h3>
                          </div>

                          <div className={`${styles['content']}`} style={{ overflowX: 'auto' }}>
                            <Table dataSource={dataSource} columns={columns} pagination={false} className='dark:bg-[#2b2838] dark:text-[#B9B7C0]' />
                          </div>
                        </div>

                        <div className="flex justify-between items-center my-6 text-sm">
                          <span className='dark:text-[#b9b7c0]'>Trang số 1 trên tổng số 1 trang</span>

                          <Pagination />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='min-h-[70vh] flex flex-col justify-center space-y-3 items-center text-xl'>
                      <h3>Không có dữ liệu!</h3>
                      <p>Có thể tài khoản hiện tại chưa có giao dịch nào hoặc chưa được thiết lập <span className='text-[#F84563]'> Ví UME</span>!</p>
                    </div>
                  )
                }

              </Tabs.TabPane>

              {/* Khóa học đã mua */}
              <Tabs.TabPane
                tab={
                  <div className="flex items-center justify-center gap-3">
                    <FileDoneOutlined />
                    Khóa học đã mua
                  </div>
                }
                key="3"
              >
                <div className={`${styles['tabContent']} p-4 md:p-6 dark:text-[#B9B7C0]`}>
                  <div className={`${styles['heading']} dark:border-b-[#5a5a5a] border-b-[#e9ecef] dark:text-[#b9b7c0] text-[#685f78] font-title text-lg md:text-2xl pb-4`}>
                    <h3>Danh sách khóa học đã mua</h3>
                  </div>

                  {
                    purchasedCourses?.data?.length === 0 ? (

                      <div className='min-h-[70vh] flex flex-col justify-center space-y-3 items-center text-xl'>
                        <h3>Không có dữ liệu!</h3>
                        <p>Có thể tài khoản hiện tại chưa thực hiện mua khóa học nào!</p>
                      </div>

                    ) : (

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center w-full gap-4 py-4 md:gap-6 md:py-6">
                        {
                          purchasedCourses?.data?.map((item: TCourse, index: number) => (
                            <Card {...item} key={index + 1} />
                          ))
                        }
                      </div>
                    )
                  }

                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details_User