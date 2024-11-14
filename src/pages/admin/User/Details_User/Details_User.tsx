import Card, { CardProps } from '@/components/client/commonComponents/Card/Card';
import { getTitleTab } from '@/constants/client';
import { EditFilled, FileDoneOutlined, HistoryOutlined } from '@ant-design/icons';
import { Avatar, Pagination, Table, Tabs, Tag } from 'antd';
import { Helmet } from 'react-helmet';
import styles from './detailsUser.module.scss';
import './detailsUserAntd.scss';

interface Transaction {
  id: number
  courseName: string
  date: string
  price: string
  status: '0' | '1'
}

const Details_User = () => {

  const cardData: CardProps = {
    image: 'https://i.pravatar.cc',
    title: 'Thông tin về thiết kế bằng UI/UX',
    instructorName: 'DaddyGiao',
    instructorImage: 'https://i.pravatar.cc/150',
    price: '1.000.000 đ',
    originalPrice: '9.000.000 đ',
    lessonCount: '12+ Bài học',
    duration: '9h 30p',
    rating: 5,
  };

  // Transaction history
  const transactions: Transaction[] = [
    {
      id: 2643,
      courseName: 'Xây dựng Website Thực tế với HTML5 và CSS3',
      date: '10/12/2024',
      price: '340.000',
      status: '0'
    },
    {
      id: 2644,
      courseName: 'Thiết kế từ A đến Z (2024): Trở thành nhà thiết kế ứng dụng',
      date: '10/11/2024',
      price: '340.000',
      status: '0'
    },
    {
      id: 2645,
      courseName: 'Hướng dẫn Cơ bản về Angular',
      date: '10/10/2024',
      price: '340.000',
      status: '1'
    },
    {
      id: 2646,
      courseName: 'Xây dựng Website Thực tế với HTML5 và CSS3',
      date: '14/12/2024',
      price: '340.000',
      status: '0'
    }
  ]

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      width: 50,
      render: (_: any, __: any, index: number) => index + 1,
      align: 'center' as const

    },
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => `#${text}`,
      minWidth: 120,
      align: 'center' as const
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'courseName',
      key: 'courseName',
      minWidth: 200
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text: string) => `${text} ₫`,
      minWidth: 120,
      align: 'center' as const
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: '0' | '1') => (
        <Tag className='text-[15px] py-2 px-6 min-w-[132px] text-center' color={status === '1' ? 'green' : 'volcano'}>
          {status === '1' ? 'Hoàn thành' : 'Đang chờ'}
        </Tag>
      )
    }
  ]

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
                    <EditFilled />
                    Chỉnh sửa thông tin
                  </div>
                }
                key="1"
              >
                {/* Nội dung tab 1 */}
                <div className={`${styles['tabContent']} dark:text-[#B9B7C0] `}>
                  <div className={`${styles['info']} flex flex-col md:flex-row items-center space-y-4 space-x-4 md:space-y-0 px-0 py-4 md:px-6`}>
                    <div className="avt">
                      <Avatar size={120} src={''} className="border-[#F84563]" />
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
                        <div className="flex-1 flex gap-2">
                          <span className='font-title'>Họ và tên: </span>

                          <p>Phạm Đào Vũ</p>
                        </div>

                        {/* Display name */}
                        <div className="flex-1 flex gap-2">
                          <span className='font-title'>Tên hiển thị: </span>

                          <p>Phạm Đào Vũ</p>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-2">
                        {/* Phone number */}
                        <div className="flex-1 flex gap-2">
                          <span className='font-title'>Số điện thoại: </span>

                          <p>0987654321</p>
                        </div>

                        {/* Phone number */}
                        <div className="flex-1 flex gap-2">
                          <span className='font-title'>Chức vụ: </span>

                          <p>Học viên</p>
                        </div>
                      </div>

                      {/* Bio */}
                      <div className="">
                        <span className='font-title'>Giới thiệu: </span>

                        <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quisquam, corrupti quo optio illo ullam in vitae id tenetur minus deserunt, quod illum culpa, earum quos quae voluptatem quam architecto.
                          Voluptate vero officiis, culpa sapiente maxime libero quibusdam nemo, sed obcaecati explicabo eaque iusto eos eum reprehenderit aperiam. Magni recusandae, tempora mollitia reiciendis animi necessitatibus odit doloribus quisquam ducimus accusantium!</p>
                      </div>
                    </div>
                  </div>
                </div>

              </Tabs.TabPane>

              {/* Lịch sử giao dịch */}
              <Tabs.TabPane
                tab={
                  <div className="flex items-center justify-center gap-3">
                    <HistoryOutlined />
                    Lịch sử giao dịch
                  </div>
                }
                key="2"
              >
                {/* Nội dung tab 2 */}
                <div className={`${styles['tabContent']} dark:text-[#B9B7C0] `}>

                  <div className="p-4 md:p-4 lg:p-0">
                    <div className={`${styles['parent']} p-4 dark:border-transparent dark:bg-[#2B2838] bg-white border border-[#e9ecef] rounded-xl`}>
                      <div className={`${styles['heading']} dark:border-b-[#5a5a5a] border-b-[#e9ecef] dark:text-[#b9b7c0] text-[#685f78] font-title text-lg md:text-2xl pb-4`}>
                        <h3>Danh sách học viên</h3>
                      </div>

                      <div className={`${styles['content']}`} style={{ overflowX: 'auto' }}>
                        <Table dataSource={transactions} columns={columns} pagination={false} className='dark:bg-[#2b2838] dark:text-[#B9B7C0]' />
                      </div>
                    </div>

                    <div className="flex justify-between items-center my-6 text-sm">
                      <span className='dark:text-[#b9b7c0]'>Trang số 1 trên tổng số 1 trang</span>

                      <Pagination />
                    </div>
                  </div>
                </div>
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
                {/* Nội dung tab 2 */}
                <div className={`${styles['tabContent']} p-4 md:p-6 dark:text-[#B9B7C0]`}>
                  <div className="heading">
                    <h5 className="font-title text-lg md:text-2xl">Danh sách khóa học đã mua</h5>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center w-full gap-4 py-4 md:gap-6 md:py-6">
                    <Card {...cardData} />
                    <Card {...cardData} />
                    <Card {...cardData} />
                    <Card {...cardData} />
                  </div>

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