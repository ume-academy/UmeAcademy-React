import { router } from '@/configs/routes'
import { routerConfigAdmin } from '@/constants/admin'
import { routerConfigTeacher } from '@/constants/client'
import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext'
import useLoading from '@/hooks/useLoading'
import { TCategory } from '@/interfaces/TCategory'
import { TCreateCourse } from '@/interfaces/TCourse'
import { TLevel } from '@/interfaces/TLevel'
import { useGetAllCategoryQuery } from '@/redux/slices/category/categoryApiSlice'
import { useCreateCourseOfTeacherMutation } from '@/redux/slices/course/courseApiSlice'
import { useGetAlllevelQuery } from '@/redux/slices/level/levelApiSlice'
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import { Form, GetProp, message, TreeSelect, UploadProps } from 'antd'
import Input from 'antd/es/input/Input'
import TextArea from 'antd/es/input/TextArea'
import { TreeNode } from 'antd/es/tree-select'
import Dragger from 'antd/es/upload/Dragger'
import { useContext } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import './Form_Course.scss'

const Form_Course = () => {
  const { theme } = useContext(ThemeContext) as ThemeContextType
  const { id } = useParams()
  const [form] = Form.useForm() //<TCourse>
  const {data: levels} = useGetAlllevelQuery({})
  const {data: catalogues}  = useGetAllCategoryQuery({})
  const [createCourse] = useCreateCourseOfTeacherMutation()

  // Sử dụng hook để thông tin vị trí của route hiện tại render component cho phù hợp
  const location = useLocation()
  const hideCourseFunctionAdmin = routerConfigAdmin.hideCourseFunction.some((route) => {
    const regex = new RegExp(`^${route.replace(':id', '[^/]+')}$`)
    return regex.test(location.pathname)
  })

  const hideCourseFunctionTeacher = routerConfigTeacher.hiddenButtonComeBack.some((route) => {
    const regex = new RegExp(`^${route.replace(':id', '[^/]+')}$`)
    return regex.test(location.pathname)
  })

  // Custom lại thẻ select
  const CustomTreeSelect = styled(TreeSelect)`
    // Đổ màu cho thẻ
    .light & .ant-select-selector {
      background-color: #fafafa !important;
      border: 1px solid #c1c9d2 !important;
    }

    .dark & .ant-select-selector {
      background-color: #131022 !important;
      border: 1px solid #c7c7c740 !important;
    }

    // Đổ màu cho placeholder
    .ant-select-selector .ant-select-selection-placeholder {
      color: #6e82a3 !important; /* Màu placeholder chế độ sáng*/
    }

    .dark & .ant-select-selector .ant-select-selection-placeholder {
      color: #b9b7c0 !important; /* Màu placeholder trong chế độ tối */
    }import { dataCarousel } from './../../../../constants/auth';
import { useCreateCourseOfTeacherMutation } from '@/redux/slices/course/courseApiSlice';

  `

  // state loading khi click nút
  const nav = useNavigate()
  const {loading, startLoading, stopLoading} = useLoading()

  type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
  
  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

  const validateFile = async (file: FileType) => {
    if(!file) return Promise.reject('Vui lòng chọn file');

    const isFileize = file.size / 1024 / 1024 < 2;
    if(!isFileize) return Promise.reject('File phải nhỏ hơn 2MB');

    const isFileFormat = file.type === 'image/jpeg'
                      || file.type === 'image/png'
                      || file.type === 'image/jpg'
                      || file.type === 'image/gif'
                      || file.type === 'image/svg'
      
    if(!isFileFormat) return Promise.reject('File không đúng định dạng');

    return Promise.resolve();
  }

  const onfinish =async (data: TCreateCourse) => {
    try {
      startLoading()
      const {name, category_id, level_id, summary } = data
      const thumbnailFile = data.thumbnail?.fileList?.[0].originFileObj
      
      console.log(thumbnailFile)
      

        // Tạo FormData
        const formData = new FormData();
        formData.append('category_id', category_id.toString());
        formData.append('level_id', level_id.toString());
        formData.append('name', name);
        formData.append('summary', summary);
        
        if (thumbnailFile) {
          formData.append('thumbnail', thumbnailFile);
        }

        // Gửi FormData
        await createCourse({ formData }).unwrap();
        message.success('Tạo khóa học thành công');
        nav(router.myCourses)
        stopLoading();

    } catch (error) {
      console.log(error)
      stopLoading()

    }
  }

  

  // Điều kiện rending text cho thẻ title H1
  const textH1 =
    id && !hideCourseFunctionAdmin
      ? 'Cập nhật khóa học'
      : hideCourseFunctionAdmin
        ? 'Tổng quan khóa học'
        : 'Thêm mới khóa học'

  return (
    <div className='px-[16px]'>
      <div
        className={`bg-[#fff] ${id ? 'shadow-[0_2px_4px_rgba(0,0,0,0.08),_0_4px_12px_rgba(0,0,0,0.16)]' : ''} p-[16px] lg:p-14 rounded-lg dark:bg-[#2b2838]`}
      >
        <div className=''>
          <Form form={form} onFinish={onfinish} layout='vertical'>
            <h1 className='text-[28px] font-title text-[#f66962] mb-6'>{textH1}</h1>
            <div className="lg:mb-[40px]">
              {/* Tên khóa học */}
              <div className='mb-8'>
                <Form.Item
                  name='name'
                  label={<label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Tiêu đề khóa học</label>}
                  rules={[
                    { required: true, message: 'Tên không được trống.' },
                    { type: 'string', message: 'Tên phải là một chuỗi.' },
                  ]}
                >
                <Input
                  style={{backgroundColor: `${theme === 'light' ? '#fafafa' : '#131022'}`, border: `#c1c9d2`}}
                  type='text'
                  className='py-[6px] px-[16px] bg-[#fafafa] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
                  h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
                  focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
                  placeholder='Tiêu đề khóa học'
                  disabled={hideCourseFunctionAdmin}
                />
                </Form.Item>
              </div>

              {/* Trình độ */}
              <div className='mb-8'>
                <Form.Item
                  name='level_id'
                  label={<label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Trình độ khóa học</label>}
                  rules={[
                    {required: true, message: 'Tên không được trống.'},
                    // {validator: validateO},
                  ]}
                >
                  <CustomTreeSelect
                    treeDataSimpleMode
                    style={{ width: '100%', height: 44 }}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder='Vui lòng chọn'
                    showSearch
                    disabled={hideCourseFunctionAdmin}
                  >
                    {levels && levels.data.map((level: TLevel) => <TreeNode key={level.id} value={level.id} title={level.name} />)}
                  </CustomTreeSelect>
                </Form.Item>

              </div>

              {/* Danh mục */}
              <div className='mb-8'>
                <Form.Item
                  name='category_id'
                  label={<label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Danh mục khóa học</label>}
                  rules={[
                    { required: true, message: 'Danh mục không được trống.' },
                    // { validator: validateO },
                  ]}
                >
                  <CustomTreeSelect
                    treeDataSimpleMode
                    style={{ width: '100%', height: 44 }}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder='Vui lòng chọn--'
                    showSearch
                    disabled={hideCourseFunctionAdmin}
                  >
                    {catalogues && catalogues.data.map((category: TCategory) => <TreeSelect.TreeNode key={category.id} title={category.name} value={category.id} />)}
                  </CustomTreeSelect>
                </Form.Item>
              </div>

              {/* Danh mục con phần này lấy theo danh mục cha(danh mục khóa học)*/}
              {id ? (
                <>
                  {/* Danh mục con */}
                  <div className='mb-8'>
                    <label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Danh mục con</label>
                    <CustomTreeSelect
                      treeDataSimpleMode
                      style={{ width: '100%', height: 44 }}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder='Vui lòng chọn--'
                      showSearch
                      disabled={hideCourseFunctionAdmin}
                    >
                      <TreeNode value='jav' title='Jav' />
                      <TreeNode value='forn' title='Forn Hub' />
                    </CustomTreeSelect>
                  </div>

                  {/* Video giới thiệu */}
                  <div className='mb-8'>
                    <label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Video giới thiệu</label>
                    <Dragger
                      name='file'
                      action={``}
                      listType='picture'
                      maxCount={1}
                      style={{ marginTop: 12, padding: 18 }}
                      disabled={hideCourseFunctionAdmin}
                      onChange={async (info) => {
                        // Kiểm tra trạng thái của file khi thay đổi
                        if (info.file.status === 'done') {
                          const file = info.file.originFileObj;
                          if (file) {
                            try {
                              // Kiểm tra file nếu có originFileObj
                              await validateFile(file); // Kiểm tra file khi tải lên
                            } catch (error) {
                              console.log(error); // Xử lý lỗi nếu file không hợp lệ
                            }
                          } else {
                            console.log('File không hợp lệ');
                          }
                        }}}
                    >
                      <p className='ant-upload-drag-icon'>
                        <UploadOutlined style={{ color: '#f66962' }} />
                      </p>
                      <p className='text-[16px] dark:text-[#b9b7c0] mb-1'>Nhấp hoặc kéo tệp vào khu vực này để tải lên</p>
                      <p className='text-[#00000073] dark:text-[#b9b7c0]'>
                        Hỗ trợ tải lên một tệp. Nghiêm cấm tải lên dữ liệu công ty hoặc các tệp bị cấm khác.
                      </p>
                    </Dragger>
                  </div>
                </>
              ) : (
                <></>
              )}

              {/* Ảnh bìa */}
              <div className='mb-8'>
                <Form.Item
                  name='thumbnail'
                  label={<label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Ảnh bìa khóa học</label>}
                  rules={[
                    {
                      validator: async (_, value) => {
                        // Gọi hàm validateFile để kiểm tra file
                        return validateFile(value?.file || null);
                      },
                    }
                  ]}
                >
                  <Dragger
                    name='file'
                    listType='picture'
                    maxCount={1}
                    style={{  padding: 18 }}
                    disabled={hideCourseFunctionAdmin}
                    beforeUpload={() => false}
                    multiple={false}
                  >
                    <p className='ant-upload-drag-icon'>
                      <UploadOutlined style={{ color: '#f66962' }} />
                    </p>
                    <p className='text-[16px] dark:text-[#b9b7c0] mb-1'>Nhấp hoặc kéo tệp vào khu vực này để tải lên</p>
                    <p className='text-[#00000073] dark:text-[#b9b7c0]'>
                      Hỗ trợ tải lên một tệp. Nghiêm cấm tải lên dữ liệu công ty hoặc các tệp bị cấm khác.
                    </p>
                  </Dragger>
                </Form.Item>
              </div>

              {/* Tóm tắt */}
            <div className='mb-8'>
              <Form.Item
                    name='summary'
                    label={<label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Mô tả khóa học</label>}
                    rules={[
                      {required: true, message: 'Tóm tắt không được để trống.'},
                      {type: 'string', message: 'Tóm tắt phải là một chuỗi.'},
                      {max: 255, message: 'Tóm tắt không được vượt quá 255 ký tự.'}
                    ]}
                  >
                  
                  <TextArea
                    style={{ height: 160 , backgroundColor: `${theme === 'light' ? '#fafafa' : '#131022'}`, border: `#c1c9d2`}}
                    className='p-[16px]  w-full bg-[#fafafa] border-[#c1c9d2] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0] block
                  h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
                  focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa] focus:outline-none font-desc text-[14px] rounded-lg leading-[1.5]'
                    placeholder='Mô tả'
                    disabled={hideCourseFunctionAdmin}
                  />
              </Form.Item>
            </div>
              

              {/* Mô tả */}
              {id ? (
                <div className='mb-8'>
                <label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Tóm tắt khóa học</label>
                <TextArea
                  style={{ height: 160 }}
                  className='p-[16px]  w-full bg-[#fafafa] border-[#c1c9d2] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0] block
                h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
                focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa] focus:outline-none font-desc text-[14px] rounded-lg leading-[1.5]'
                  placeholder='Mô tả'
                  disabled={hideCourseFunctionAdmin}
                />
                
                </div>
              ) : (
                <></>
              )}
          </div>
            {!hideCourseFunctionAdmin ? (
              <>
                {/* Nút */}
                <div
                  className={`flex flex-col md:flex-row md:justify-between lg:flex-row ${hideCourseFunctionTeacher ? 'lg:justify-end' : 'lg:justify-between'}`}
                >
                  {!hideCourseFunctionTeacher && (
                    <Link
                      to={`${router.home}`}
                      className='w-full md:w-[180px] lg:w-[180px] mb-5  md:mb-0 lg:mb-0 flex justify-center border-[1px] font-title border-[#685f78] text-[#fff] bg-[#685f78] p-2.5 rounded-lg hover:bg-transparent hover:text-[#685f78]'
                    >
                      Quay lại
                    </Link>
                  )}
                  <button
                    
                    className='w-full md:w-[180px] lg:w-[180px] border-[1px] font-title border-[#ff5364] bg-[#ff5364] text-[#fff] p-2.5 rounded-lg hover:bg-transparent hover:text-[#ff5364]'
                  >
                    {loading ? <LoadingOutlined /> : id ? 'Lưu' : 'Thêm mới khóa học'}
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Form_Course
