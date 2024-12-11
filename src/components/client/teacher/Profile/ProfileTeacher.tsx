import { EditFilled, LoadingOutlined } from '@ant-design/icons'
import { Avatar, Form, Input, message, Tabs } from 'antd'
import { useEffect } from 'react'
import styles from './profileTeacher.module.scss'
import { useUpdateProfileMutation } from '@/redux/slices/teacher/profile/profileTeacherApiSlice'
import { TProfileTeacher } from '@/interfaces/TUser'

const ProfileTeacher = ({ props }: any) => {
  const { avatar, bio, email, fullname, facebook, twitter, youtube, job_title, linkedin } = props || {}
  const [form] = Form.useForm()

  const [updateProfileTeacher, { isLoading }] = useUpdateProfileMutation({})

  useEffect(() => {
    if (props) {
      form.setFieldsValue({
        fullname: fullname,
        avatar: avatar,
        bio: bio,
        job_title: job_title,
        facebook: facebook,
        twitter: twitter,
        youtube: youtube,
        linkedin: linkedin,
        email: email
      })
    }
  }, [props, form])

  const handleUpdateProfile = async (data: TProfileTeacher) => {
    try {
      await updateProfileTeacher(data)
      message.success('Cập nhật hồ sơ cá nhân thành công')
    } catch (error) {
      console.log(error)
      message.error('Đã xảy ra lỗi khi cập nhật hồ sơ cá nhân')
    }
  }

  return (
    <div className='max-w-[1280px] mx-auto px-4 lg:px-6'>
      <div className={`${styles['parent']} rounded-xl dark:text-[#B9B7C0] dark:border-none dark:bg-[#2B2838]`}>
        <div className={` p-4 md:p-6`}>
          <h3 className='font-title text-2xl'>Cài đặt</h3>
          <p className='font-subtitle'>Bạn có toàn quyền quản lý cài đặt tài khoản của riêng mình!</p>
        </div>

        <div className={`${styles['content']} `}>
          <Tabs
            defaultActiveKey='1'
            className='tabsBar'
            items={[
              {
                key: '1',
                label: (
                  <div className='flex items-center justify-center gap-3'>
                    <EditFilled />
                    Chỉnh sửa thông tin
                  </div>
                ),
                children: (
                  <div className={`${styles['tabContent']} dark:text-[#B9B7C0]`}>
                    <div
                      className={`${styles['info']} flex flex-col justify-center items-center space-x-0 p-4 md:p-6 md:flex-row md:justify-start md:space-x-4 border-b-2 dark:border-b-[#5a5a5a]`}
                    >
                      <div className='avt'>
                        <Avatar size={120} src={avatar} className='border-[#F84563]' />
                      </div>
                      <div className={`${styles['subContent']} space-y-4`}>
                        <div>
                          <h2 className='font-title text-xl'>Thông tin cá nhân</h2>
                          <p>Chỉnh sửa thông tin tài khoản</p>
                        </div>
                      </div>
                    </div>
                    <div className={`${styles['form']} flex space-x-4 p-4 md:py-6 `}>
                      <Form
                        form={form}
                        onFinish={handleUpdateProfile}
                        className={`${styles['formContent']} space-y-6 dark:text-[#B9B7C0]`}
                      >
                        <div className='space-y-2'>
                          <label>Tên đầy đủ</label>
                          <Form.Item name='fullname'>
                            <Input className={`px-3 py-3 dark:bg-[#131022]`} disabled />
                          </Form.Item>
                        </div>

                        <div className={`flex flex-col md:flex-row gap-4`}>
                          <div className='w-full space-y-2'>
                            <label>Email</label>
                            <Form.Item name='email' className={`${styles['formGroup']}`}>
                              <Input className={`px-3 py-3 dark:bg-[#131022]`} disabled />
                            </Form.Item>
                          </div>

                          <div className='w-full space-y-2'>
                            <label>Vị trí làm việc</label>
                            <Form.Item name='job_title' className={`${styles['formGroup']}`}>
                              <Input placeholder='Vị trí làm việc' className={`px-3 py-3 dark:bg-[#131022]`} />
                            </Form.Item>
                          </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <div className='space-y-2'>
                            <label>Facebook</label>
                            <Form.Item name='facebook' className={`${styles['formGroup']}`}>
                              <Input className={`px-3 py-3 dark:bg-[#131022]`} />
                            </Form.Item>
                          </div>
                          <div className='space-y-2'>
                            <label>Twitter</label>
                            <Form.Item name='twitter' className={`${styles['formGroup']}`}>
                              <Input className={`px-3 py-3 dark:bg-[#131022]`} />
                            </Form.Item>
                          </div>
                          <div className='space-y-2'>
                            <label>Youtube</label>
                            <Form.Item name='youtube' className={`${styles['formGroup']}`}>
                              <Input className={`px-3 py-3 dark:bg-[#131022]`} />
                            </Form.Item>
                          </div>
                          <div className='space-y-2'>
                            <label>Linkedin</label>
                            <Form.Item name='linkedin' className={`${styles['formGroup']}`}>
                              <Input className={`px-3 py-3 dark:bg-[#131022]`} />
                            </Form.Item>
                          </div>
                        </div>

                        <div className='space-y-2'>
                          <label>Giới thiệu</label>
                          <Form.Item name='bio' className={`${styles['formGroup']} space-y-3`}>
                            <textarea
                              title='bio'
                              rows={6}
                              className={`${styles['formTextarea']} w-full dark:bg-[#2B2838] dark:text-[#B9B7C0] border dark:border-[#5a5a5a]`}
                            />
                          </Form.Item>
                        </div>

                        <div className={`${styles['btnGroup']}`}>
                          <button className='w-full md:w-auto space-x-2'>
                            <span>Cập nhật thông tin</span> {isLoading && <LoadingOutlined />}
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>
                )
              }
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileTeacher
