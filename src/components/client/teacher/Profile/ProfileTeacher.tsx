import { CloudUploadOutlined, DeleteOutlined, EditFilled } from '@ant-design/icons';
import { Avatar, Tabs } from 'antd';
import styles from './profileTeacher.module.scss';

const ProfileTeacher = ({ props }: any) => {
  return (
    <div className="mb-20 max-w-[1280px] mx-auto ">
      <div className={`${styles['parent']} rounded-xl dark:text-[#B9B7C0] dark:border-none dark:bg-[#2B2838]`}>
        <div className={`${styles['heading']} p-4 md:p-6`}>
          <h3 className="font-title text-2xl">Cài đặt</h3>
          <p className="font-subtitle">Bạn có toàn quyền quản lý cài đặt tài khoản của riêng mình!</p>
        </div>

        <div className={`${styles['content']}`}>
          <div className="">
            <Tabs defaultActiveKey="1" className="tabsBar">
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
                  <div
                    className={`${styles['info']} 
                                          flex 
                                          flex-col 
                                          justify-center 
                                          items-center 
                                          space-x-0
                                          p-4
                                          
                                          md:p-6
                                          md:flex-row 
                                          md:justify-start 
                                          md:items-start 
                                          md:space-x-4
                                        `}
                  >
                    <div className="avt">
                      <Avatar size={120} src={props.avatar} className="border-[#F84563]" />
                    </div>

                    <div className={`${styles['subContent']} space-y-4`}>
                      <div className="">
                        <h2 className="font-title text-xl">Ảnh đại diện</h2>
                        <p>Nên chọn ảnh có định dạng PNG, JPG hoặc JPEG và không quá 800px</p>
                      </div>

                      <div className={`${styles['act']} dark:text-[#000] space-x-3`}>
                        <button>
                          <CloudUploadOutlined />
                        </button>

                        <button>
                          <DeleteOutlined />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={`${styles['form']} flex space-x-4 p-4 md:py-6`}>
                    <div className={`${styles['heading']} py-4 md:py-6`}>
                      <h2 className="font-title text-2xl">Thông tin cá nhân</h2>
                      <p>Chỉnh sửa thông tin tài khoản</p>
                    </div>

                    <form className={`${styles['formContent']} space-y-6`}>

                      <div className={`${styles['formGrid']} flex flex-col md:flex-row`}>
                        <div className={`${styles['formGroup']}`}>
                          <label>
                            Tên đầy đủ
                          </label>

                          <input type="text" className={`${styles['formInput']} dark:bg-[#131022]`} value={props.fullname} />
                        </div>

                        <div className={`${styles['formGroup']}`}>
                          <label>
                            Số điện thoại
                          </label>

                          <input type="text" className={`${styles['formInput']} dark:bg-[#131022]`} value={props.phone} />
                        </div>
                      </div>

                      <div className={`${styles['formGrid']} flex flex-col md:flex-row`}>
                        <div className={`${styles['formGroup']}`}>
                          <label>
                            Email
                          </label>

                          <input
                            type="text"
                            className={`${styles['formInput']} dark:bg-[#131022]`}
                            value={props.email}
                          />
                        </div>

                        <div className={`${styles['formGroup']}`}>
                          <label>
                            Vị trí làm việc
                          </label>

                          <input type="text" className={`${styles['formInput']} dark:bg-[#131022]`} value={props.role} />
                        </div>
                      </div>

                      <div className=''>
                        <label className=''>
                          Mạng xã hội
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                          {
                            props?.socials?.map((item: any, index: number) => (
                              <div className={`${styles['formGroup']}`}>
                                <label>
                                  {item.name}
                                </label>

                                <input type="text" className={`${styles['formInput']} dark:bg-[#131022]`} value={item.link} />
                              </div>
                            ))
                          }
                        </div>
                      </div>

                      <div className={`${styles['formGroup']}`}>
                        <label>
                          Giới thiệu
                        </label>

                        <textarea rows={5} className={`${styles['formTextarea']} dark:bg-[#131022]`} value={props.bio} />
                      </div>

                      <div className={`${styles['btnGroup']}`}>

                        <button className="w-full md:w-auto">Cập nhật thông tin</button>
                      </div>
                    </form>
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

export default ProfileTeacher