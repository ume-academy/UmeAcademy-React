import Card, { CardProps } from '@/components/client/commonComponents/Card/Card';
import { getTitleTab } from '@/contants/client';
import { EditFilled, FileDoneOutlined, HistoryOutlined } from '@ant-design/icons';
import { Avatar, Tabs } from 'antd';
import { Helmet } from 'react-helmet';
import styles from './detailsUser.module.scss';
import './detailsUserAntd.scss';
import List_Transactions_Instructor from '../../Transactions/List_Transactions/List_Transactions_Instructor';

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
            <Tabs defaultActiveKey="1">
              {/* Thông tin tài khoản */}
              <Tabs.TabPane
                tab={
                  <div className="flex items-center justify-center gap-3 hover:text-[#F84563]">
                    <EditFilled />
                    Chỉnh sửa thông tin
                  </div>
                }
                key="1"
              >
                {/* Nội dung tab 1 */}
                <div className={`${styles['tabContent']} dark:text-[#B9B7C0] `}>
                  <div className={`${styles['info']} flex items-center space-x-4 p-6`}>
                    <div className="avt">
                      <Avatar size={120} src={''} className="border-[#F84563]" />
                    </div>

                    <div className={`${styles['subContent']} space-y-4`}>
                      <div className="">
                        <h2 className="font-title text-xl">Ảnh đại diện</h2>
                      </div>

                      {/* <div className={`${styles['act']} dark:text-[#000]  space-x-3`}>
                        <button>
                          <CloudUploadOutlined />
                        </button>

                        <button>
                          <DeleteOutlined />
                        </button>
                      </div> */}
                    </div>
                  </div>

                  <div className={`${styles['form']} flex space-x-4 p-6`}>
                    <div className={`${styles['heading']} pb-6`}>
                      <h2 className="font-title text-2xl">Thông tin cá nhân</h2>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex">
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

                      <div className="flex">
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
                  <div className="flex items-center justify-center gap-3 hover:text-[#F84563]">
                    <HistoryOutlined />
                    Lịch sử giao dịch
                  </div>
                }
                key="2"
              >
                {/* Nội dung tab 2 */}
                <div className={`${styles['tabContent']} p-6 dark:text-[#B9B7C0]`}>
                  {/* <div className={`${styles['form']} flex space-x-4 p-6`}>

                    <form className={`${styles['formContent']} space-y-6`}>
                      <div className={`${styles['formGroup']} w-[50%]`}>
                        <label>
                          Mật khẩu hiện tại
                        </label>

                        <input type="password" className={`${styles['formInput']} dark:bg-[#131022]`} />
                      </div>

                      <div className={`${styles['formGroup']} w-[50%]`}>
                        <label>
                          Mật khẩu mới
                        </label>

                        <input type="password" className={`${styles['formInput']} dark:bg-[#131022]`} />
                      </div>

                      <div className={`${styles['formGroup']} w-[50%]`}>
                        <label>
                          Nhâp lại mật khẩu mới
                        </label>

                        <input type="password" className={`${styles['formInput']} dark:bg-[#131022]`} />
                      </div>

                      <div className={`${styles['btnGroup']}`}>

                        <button>Cập nhật mật khẩu</button>
                      </div>
                    </form>
                  </div> */}

                  <List_Transactions_Instructor />
                </div>
              </Tabs.TabPane>

              {/* Khóa học đã mua */}
              <Tabs.TabPane
                tab={
                  <div className="flex items-center justify-center gap-3 hover:text-[#F84563]">
                    <FileDoneOutlined />
                    Khóa học đã mua
                  </div>
                }
                key="3"
              >
                {/* Nội dung tab 2 */}
                <div className={`${styles['tabContent']} p-6 dark:text-[#B9B7C0]`}>
                  {/* <div className={`${styles['form']} flex space-x-4 p-6`}>

                    <form className={`${styles['formContent']} space-y-6`}>
                      <div className={`${styles['formGroup']} w-[50%]`}>
                        <label>
                          Mật khẩu hiện tại
                        </label>

                        <input type="password" className={`${styles['formInput']} dark:bg-[#131022]`} />
                      </div>

                      <div className={`${styles['formGroup']} w-[50%]`}>
                        <label>
                          Mật khẩu mới
                        </label>

                        <input type="password" className={`${styles['formInput']} dark:bg-[#131022]`} />
                      </div>

                      <div className={`${styles['formGroup']} w-[50%]`}>
                        <label>
                          Nhâp lại mật khẩu mới
                        </label>

                        <input type="password" className={`${styles['formInput']} dark:bg-[#131022]`} />
                      </div>

                      <div className={`${styles['btnGroup']}`}>

                        <button>Cập nhật mật khẩu</button>
                      </div>
                    </form>
                  </div> */}

                  <div className="heading">
                    <h5 className="font-title text-xl">Danh sách khóa học đã mua</h5>
                  </div>

                  <div className="grid grid-cols-3 justify-between gap-6 py-6">
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