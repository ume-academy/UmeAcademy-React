import { TChangePass, TRegister } from '@/interfaces/TAuth'
import { TProfile } from '@/interfaces/TUser'
import { useChangePasswordMutation, useEditProfileMutation } from '@/redux/slices/profile/profileApiSlice'
import { CloudUploadOutlined, EditFilled, LoadingOutlined, LockFilled } from '@ant-design/icons'
import { Button, Form, Image, Input, message, Tabs, Upload } from 'antd'
import { useEffect, useState } from 'react'
import styles from './setting.module.scss'
import './SettingAntd.scss'

const Setting = ({ data }: any) => {
  const { avatar, bio, email, fullname, is_teacher } = data || {}
  const [editProfile, { isLoading }] = useEditProfileMutation()
  const [changePassword, { isLoading: loadingPass }] = useChangePasswordMutation()
  const [preview, setPreview] = useState<string>('')
  const [fileList, setFileList] = useState<any[]>([])
  const [form] = Form.useForm()

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        fullname: fullname || '',
        email: email || '',
        avatar: avatar || '',
        bio: bio || ''
      })
    }
  }, [data, form])

  const handleProfile = async (data: TProfile) => {
    try {
      const { fullname, bio, avatar } = data
      const avatarFile = avatar?.fileList?.[0]?.originFileObj

      const formData = new FormData()
      formData.append('fullname', fullname)
      formData.append('bio', bio)
      formData.append('_method', 'PUT')

      if (avatarFile) {
        formData.append('avatar', avatarFile)
      }

      await editProfile({ formData }).unwrap()
      message.success('Cập nhật hồ sơ cá nhân thành công')
    } catch (error) {
      message.error('Đã xảy ra lỗi khi cập nhật hồ sơ cá nhân')
      console.log(error)
    }
  }

  const handlePassword = async (data: TChangePass) => {
    try {
      await changePassword(data).unwrap()
      message.success('Thay đổi mật khẩu thành công!')
    } catch (error) {
      message.error('Mật khẫu cũ không chính xác')
      console.log(error)
    }
  }

  return (
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
                  <Form
                    form={form}
                    layout='vertical'
                    onFinish={handleProfile}
                    className={`${styles['tabContent']} dark:text-[#B9B7C0]`}
                  >
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

                        <Form.Item className={`${styles['act']} dark:text-[#000] space-x-3`} name='avatar'>
                          <Upload
                            className='upload'
                            accept='image/*'
                            fileList={fileList}
                            showUploadList={false}
                            beforeUpload={(file) => {
                              const isValidType = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)
                              if (!isValidType) {
                                message.error('Chỉ chấp nhận định dạng PNG, JPG, JPEG!')
                                return false
                              }

                              const isValidSize = file.size / 1024 / 1024 < 2
                              if (!isValidSize) {
                                message.error('Kích thước ảnh không vượt quá 2MB!')
                                return false
                              }

                              return true
                            }}
                            onChange={(info) => {
                              setFileList(info.fileList)
                              const file = info.file.originFileObj
                              if (file) {
                                const previewURL = URL.createObjectURL(file) // Tạo URL preview từ file
                                setPreview(previewURL) // Cập nhật state preview
                              }
                            }}
                          >
                            <Button>
                              <CloudUploadOutlined />
                            </Button>
                          </Upload>
                        </Form.Item>
                      </div>
                    </div>

                    <div className={`${styles['form']} flex p-4 md:p-6`}>
                      <div className={`${styles['heading']} py-4 md:py-6`}>
                        <h2 className='font-title text-2xl'>Thông tin cá nhân</h2>
                        <p>Chỉnh sửa thông tin tài khoản</p>
                      </div>

                      <div className={`${styles['formContent']} space-y-2`}>
                        <div className={`${styles['formGrid']} flex flex-col md:flex-row`}>
                          <div className={`${styles['formGroup']}`}>
                            <label htmlFor='fullname'>Tên đầy đủ</label>
                            <Form.Item
                              name='fullname'
                              rules={[
                                { required: true, message: 'Tên không được trống.' },
                                { type: 'string', message: 'Tên phải là một chuỗi.' }
                              ]}
                            >
                              <Input type='text' className='p-3' />
                            </Form.Item>
                          </div>
                        </div>

                        <div className={`${styles['formGrid']} flex flex-col md:flex-row`}>
                          <div className={`${styles['formGroup']}`}>
                            <label htmlFor='email'>Email</label>
                            <Form.Item name='email'>
                              <Input type='text' className='p-3' disabled />
                            </Form.Item>
                          </div>

                          <div className={`${styles['formGroup']}`}>
                            <label htmlFor='is_teacher'>Chức vụ</label>
                            <Input
                              type='text'
                              className='p-3'
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
                          <button
                            type='submit'
                            className='w-full md:w-auto hover:bg-white hover:text-[#ff5364] space-x-2'
                          >
                            <span>Cập nhật thông tin</span> {isLoading && <LoadingOutlined />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Form>
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
                  <Form
                    form={form}
                    onFinish={handlePassword}
                    className={` dark:text-[#B9B7C0] p-4 md:p-6 space-y-10 mt-6`}
                  >
                    <div className={` w-full space-y-2`}>
                      <label htmlFor='old_password'>Mật khẩu hiện tại</label>
                      <Form.Item
                        name='old_password'
                        rules={[
                          { required: true, message: 'Vui lòng nhập mật khẩu' },
                          { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
                          { max: 32, message: 'Mật khẩu không được vượt quá 32 ký tự' },
                          {
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: 'Mật khẩu bao gồm a-z, A-Z, 0-9 và phải chứa ít nhất một ký tự đặc biệt.'
                          }
                        ]}
                      >
                        <Input className={`px-3 py-3`} placeholder='Mật khẩu hiện tại' />
                      </Form.Item>
                    </div>

                    <div className={` w-full space-y-2`}>
                      <label htmlFor='new_password'>Mật khẩu mới</label>
                      <Form.Item
                        name='new_password'
                        rules={[
                          { required: true, message: 'Vui lòng nhập mật khẩu' },
                          { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
                          { max: 32, message: 'Mật khẩu không được vượt quá 32 ký tự' },
                          {
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: 'Mật khẩu bao gồm a-z, A-Z, 0-9 và phải chứa ít nhất một ký tự đặc biệt.'
                          }
                        ]}
                      >
                        <Input className={`px-3 py-3`} placeholder='Mật khẩu mới' />
                      </Form.Item>
                    </div>

                    <div>
                      <button
                        type='submit'
                        className=' w-full md:w-auto  border hover:border-[#f1697f] space-x-2 bg-[#f84563] text-white hover:bg-white hover:text-[#f1697f] py-2 px-4 rounded-md'
                      >
                        <span>Thay đổi mật khẩu</span> {loadingPass && <LoadingOutlined />}
                      </button>
                    </div>
                  </Form>
                )
              }
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default Setting
