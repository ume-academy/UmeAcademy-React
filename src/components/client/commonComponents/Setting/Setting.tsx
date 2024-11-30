import { useEditProfileMutation } from '@/redux/slices/profile/profileApiSlice'
import { CloudUploadOutlined, EditFilled, LockFilled } from '@ant-design/icons'
import { Avatar, Button, Form, Image, message, Tabs, Upload } from 'antd'
import styles from './setting.module.scss'
import './SettingAntd.scss'
import { useEffect, useState } from 'react'
import { TUser } from '@/interfaces/TUser'

const Setting = ({ data }: any) => {
  const { avatar, bio, email, fullname, is_teacher } = data || {}
  const [editProfile] = useEditProfileMutation()
  const [preview, setPreview] = useState<string>(avatar || '')
  const [isAvatar, setIsAvatar] = useState<File | null>(null)
  const [form] = Form.useForm()

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        fullname: fullname || '',
        email: email || '',
        bio: bio || ''
      })
    }
  }, [data, form])

  const handleUpload = ({ file }: any) => {
    const fileObj = file.originFileObj || file
    console.log('Tệp đang tải lên:', fileObj)
    console.log('Tên tệp:', fileObj.name)

    const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg']
    if (fileObj) {
      if (ACCEPTED_FILE_TYPES.includes(fileObj.type)) {
        setIsAvatar(fileObj)
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreview(e.target?.result as string)
        }
        reader.readAsDataURL(fileObj)
      }
    }
  }
  const handleProfile = async (data: TUser) => {
    try {
      // const formData = new FormData()
      // formData.append('fullname', data.fullname)
      // formData.append('bio', data.bio)
      // formData.append('avatar', isAvatar as Blob)

      const res = await editProfile({ fullname: data.fullname, bio: data.bio }).unwrap()
      console.log(res)
      message.success('Cập nhật hồ sơ cá nhân thành công')
    } catch (error) {
      console.error(error)
      message.error('Cập nhật hồ sơ cá nhân không thành công')
    }
  }

  return (
    <>
      <div className='mb-20 max-w-[1280px] mx-auto p-4 lg:p-6'>
        <div className={`${styles['parent']} rounded-xl dark:text-[#B9B7C0] dark:border-none dark:bg-[#2B2838]`}>
          <div className={`${styles['heading']} p-4 md:p-6`}>
            <h3 className='font-title text-2xl'>Cài đặt</h3>
            <p className='font-subtitle'>Bạn có toàn quyền quản lý cài đặt tài khoản của riêng mình!</p>
          </div>

          <div className={`${styles['content']}`}>
            <Tabs
              defaultActiveKey='1'
              className='tabsBar'
              items={[
                {
                  key: '1',
                  label: (
                    <div className='flex items-center justify-center gap-3'>
                      <EditFilled />
                      Chỉnh sửa hồ sơ
                    </div>
                  ),
                  children: (
                    <div className={`${styles['tabContent']} dark:text-[#B9B7C0]`}>
                      <div
                        className={`${styles['info']} flex flex-col justify-center items-center space-x-0 p-4 md:p-6 md:flex-row md:justify-start md:items-start md:space-x-4`}
                      >
                        <div className='avt'>
                          <Image
                            width={120}
                            height={120}
                            src={preview || avatar}
                            className='border-[#F84563] rounded-full object-cover'
                          />
                        </div>

                        <div className={`${styles['subContent']} space-y-4`}>
                          <div>
                            <h2 className='font-title text-xl'>Ảnh đại diện</h2>
                            <p>Nên chọn ảnh có định dạng PNG, JPG hoặc JPEG và không quá 800px</p>
                          </div>

                          <div className={`${styles['act']} dark:text-[#000] space-x-3`}>
                            <Upload className='upload' accept='image/*' showUploadList={false} onChange={handleUpload}>
                              <Button>
                                <CloudUploadOutlined />
                              </Button>
                            </Upload>
                          </div>
                        </div>
                      </div>

                      <div className={`${styles['form']} flex space-x-4 p-4 md:py-6`}>
                        <div className={`${styles['heading']} py-4 md:py-6`}>
                          <h2 className='font-title text-2xl'>Thông tin cá nhân</h2>
                          <p>Chỉnh sửa thông tin tài khoản</p>
                        </div>

                        <Form
                          form={form}
                          onFinish={handleProfile}
                          className={`${styles['formContent']} space-y-6`}
                          initialValues={{
                            fullname: fullname || '',
                            email: email || '',
                            bio: bio || ''
                          }}
                        >
                          <div className={`${styles['formGrid']} flex flex-col md:flex-row`}>
                            <div className={`${styles['formGroup']}`}>
                              <label htmlFor='fullname'>Tên đầy đủ</label>
                              <Form.Item
                                name='fullname'
                                rules={[{ required: true, message: 'Vui lòng nhập tên đầy đủ!' }]}
                              >
                                <input
                                  type='text'
                                  id='fullname'
                                  className={`${styles['formInput']} w-full dark:bg-[#131022]`}
                                />
                              </Form.Item>
                            </div>
                          </div>

                          <div className={`${styles['formGrid']} flex flex-col md:flex-row`}>
                            <div className={`${styles['formGroup']}`}>
                              <label htmlFor='email'>Email</label>
                              <Form.Item name='email'>
                                <input
                                  id='email'
                                  type='text'
                                  className={`${styles['formInput']} w-full dark:bg-[#131022]`}
                                  disabled
                                />
                              </Form.Item>
                            </div>

                            <div className={`${styles['formGroup']}`}>
                              <label htmlFor='is_teacher'>Chức vụ</label>
                              <input
                                id='is_teacher'
                                type='text'
                                className={`${styles['formInput']} w-full dark:bg-[#131022]`}
                                value={is_teacher ? 'Giảng viên' : 'Học viên'}
                                disabled
                              />
                            </div>
                          </div>

                          <div className={`${styles['formGroup']}`}>
                            <label htmlFor='bio'>Giới thiệu</label>
                            <Form.Item name='bio'>
                              <textarea
                                id='bio'
                                rows={5}
                                className={`${styles['formTextarea']} w-full dark:bg-[#131022]`}
                              />
                            </Form.Item>
                          </div>

                          <div className={`${styles['btnGroup']}`}>
                            <button type='submit' className='w-full md:w-auto'>
                              Cập nhật thông tin
                            </button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  )
                },
                {
                  key: '2',
                  label: (
                    <div className='flex items-center justify-center gap-3'>
                      <LockFilled />
                      Thay đổi mật khẩu
                    </div>
                  ),
                  children: (
                    <div className={`${styles['tabContent']} p-4 md:p-6 dark:text-[#B9B7C0]`}>
                      <div className={`${styles['form']} flex space-x-4 p-0 md:p-6`}>
                        <Form className={`${styles['formContent']} space-y-6`}>
                          <div className={`${styles['formGroup']}  w-full`}>
                            <label htmlFor='password'>Mật khẩu hiện tại</label>

                            <Form.Item
                              name='password'
                              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
                            >
                              <input
                                id='password'
                                type='password'
                                className={`${styles['formInput']} dark:bg-[#131022]`}
                              />
                            </Form.Item>
                          </div>

                          <div className={`${styles['formGroup']} w-full`}>
                            <label htmlFor='new_password'>Mật khẩu mới</label>

                            <Form.Item
                              name='new_password'
                              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
                            >
                              <input
                                id='new_password'
                                type='password'
                                className={`${styles['formInput']} dark:bg-[#131022]`}
                              />
                            </Form.Item>
                          </div>

                          <div className={`${styles['formGroup']}  w-full`}>
                            <label htmlFor='confirm_new_password'>Nhập lại mật khẩu mới</label>

                            <Form.Item
                              name='confirm_new_password'
                              rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu mới!' }]}
                            >
                              <input
                                id='confirm_new_password'
                                type='password'
                                className={`${styles['formInput']} dark:bg-[#131022]`}
                              />
                            </Form.Item>
                          </div>

                          <div className={`${styles['btnGroup']}`}>
                            <button type='submit' className='w-full md:w-auto'>
                              Cập nhật mật khẩu
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
    </>
  )
}

export default Setting
