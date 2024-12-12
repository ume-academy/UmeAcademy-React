import { validatePrice, validateThumbnail, validateVideo } from '@/Validators/course_form_validator'
import Loading from '@/components/client/commonComponents/Loading/Loading'
import { router } from '@/configs/routes'
import { routerConfigAdmin } from '@/constants/admin'
import { routerConfigTeacher } from '@/constants/client'
import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext'
import useLoading from '@/hooks/useLoading'
import { TCategory } from '@/interfaces/TCategory'
import { TCreateCourse, TEditCourse } from '@/interfaces/TCourse'
import { TLevel } from '@/interfaces/TLevel'
import { useGetAllCategoryQuery } from '@/redux/slices/category/categoryApiSlice'
import { useCreateCourseOfTeacherMutation, useUpdateCourseOfteacherMutation } from '@/redux/slices/course/courseApiSlice'
import { useGetAlllevelQuery } from '@/redux/slices/level/levelApiSlice'
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Form, Image, message, TreeSelect } from 'antd'
import Input from 'antd/es/input/Input'
import TextArea from 'antd/es/input/TextArea'
import { TreeNode } from 'antd/es/tree-select'
import Dragger from 'antd/es/upload/Dragger'
import { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import './Form_Course.scss'
import { smoothScrollToTop } from '@/constants/utils'

interface CourseProps  {
  courseData?: any
  isLoading?: any
}

const Form_Course = ({courseData, isLoading}: CourseProps) => {
  const { theme } = useContext(ThemeContext) as ThemeContextType
  const [form] = Form.useForm() //<TCourse>
  const { id } = useParams()
  const [isHovered, setIsHovered] = useState(false);

  // Hàm xử lý sự kiện hover button submit
  const handleMouseEnter = () => {
    setIsHovered(true); // Cập nhật state khi hover vào
  };

  // Hàm xử lý sự kiện hover button submit
  const handleMouseLeave = () => {
    setIsHovered(false); // Cập nhật state khi rời khỏi
  };

  // Sử dụng hook để lấy thông tin vị trí của route hiện tại render component cho phù hợp và call API
  const location = useLocation()
  const hideCourseFunctionAdmin = routerConfigAdmin.hideCourseFunction.some((route) => {
    const regex = new RegExp(`^${route.replace(':id', '[^/]+')}$`)
    return regex.test(location.pathname)
  })

  const hideCourseFunctionTeacher = routerConfigTeacher.hiddenButtonComeBack.some((route) => {
    const regex = new RegExp(`^${route.replace(':id', '[^/]+')}$`)
    return regex.test(location.pathname)
  })

  const {data: levels} = useGetAlllevelQuery({}, {skip: hideCourseFunctionAdmin})
  const {data: catalogues}  = useGetAllCategoryQuery({}, {skip: hideCourseFunctionAdmin})
  const [createCourse] = useCreateCourseOfTeacherMutation()
  const [updateCourse] =  useUpdateCourseOfteacherMutation()


  // set video và ảnh khi upload lên đưa vào preview
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null) 
  const [videoPreview, setVideoPreview] = useState<string | null>(null)



  // Custom lại thẻ select
  const CustomTreeSelect = styled(TreeSelect)`
    // Đổ màu cho thẻ
    .light & .ant-select-selector {
      background-color: #fafafa !important;
      border: 1px solid #c1c9d2 !important;
    }

    .dark & .ant-select-selector {
      background-color: #2b2838 !important;
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
  const { loading, startLoading, stopLoading } = useLoading()

  // // Lấy dữ liệu khóa học theo id để hiển thị lên form
  useEffect(() => {
    if(courseData){
      form.setFieldsValue({
        name: courseData.name,
        category_id: courseData.category.id,
        level_id: courseData.level.id,
        prirce: courseData.price,
        description: courseData.description,
        summary: courseData.summary,
        price: courseData.price,
        thumbnail:courseData.thumbnail ?
            [{
                uid: '-1', // UID tạm thời cho file
                name: 'thumbnail', // Tên file bất kỳ
                status: 'done', // Đánh dấu là hoàn tất upload
                url: courseData.thumbnail, // URL của ảnh từ API
            }] : [],
         video: courseData.video ?
            [{
                uid: '-1', // UID tạm thời cho file
                name: 'video', // Tên file bất kỳ
                status: 'done', // Đánh dấu là hoàn tất upload
                url: courseData.video, // URL của ảnh từ API
            }] : [],
      })
      setVideoPreview(courseData.video)
      setThumbnailPreview(courseData.thumbnail)
    }
  }, [courseData, form])


  const onfinish =async (data: TCreateCourse | TEditCourse ) => {
    try {
      startLoading()
      if(id){
        const {name, category_id, level_id, summary, description, price, video} = data as TEditCourse
        console.log(video)
        const updateData = new FormData()
        updateData.append('id', id.toString())
        updateData.append('category_id', category_id.toString());
        updateData.append('level_id', level_id.toString());
        updateData.append('name', name);
        updateData.append('summary', summary);
        updateData.append('description', description);
        updateData.append('price', price.toString());
        updateData.append('_method', 'PUT');
        if(video?.fileList?.[0].originFileObj){
          updateData.append('video', video?.fileList?.[0].originFileObj);
        }
        const thumbnailFile = data.thumbnail?.fileList?.[0].originFileObj
        if (thumbnailFile ) {
          updateData.append('thumbnail', thumbnailFile );
        }
        await updateCourse({updateData}).unwrap()
        smoothScrollToTop()
        message.success('Cập nhật khóa học thành công')
      }else {
        const {name, category_id, level_id, summary } = data
      
        // Tạo FormData
        const formData = new FormData();
        formData.append('category_id', category_id.toString());
        formData.append('level_id', level_id.toString());
        formData.append('name', name);
        formData.append('summary', summary);
        const thumbnailFile = data.thumbnail?.fileList?.[0].originFileObj
        if (thumbnailFile) {
          formData.append('thumbnail', thumbnailFile);
        }

        // Gửi FormData
        const  result = await createCourse({ formData }).unwrap();
        nav(router.courseManagement.replace(':id', result?.data?.id.toString()))
        message.success('Tạo khóa học thành công');
      }
      stopLoading();

    } catch (error) {
      console.log(error)
      message.error(id ? 'Cập nhật khóa học thất bại' : 'Tạo khóa học thất bại');
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
        {isLoading ? ( <div className="min-h-screen flex justify-center items-center"><Loading /></div>
        ) : (
        <>
        <div className=''>
          <Form form={form} onFinish={onfinish} layout='vertical'>
            <h1 className='text-[28px] font-title text-[#f66962] mb-6'>{textH1}</h1>
            <div className='lg:mb-[40px]'>

              {/* Tên khóa học */}
              <div className='mb-8'>
                <Form.Item
                  name='name'
                  label={<label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Tiêu đề khóa học</label>}
                  rules={[
                    { required: true, message: 'Tên không được trống.' },
                    { type: 'string', message: 'Tên phải là một chuỗi.' }
                  ]}
                >
                  <Input
                    type='text'
                    className='w-full py-[6px] px-[16px] bg-[#fafafa] dark:bg-[#2b2838] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
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
                    { required: true, message: 'Tên không được trống.' }
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
                    {levels &&
                      levels.data.map((level: TLevel) => (
                        <TreeNode key={level.id} value={level.id} title={level.name} />
                      ))}
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
                  ]}
                >
                  <CustomTreeSelect
                    treeDataSimpleMode
                    style={{ width: '100%', height: 44 }}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder='Vui lòng chọn--'
                    showSearch
                    // value={courseData.data?.category_id.id}
                    disabled={hideCourseFunctionAdmin}
                  >
                    {catalogues &&
                      catalogues.data.map((category: TCategory) => (
                        <TreeSelect.TreeNode key={category.id} title={category.name} value={category.id} />
                      ))}
                  </CustomTreeSelect>
                </Form.Item>
              </div>

              {/* Danh mục con phần này lấy theo danh mục cha(danh mục khóa học)*/}
              {id ? (
                <>
                  {/* Giá */}
                  <div className='mb-8'>
                    <Form.Item
                      name='price'
                      label={<label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Giá</label>}
                      rules={[{
                        validator: async (_, value) =>  validatePrice(value)
                      }]}
                    >
                    <Input
                      type='number'
                      className='w-full py-[6px] px-[16px] bg-[#fafafa] dark:bg-[#2b2838] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
                          h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
                          focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
                      placeholder='Giá khóa học'
                      disabled={hideCourseFunctionAdmin}
                      onChange={(e) => {
                        let value = Number(e.target.value);
                        if (value < 0) {
                          form.setFieldsValue({ price: 0 });
                        }
                      }}
                      
                    />
                    </Form.Item>
                  </div>

                  {/* Video giới thiệu */}
                  <div className='mb-8'>
                      <Form.Item
                      name='video'
                      label={<label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Video giới thiệu khóa học</label>}
                      rules={[
                        {
                          validator: async (_, value) => {
                            // Gọi hàm validateFile để kiểm tra file
                            return validateVideo(value?.file || null);
                          },
                        }
                      ]}
                    >
                      <Dragger
                        accept='video/*'
                        name='file'
                        listType='picture'
                        maxCount={1}
                        style={{  padding: 18 }}
                        disabled={hideCourseFunctionAdmin}
                        beforeUpload={() => false}
                        multiple={false}
                        onChange={({ fileList }) => {
                          // Kiểm tra nếu fileList không rỗng
                          if (fileList && fileList.length > 0) {
                            const file = fileList[0];  // Lấy tệp đầu tiên
                            if (file && file.originFileObj) {
                              const previewUrl = URL.createObjectURL(file.originFileObj);
                              setVideoPreview(previewUrl);  // Cập nhật trạng thái videoPreview
                            } else {
                              setVideoPreview(null);  // Nếu không có file, reset preview
                            }
                          } else {
                            setVideoPreview(null);  // Nếu fileList rỗng, reset preview
                          }
                        }}
                        fileList={videoPreview ? [{
                          uid: '-1',
                          name: 'video', // Tên hiển thị
                          status: 'done',
                          url: videoPreview, // Sử dụng URL của ảnh preview
                        }]
                      :  []}
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
                  
                </>
              ) : (
                <></>
              )}

              {/* Ảnh bìa */}
              <div className='mb-8'>
                <Form.Item
                  name='thumbnail'
                  label={<label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Ảnh thu nhỏ khóa học</label>}
                  rules={[
                    {
                      validator: async (_, value) => {
                        // Gọi hàm validateFile để kiểm tra file

                          const isUsingOldThumbnail = !!(id && courseData.thumbnail && !value?.file);
                          return validateThumbnail(value?.file, isUsingOldThumbnail);
                      },
                    }
                  ]}
                >
                  <Dragger
                    accept='image/*'
                    name='file'
                    listType='picture'
                    maxCount={1}
                    style={{ padding: 18 }}
                    disabled={hideCourseFunctionAdmin}
                    beforeUpload={() => false} // Ngừng upload file tự động
                    multiple={false}
                    onChange={({ fileList }) => {
                      const file = fileList[0];
                      if (file && file.originFileObj) {
                        const previewUrl = URL.createObjectURL(file.originFileObj); 
                        setThumbnailPreview(previewUrl); // Cập nhật trạng thái thumbnailPreview với URL mới
                      } else {
                        setThumbnailPreview(null);
                      }
                    }}
                    showUploadList={{showPreviewIcon: false}}
                    fileList={thumbnailPreview ? [{
                      uid: '+1',
                      name: 'image', // Tên hiển thị
                      status: 'done',
                      url: thumbnailPreview, // Sử dụng URL của ảnh preview
                    }]
                  :  []}
                  >
                    <p className='ant-upload-drag-icon'>
                      <UploadOutlined style={{ color: '#f66962' }} />
                    </p>
                    <p className='text-[16px] dark:text-[#b9b7c0] mb-1'>Nhấp hoặc kéo tệp vào khu vực này để tải lên</p>
                    <p className='text-[#00000073] dark:text-[#b9b7c0]'>
                      Hỗ trợ tải lên một tệp JPEG, PNG, GIF, SVG, JPG.
                    </p>
                  </Dragger>
                </Form.Item>
                {id && (
                  <>
                  {/* Hiển thị ảnh nếu có */}
                    {thumbnailPreview && (
                    <div className='mt-4 flex justify-center'>
                      <Image
                        src={thumbnailPreview} // Sử dụng URL ảnh từ fileList hoặc từ courseData
                        alt="Ảnh bìa khóa học"
                        style={{ maxWidth: '100%', maxHeight: 300 }}
                      />
                    </div>
                  )}</>
                )}
              </div>
              
      
              {/* Tóm tắt */}
            <div className='mb-8'>
              <Form.Item
                    name='summary'
                    label={<label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Tóm tắt khóa học</label>}
                    rules={[
                      {required: true, message: 'Tóm tắt không được để trống.'},
                      {type: 'string', message: 'Tóm tắt phải là một chuỗi.'},
                      {max: 255, message: 'Tóm tắt không được vượt quá 255 ký tự.'}
                    ]}
                  >
                  <Input
                    className='w-full py-[6px] px-[16px] bg-[#fafafa] dark:bg-[#2b2838] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
                    h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
                    focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
                    placeholder='Tóm tắt khóa học'
                    disabled={hideCourseFunctionAdmin}
                  />
                </Form.Item>
              </div>

              {/* Mô tả */}
              {id ? (
                <div className='mb-8'>
               <Form.Item
                    name='description'
                    label={<label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Mô tả khóa học</label>}
                  >
                  <TextArea
                    style={{ height: 160}}
                    className='p-[16px]  w-full bg-[#fafafa] border-[#c1c9d2] dark:bg-[#2b2838] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0] block
                  h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
                  focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa] focus:outline-none font-desc text-[14px] rounded-lg leading-[1.5]'
                    placeholder='Mô tả khóa học'
                    disabled={hideCourseFunctionAdmin}
                  />
              </Form.Item>
              <Form.Item
                name='_method'
                initialValue={'PUT'}
              >
                <Input
                  hidden
                  type='text'
                  disabled={hideCourseFunctionAdmin}
                />
              </Form.Item>
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
                      to={`${router.revenue}`}
                      className='w-full md:w-[180px] lg:w-[180px] mb-5  md:mb-0 lg:mb-0 flex justify-center border-[1px] font-title border-[#685f78] text-[#fff] bg-[#685f78] p-2.5 rounded-lg hover:bg-transparent hover:text-[#685f78]'
                    >
                      Quay lại
                    </Link>
                  )}
                  <Button
                    htmlType='submit'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    disabled={loading}
                    style={{border: '2px solid #ff5364', color: `${isHovered === false ? '#fff' : '#ff5364'}` }}
                    className='w-full md:w-[180px] lg:w-[180px] font-title bg-[#ff5364] text-[#fff] p-5 rounded-lg hover:bg-transparent'
                  >
                    {loading ? <LoadingOutlined /> : id ? 'Lưu' : 'Thêm mới khóa học'}
                  </Button>
                </div>
              </>
            ) : (
              <></>
            )
            }
          </Form>
        </div>
        </>
       )} 
      </div>
    </div>
  )
}

export default Form_Course
