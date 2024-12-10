import Card from '@/components/client/commonComponents/Card/Card';
import Loading from '@/components/client/commonComponents/Loading/Loading';
import { getTitleTab } from '@/constants/client';
import { formatDate, formatPrice } from '@/constants/utils';
import { TCourse } from '@/interfaces/TCourse';
import { THistoryWallet } from '@/interfaces/THistoryWallet';
import { useGetAllPurchasedCoursesByTeacherIdQuery } from '@/redux/slices/course/courseApiSlice';
import { useGetHistoriesWalletByTeacherIdQuery } from '@/redux/slices/teacher/wallet/walletApiSlice';
import { useGetATeacherByIdQuery } from '@/redux/slices/user/userSlice';
import { FileDoneOutlined, HistoryOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, Pagination, Rate, Table, Tabs } from 'antd';
import { PercentCircle, User } from 'lucide-react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import styles from '../Details_User/detailsUser.module.scss';
import '../Details_User/detailsUserAntd.scss';
import useLoading from '@/hooks/useLoading';

const Details_Teacher = () => {

  const [page, setPage] = useState(1);

  const {loading, startLoading, stopLoading} = useLoading();

  const [form] = Form.useForm();

  const { id } = useParams();

  const { data: infoTeacher, isLoading, isFetching } = useGetATeacherByIdQuery(id);

  const { data: walletTeacherHistories } = useGetHistoriesWalletByTeacherIdQuery(id as string);

  const { data: teacherCourses } = useGetAllPurchasedCoursesByTeacherIdQuery(id);

  // const { data: rateCommission, isFetching, isError, error } = useGetCommissionRateQuery('1');

  // console.log(teacherCourses);

  // Wallet history
  const dataSource = walletTeacherHistories?.data?.map((item: THistoryWallet, index: number) => (
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

  // Fill data to form 
  // useEffect(() => {
  //   if (rateCommission) {
  //     form.setFieldsValue(rateCommission);
  //   }
  // }, [rateCommission, form])


  // Form submit update fee for a teacher
  const onFinish = (values: any) => {
    console.log(values);
  }

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
                      <Avatar size={120} src={infoTeacher?.avatar} className="border-[#F84563]" />
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
                      <div className="flex flex-col md:flex-row gap-x-2">
                        {/* Fullname */}
                        <div className="flex-1 flex items-center gap-x-2">
                          <span className='font-title'>Họ và tên: </span>

                          <p>{infoTeacher?.fullname}</p>
                        </div>

                        {/* Email */}
                        <div className="flex-1 flex items-start gap-x-2">
                          <span className='font-title'>Email: </span>

                          <p>{infoTeacher?.email}</p>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-2">
                        {/* Phone number */}
                        <div className="flex-1 flex items-start gap-x-2">
                          <span className='font-title'>Tổng số khóa học: </span>

                          <p>{infoTeacher?.total_course}</p>
                        </div>

                        {/* Phone number */}
                        <div className="flex-1 flex items-start gap-x-2">
                          <span className='font-title'>Đánh giá giảng viên: </span>

                          {/* <p>{infoTeacher?.rating} sao</p>  */}
                          <Rate disabled value={infoTeacher?.rating} />
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-2">
                        {/* Phone number */}
                        <div className="flex-1 flex items-start gap-x-2">
                          <span className='font-title'>Vị trí công việc: </span>

                          <p className='font-md'>{infoTeacher?.job_title ? infoTeacher?.job_title : 'Trống'}</p>
                        </div>

                        {/* Phone number */}
                        <div className="flex-1 flex items-start gap-x-2">
                          <span className='font-title'>Ngày tạo tài khoản: </span>

                          {/* <p>{infoTeacher?.rating} sao</p>  */}
                          <p>{formatDate(String(infoTeacher?.created_at))}</p>
                        </div>
                      </div>

                      {/* Socials Media */}
                      <div className="">
                        <span className='font-title'>Mạng xã hội: </span>

                        <div className=" pl-3 flex flex-col space-y-2">
                          {/* FB */}
                          <div className="flex gap-x-2 items-center">
                            <span className="font-desc text-sm min-w-[100px]">Facebook: </span>
                            <p className="font-desc text-sm underline cursor-pointer">
                              {infoTeacher?.facebook ? (
                                <Link to={infoTeacher.facebook}>{infoTeacher.facebook}</Link>
                              ) : (
                                'Chưa có liên kết'
                              )}
                            </p>
                          </div>

                          {/* linkedin */}
                          <div className="flex gap-x-2 items-center">
                            <span className="font-desc text-sm min-w-[100px]">Linkedin: </span>
                            <p className="font-desc text-sm underline cursor-pointer">
                              {infoTeacher?.linkedin ? (
                                <Link to={infoTeacher.linkedin}>{infoTeacher.linkedin}</Link>
                              ) : (
                                'Chưa có liên kết'
                              )}
                            </p>
                          </div>

                          {/* twitter */}
                          <div className="flex gap-x-2 items-center">
                            <span className="font-desc text-sm min-w-[100px]">Twitter: </span>
                            <p className="font-desc text-sm underline cursor-pointer">
                              {infoTeacher?.twitter ? (
                                <Link to={infoTeacher.twitter}>{infoTeacher.twitter}</Link>
                              ) : (
                                'Chưa có liên kết'
                              )}
                            </p>
                          </div>

                          {/* YTB */}
                          <div className="flex gap-x-2 items-center">
                            <span className="font-desc text-sm min-w-[100px]">Youtube: </span>
                            <p className="font-desc text-sm underline cursor-pointer">
                              {infoTeacher?.youtube ? (
                                <Link to={infoTeacher.youtube}>{infoTeacher.youtube}</Link>
                              ) : (
                                'Chưa có liên kết'
                              )}
                            </p>
                          </div>

                        </div>

                      </div>

                      {/* Bio */}
                      <div className="">
                        <span className='font-title'>Giới thiệu: </span>

                        <p className='text-justify'>
                          {infoTeacher?.bio}
                        </p>
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
                    Lịch sử Ví UME
                  </div>
                }
                key="2"
              >
                {/* Nội dung tab 2 */}

                {
                  walletTeacherHistories?.data?.length === 0 ? (

                    <div className='min-h-[70vh] flex flex-col justify-center space-y-3 items-center text-xl'>
                      <h3>Không có dữ liệu!</h3>
                      <p>Có thể tài khoản hiện tại chưa có giao dịch nào hoặc chưa được thiết lập <span className='text-[#F84563]'> Ví UME</span>!</p>
                    </div>

                  ) : (

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
                          <p className='dark:text-[#b9b7c0]'>Trang số <span className='text-[#F84563] font-subtitle'>{walletTeacherHistories?.meta?.current_page}</span> trên tổng số <span className='text-[#F84563] font-subtitle'>{walletTeacherHistories?.meta?.last_page}</span> trang</p>

                          <Pagination
                            pageSize={walletTeacherHistories?.meta?.per_page}
                            total={walletTeacherHistories?.meta?.total}
                            current={walletTeacherHistories?.meta?.current_page}
                            onChange={(page) => setPage(page)}
                          />
                        </div>
                      </div>
                    </div>

                  )
                }

              </Tabs.TabPane>

              {/* Khóa học đã mua */}
              <Tabs.TabPane
                tab={
                  <div className="flex items-center justify-center gap-3">
                    <FileDoneOutlined />
                    Khóa học đã tạo
                  </div>
                }
                key="3"
              >
                {/* Nội dung tab 3 */}
                <div className={`${styles['tabContent']} p-4 md:p-6 dark:text-[#B9B7C0]`}>
                  <div className={`${styles['heading']} dark:border-b-[#5a5a5a] border-b-[#e9ecef] dark:text-[#b9b7c0] text-[#685f78] font-title text-lg md:text-2xl pb-4`}>
                    <h3>Danh sách khóa học đã tạo</h3>
                  </div>

                  {
                    teacherCourses?.data?.length === 0 ? (

                      <div className='min-h-[70vh] flex flex-col justify-center space-y-3 items-center text-xl'>
                        <h3>Không có dữ liệu!</h3>
                        <p>Có thể tài khoản hiện tại chưa khởi tạo khóa học nào!</p>
                      </div>

                    ) : (

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center w-full gap-4 py-4 md:gap-6 md:py-6">
                        {
                          teacherCourses?.data?.map((item: TCourse, index: number) => (
                            <Card {...item} key={index + 1} />
                          ))
                        }
                      </div>
                    )
                  }

                </div>
              </Tabs.TabPane>

              <Tabs.TabPane
                tab={
                  <div className="flex items-center justify-center gap-3">
                    <PercentCircle size={18} />
                    Cập nhật tỷ lệ % hoa hồng
                  </div>
                }
                key="4"
              >
                <div className={`${styles['tabContent']} dark:text-[#B9B7C0] p-4 md:p-6`}>


                  <div className="content">
                    <Form
                      layout='vertical'
                      form={form}
                      onFinish={onFinish}
                      style={{ maxWidth: '100%' }}
                    // className='formSubmit'
                    >
                      <Form.Item
                        name="fee"
                        label={<span className='dark:text-[#b9b7c0] text-[#685f78]'>Tỷ lệ hoa hồng (%)</span>}
                        rules={[
                          { required: true, message: 'Vui lòng nhập tỷ lệ!' },
                          // { type: 'number', message: 'Tỷ lệ chỉ chấp nhận dữ liệu là ký tự số!' },
                          // { min: 1, message: 'Tỷ lệ không được phép dưới 0!' },
                          // { max: 100, message: 'Tỷ lệ không được phép lớn hơn 100!' }
                        ]}
                      >
                        <Input type="number" placeholder="%" className='p-3' />
                      </Form.Item>

                      <Form.Item>
                        <Button
                          loading={loading}
                          htmlType='submit'
                          className='
                        border-none 
                        px-4
                        rounded-md
                      bg-[#F84563] 
                      text-white
                      hover:bg-[#ee9aa8]
                      hover:text-black
                        w-[100%]
                        md:w-auto'
                        >
                          Cập nhật tỷ lệ hoa hồng
                        </Button>
                      </Form.Item>
                    </Form>
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

export default Details_Teacher