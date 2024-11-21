import { CloudUploadOutlined, DeleteOutlined, EditFilled, LockFilled } from '@ant-design/icons'
import { Avatar, Tabs } from 'antd'
import styles from './setting.module.scss'
import './SettingAntd.scss'
const Setting = ({ data }: any) => {
  const { avatar, bio, email, fullname, is_lock } = data || {}
  return (
    <>
      <div className='mb-20 max-w-[1280px] mx-auto p-4 lg:p-6'>
        <div className={`${styles['parent']} rounded-xl dark:text-[#B9B7C0] dark:border-none dark:bg-[#2B2838]`}>
          <div className={`${styles['heading']} p-4 md:p-6`}>
            <h3 className='font-title text-2xl'>Cài đặt</h3>
            <p className='font-subtitle'>Bạn có toàn quyền quản lý cài đặt tài khoản của riêng mình!</p>
          </div>

          <div className={`${styles['content']}`}>
            <div className=''>
              <Tabs defaultActiveKey='1' className='tabsBar'>
                <Tabs.TabPane
                  tab={
                    <div className='flex items-center justify-center gap-3'>
                      <EditFilled />
                      Chỉnh sửa thông tin
                    </div>
                  }
                  key='1'
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
                      <div className='avt'>
                        <Avatar size={120} src={avatar} className='border-[#F84563]' />
                      </div>

                      <div className={`${styles['subContent']} space-y-4`}>
                        <div className=''>
                          <h2 className='font-title text-xl'>Ảnh đại diện</h2>
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
                        <h2 className='font-title text-2xl'>Thông tin cá nhân</h2>
                        <p>Chỉnh sửa thông tin tài khoản</p>
                      </div>

                      <form className={`${styles['formContent']} space-y-6`}>
                        <div className={`${styles['formGrid']} flex flex-col md:flex-row`}>
                          <div className={`${styles['formGroup']}`}>
                            <label htmlFor='fullname'>Tên đầy đủ</label>

                            <input
                              type='text'
                              id='fullname'
                              className={`${styles['formInput']} dark:bg-[#131022]`}
                              value={fullname}
                            />
                          </div>

                          {/* <div className={`${styles['formGroup']}`}>
                            <label>
                              Số điện thoại
                            </label>

                            <input type="text" className={`${styles['formInput']} dark:bg-[#131022]`} value={phone}/>
                          </div> */}
                        </div>

                        <div className={`${styles['formGrid']} flex flex-col md:flex-row`}>
                          <div className={`${styles['formGroup']}`}>
                            <label htmlFor='email'>Email</label>

                            <input
                              id='email'
                              type='text'
                              className={`${styles['formInput']} dark:bg-[#131022]`}
                              value={email}
                            />
                          </div>

                          <div className={`${styles['formGroup']}`}>
                            <label htmlFor='is_lock'>Chức vụ</label>

                            <input
                              id='is_lock'
                              type='text'
                              className={`${styles['formInput']} dark:bg-[#131022]`}
                              value={is_lock === 0 ? 'Giảng viên' : 'Học viên'}
                            />
                          </div>
                        </div>

                        <div className={`${styles['formGroup']}`}>
                          <label htmlFor='bio'>Giới thiệu</label>

                          <textarea
                            id='bio'
                            rows={5}
                            className={`${styles['formTextarea']} dark:bg-[#131022]`}
                            value={bio}
                          />
                        </div>

                        <div className={`${styles['btnGroup']}`}>
                          <button className='w-full md:w-auto'>Cập nhật thông tin</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Tabs.TabPane>

                <Tabs.TabPane
                  tab={
                    <div className='flex items-center justify-center gap-3'>
                      <LockFilled />
                      Thay đổi mật khẩu
                    </div>
                  }
                  key='2'
                >
                  {/* Nội dung tab 2 */}
                  <div className={`${styles['tabContent']} p-4 md:p-6 dark:text-[#B9B7C0]`}>
                    <div className={`${styles['form']} flex space-x-4 p-0 md:p-6`}>
                      <form className={`${styles['formContent']} space-y-6`}>
                        <div className={`${styles['formGroup']}  w-full md:w-[50%]`}>
                          <label htmlFor='password'>Mật khẩu hiện tại</label>

                          <input id='password' type='password' className={`${styles['formInput']} dark:bg-[#131022]`} />
                        </div>

                        <div className={`${styles['formGroup']} w-full md:w-[50%]`}>
                          <label htmlFor='new_password'>Mật khẩu mới</label>

                          <input
                            id='new_password'
                            type='password'
                            className={`${styles['formInput']} dark:bg-[#131022]`}
                          />
                        </div>

                        <div className={`${styles['formGroup']}  w-full md:w-[50%]`}>
                          <label htmlFor='new_password'>Nhâp lại mật khẩu mới</label>

                          <input
                            id='new_password'
                            type='password'
                            className={`${styles['formInput']} dark:bg-[#131022]`}
                          />
                        </div>

                        <div className={`${styles['btnGroup']}`}>
                          <button className='my-4 w-full md:w-[20%]'>Cập nhật mật khẩu</button>
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
    </>
  )
}

export default Setting
