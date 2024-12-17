// ChapterList.tsx
import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext'
import useLoading from '@/hooks/useLoading'
import { CustomUploadFile, TChapter, TFormLesson, TLesson, TResource } from '@/interfaces/TLesson'
import {
  useCreateLessonMutation,
  useRemoveLessonMutation,
  useRemoveResourceLessonMutation,
  useRemoveVideoLessonMutation,
  useUpdateLessonMutation,
  useUpdatePreviewVideoMutation
} from '@/redux/slices/lesson/lessonApiSlice'
import { validateResourceFile, validateVideoFile } from '@/Validators/upload_lesson_validator'
import { DeleteFilled, EditFilled, LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import {
  Button,
  Collapse,
  CollapseProps,
  Form,
  Input,
  InputRef,
  message,
  Modal,
  Space,
  Switch,
  Tooltip,
  Upload,
  UploadFile
} from 'antd'
import { ChevronRight } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface LessonProps {
  hideCourseFunction: boolean
  chapter: TChapter
  isRefetch: () => void
}

const Form_Lesson = ({ hideCourseFunction, chapter, isRefetch }: LessonProps) => {
  const { theme } = useContext(ThemeContext) as ThemeContextType
  const { startLoading, loading, stopLoading } = useLoading()
  const { id } = useParams()
  const [form] = Form.useForm()
  const id_Course = id
  const [createLesson] = useCreateLessonMutation()
  const [updateLesson] = useUpdateLessonMutation()
  const [updateIsPreview] = useUpdatePreviewVideoMutation()
  const [removeLesson] = useRemoveLessonMutation()
  const [removeVideoLesson] = useRemoveVideoLessonMutation()
  const [removeResourceLesson] = useRemoveResourceLessonMutation()

  // <==== State cho Upload video===>
  const [fileListVideo, setFileListVideo] = useState<UploadFile[]>([])
  const [fileListResource, setFileListResource] = useState<CustomUploadFile[]>([])

  // Chuyển đổi `lessonsData` thành định dạng `fileList`
  useEffect(() => {
    if (chapter?.lessons) {
      const initialFiles = chapter.lessons
        .filter((lesson: TLesson) => lesson.video_link) // Chỉ lấy các bài có video
        .map((lesson: TLesson) => ({
          uid: `${lesson.id}`, // Sử dụng ID bài học làm UID
          name: `Video ${lesson.name} `, // Tên bài học
          status: 'done' as const, // Đã upload
          url: lesson.video_link! // Đường dẫn video
        }))

      setFileListVideo(initialFiles) // Cập nhật `fileList`
      // Xử lý danh sách tài nguyên
      const initialFileList = chapter.lessons.flatMap((lesson) => 
        lesson.resources.map((resource: TResource) => ({
          uid: `${lesson.id}-${resource.id}`, // Tạo UID duy nhất từ bài học và tài nguyên
          name: resource.name.split('/').pop(), // Tách lấy tên file từ URL
          status: 'done' as const, // Đã tải lên
          url: resource.name, // URL tài liệu
          id: resource.id // ID tài liệu
        }))
      )
      setFileListResource(initialFileList)
    }
  }, [chapter])

  console.log(fileListResource)

  // <==== Xử lí logic cho xóa bài học =====>
  const handleChangeDeleteLesson = (chapter_id?: number, lesson?: TFormLesson) => {
    Modal.confirm({
      title: 'Vui lòng xác nhận',
      content: (
        <p className='dark:text-[#b9b7c0] text-[#685f78]'>
          Bạn có chắc chắn muốn xóa bài học có tên <span className='font-desc'>"{lesson?.name}"</span> hay không?
        </p>
      ),
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Hủy',
      centered: true,
      maskClosable: false,
      onOk: async () => {
        try {
          if (id && lesson && chapter_id) {
            await removeLesson({ id_course: Number(id), id_chapter: chapter_id, lesson: lesson }).unwrap()
            isRefetch()
            message.success('Xóa bài học thành công')
          }
        } catch (error) {
          const errorData = (error as { data?: any })?.data
          // Kiểm tra và hiển thị tất cả các lỗi trong errors
          // Nếu có trường error trong data, hiển thị thông báo lỗi
          if (errorData?.error) {
            message.error(errorData.error) // Hiển thị thông báo lỗi từ trường error trong data
          } else {
            // Nếu không có trường error, hiển thị thông báo lỗi mặc định
            message.error('Đã có lỗi xảy ra. Vui lòng thử lại!')
          }
        }
      }
    })
  }
  // <==== Kết thúc xử lí logic cho xóa chương =====>

  const handleSubmitLesson = async (chapter_id?: number, lesson?: TFormLesson) => {
    try {
      if (lesson?.id && chapter_id) {
        await updateLesson({
          id_course: Number(id_Course),
          id_chapter: chapter_id,
          lesson: { id: lesson.id, name: lesson.name }
        }).unwrap()
      } else {
        if (lesson?.name && chapter_id) {
          await createLesson({
            id_course: Number(id_Course),
            id_chapter: chapter_id,
            lesson: { name: lesson?.name }
          }).unwrap()
          
        }
      }
      message.success(lesson?.id ? 'Cập nhật bài học thành công' : 'Thêm mới bài học thành công!!!!')
    } catch (error) {
      const errorData = (error as { data?: any })?.data
      // Kiểm tra và hiển thị tất cả các lỗi trong errors
      // Nếu có trường error trong data, hiển thị thông báo lỗi
      if (errorData?.error) {
        message.error(errorData.error) // Hiển thị thông báo lỗi từ trường error trong data
      } else {
        // Nếu không có trường error, hiển thị thông báo lỗi mặc định
        message.error(lesson?.id ? 'Cập nhật bài học thất bại' : 'Thêm mới bài học thất bại')
      }
    }
  }

  const handleChangeIsPreview = (chapter_id: number, lesson_id: number, checked: boolean) => {
    Modal.confirm({
      title: <span className='text-red-500 font-title'>Xác nhận thay đổi trạng thái</span>,
      content: (
        <p className='dark:text-[#b9b7c0] text-[#685f78]'>
          Bạn có chắc chắn muốn <span className='font-desc'>"{checked ? 'mở xem trước' : 'khóa xem trước'}"</span> video
          này không?
        </p>
      ),
      okText: 'Đồng ý',
      okType: 'danger',
      okButtonProps: {
        style: { backgroundColor: '#F84563', borderColor: '#F84563', color: '#fff' }
      },
      cancelButtonProps: {
        className: 'custom-cancel-btn'
      },
      cancelText: 'Hủy',
      centered: true,
      maskClosable: false,
      width: 600,
      icon: null,
      onOk: async () => {
        try {
          if (id) {
            await updateIsPreview({
              id_course: Number(id_Course),
              id_chapter: chapter_id,
              id_lesson: lesson_id,
              isPreview: checked
            }).unwrap()
            isRefetch()
            message.success('Cập nhật trạng thái xem trước video thành công')
          }
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  // <==== Xử lí logic cho CẬP NHẬT & THÊM bài học =====>
  const handleFormLesson = (id_chapter: number, lesson?: TFormLesson) => {
    let inputRef = React.createRef<InputRef>()
    Modal.confirm({
      title: <h2>{lesson?.id ? 'Cập nhật bài học' : 'Thêm mới bài học'}</h2>,
      content: (
        <div className='flex justify-center items-center'>
          <Form layout='vertical' className='w-full' form={form}>
            <Form.Item name='name' label={<h2 className=' mr-2'>Bài học:</h2>} rules={[{ required: true }]}>
              <Input
                ref={inputRef}
                className=' py-1 px-2 bg-[#fafafa] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
              dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] text-[14px]
              focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
                defaultValue={lesson?.id ? `${lesson.name}` : ''}
                placeholder='Vui lòng nhập tên bài học'
              />
            </Form.Item>
          </Form>
        </div>
      ),
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Hủy',
      centered: true,
      maskClosable: false,
      width: 600,
      onCancel: () => {
        form.resetFields()
      },
      onOk: async () => {
        try {
          // Gọi validateFields để kiểm tra tất cả các trường hợp
          const values = await form.validateFields()

          const inputValue = values.name // Lấy giá trị hợp lệ từ form
          handleSubmitLesson(id_chapter, { id: lesson?.id, name: inputValue })
        } catch (error) {
          // Nếu validation thất bại, báo lỗi
          message.error('Vui lòng điền đầy đủ thông tin')
        } finally {
          form.resetFields()
        }
      }
    })
  }

  // <==== Xử lí logic cho xóa video bài học =====>
  const handleChangeDeleteVideo = async (chapter_id: number, lesson_id: number) => {
    startLoading(); // Bắt đầu loading
    const itemToDelete = fileListVideo.find((file) => file.uid === `${lesson_id}`); // Lưu item cần xóa
    const updatedFileList = fileListVideo.filter((file) => file.uid !== `${lesson_id}`); // Tạm thời xóa item khỏi danh sách
  
    // Cập nhật lại danh sách fileListVideo trên UI (Loại bỏ video khỏi UI)
    setFileListVideo(updatedFileList); 
  
    try {
      if (id) {
        // Gọi API để xóa video
        await removeVideoLesson({
          id_course: Number(id_Course),
          id_chapter: chapter_id,
          id_lesson: lesson_id
        }).unwrap();
  
        // Sau khi xóa thành công, gọi refetch lại dữ liệu
        isRefetch();
        message.success('Xóa video bài học thành công');
      }
    } catch (error) {
      const errorData = (error as { data?: any })?.data;
      // Kiểm tra và hiển thị tất cả các lỗi trong errors
      if (errorData?.error) {
        message.error(errorData.error); // Hiển thị thông báo lỗi từ trường error trong data
      } else {
        message.error('Xóa video bài học thất bại'); // Thông báo lỗi mặc định nếu không có lỗi chi tiết
      }
  
      // Nếu có lỗi, thêm lại item vào danh sách video (hoàn tác hành động xóa)
      if (itemToDelete) {
        setFileListVideo((prevFileList) => [...prevFileList, itemToDelete]);
      }
    } finally {
      stopLoading(); // Dừng loading sau khi hoàn thành (thành công hoặc thất bại)
    }
  };

  // <==== Xử lí logic cho xóa tài liệu bài học =====>
  const handleChangeDeleteResource = async (chapter_id: number, lesson_id: number, resource_id: number) => {
    startLoading()
    try {
      if(id){
        await removeResourceLesson({ id_course: Number(id_Course), id_chapter: chapter_id, id_lesson: lesson_id, id_resource: resource_id }).unwrap()
        isRefetch()
        message.success('Xóa tài liệu thành công')
      }
    } catch (error) {
      const errorData = (error as { data?: any })?.data
      // Kiểm tra và hiển thị tất cả các lỗi trong errors
      // Nếu có trường error trong data, hiển thị thông báo lỗi
      if (errorData?.error) {
        message.error(errorData.error) // Hiển thị thông báo lỗi từ trường error trong data
      } else {
        // Nếu không có trường error, hiển thị thông báo lỗi mặc định
        message.error('Xóa tài liệu thất bại')
      }
    }finally{
      stopLoading()
    }
  }

  // <==== Kết thúc xử lí logic cho CẬP NHẬT & THÊM chương =====>

  const getToken = localStorage.getItem('access_Token')
  // <==== Bắt đầu collapse con ====>
  const listLesson = (chapter_id: number, lesson: TLesson, index: number): CollapseProps['items'] => [
    {
      key: `${lesson.id}`,
      label: (
        <div className='flex items-center dark:text-[#b9b7c0]'>
          <h1 className='mr-1'>Bài {index + 1}:</h1>
          <h1 className='mr-4'>{lesson.name}</h1>
          {!hideCourseFunction && (
            <>
              {/* Modal */}
              <EditFilled
                onClick={() => handleFormLesson(chapter_id, { id: lesson.id, name: lesson.name })}
                style={{ fontSize: 16, color: `${theme === 'dark' ? '#b9b7c0' : '#1e1e1e'}`, marginRight: '12px' }}
              />
              <DeleteFilled
                onClick={() => handleChangeDeleteLesson(chapter_id, { id: lesson.id, name: lesson.name })}
                style={{
                  fontSize: 16,
                  height: '18px',
                  color: `${theme === 'dark' ? '#b9b7c0' : '#1e1e1e'}`,
                  cursor: 'pointer'
                }}
              />
            </>
          )}
        </div>
      ),
      children: (
        <>
          <div>
            <div
               className={`grid  ${!hideCourseFunction ? 'grid-cols-[3fr_1fr] md:grid-cols-[4fr_1fr] lg:grid-cols-[11.5fr_0.3fr]' : 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1 place-items-center'} gap-4 w-full mb-5 min-h-6`}
            >
              <Upload
                accept='video/*'
                disabled={hideCourseFunction} // Disable button upload nếu là
                listType='picture'
                fileList={fileListVideo.filter((file) => file.uid === `${lesson.id}`)}
                maxCount={1}
                onChange={({ file, fileList: newFileList }) => {
                  // Lọc ra các file hợp lệ
                  const validFileList = newFileList.filter((item) => validateVideoFile(item as unknown as File))

                  // Cập nhật lại fileList, chỉ giữ lại các file hợp lệ
                  setFileListVideo(
                    (prevFileList) =>
                      prevFileList
                        .filter((item) => item.uid !== `${lesson.id}`) // Loại bỏ file cũ của bài học này
                        .concat(validFileList.map((item) => ({ ...item, uid: `${lesson.id}` }))) // Thêm file mới với đúng uid
                  )
                }}
                onRemove={(file) => {
                  if (file.status === 'uploading') {
                    message.warning('Không thể xóa tệp trong khi tải lên.');
                    return false; // Ngăn xóa file
                  }
                  handleChangeDeleteVideo(chapter_id, lesson.id); // Gọi hàm xóa nếu không phải đang upload
                  return true; // Cho phép xóa
                }}
                showUploadList={{
                  removeIcon: (
                    <DeleteFilled style={{ color: '#b9b7c0' }} />
                  ),
                }}
                customRequest={async ({ file, onSuccess, onError }) => {
                  const formData = new FormData()

                  // Thêm file và tên (name) vào FormData
                  formData.append('name', file)

                  try {
                    const response = await fetch(
                      `https://umeacademy.me/api/v1/teacher/course/${id_Course}/chapter/${chapter_id}/lesson/${lesson.id}/videos`,
                      {
                        method: 'POST',
                        headers: {
                          Authorization: `Bearer ${getToken}` // Thêm token vào header Authorization
                        },
                        body: formData
                      }
                    )

                    if (response.ok) {
                      const data = await response.json()
                      isRefetch()
                      message.success('Upload bài học thành công')
                      onSuccess?.(data)
                      // Lưu URL video vào fileList để hiển thị lại sau khi reload
                    } else {
                      const errorData = await response.json(); // Lấy dữ liệu lỗi từ response
                      // Truyền lỗi từ response vào throw để bắt được thông báo chi tiết
                      throw new Error(errorData?.error || 'Video đã tồn tại trong bài học này.'); // Lỗi từ response nếu có
                    }
                  } catch (error: any) {
                      // Lấy thông điệp lỗi từ đối tượng error
                      const errorMessage = error.message || 'Thêm tài liệu thất bại'; // Lỗi mặc định nếu không có lỗi chi tiết

                      message.error(errorMessage); // Hiển thị thông báo lỗi từ catch
                      onError?.(error); // Gọi onError nếu có
                      // Khi có lỗi, đảm bảo trạng thái loading được dừng lại
                      setFileListVideo((prevFileList) =>
                        prevFileList.filter((item) => item.uid !== `${lesson.id}`) // Xóa file đang "loading" nếu có lỗi
                      );
                  }
                }}
              >
                {hideCourseFunction ? (
                  fileListVideo.some((file) => file.uid === `${lesson.id}`) ? null : (
                    <h1 className='text-red-600'>Chưa có video bài học</h1>
                  )
                ) : (
                  !fileListVideo.some((file) => file.uid === `${lesson.id}`) && (
                    <button
                      disabled={loading}
                      className={`${
                        !hideCourseFunction ? 'w-[30vh] md:w-[60vh] lg:w-[760px]' : 'w-[36vh] md:w-[58vh] lg:w-[720px]'
                      } border-[2px] px-4 py-1 border-[#ff5364] rounded-lg text-[12px] text-[#ff5364] font-subtitle`}
                    >
                      {loading ? <LoadingOutlined /> : (<span><UploadOutlined size={22} style={{ color: '#f66962', marginRight: 8 }} />
                        Upload video</span>)}
                    </button>
                  )
                )}
              </Upload>
              {!hideCourseFunction && fileListVideo.some((file) => file.uid === `${lesson.id}`) && (  
                  <div className='flex flex-col justify-around'>
                    <Space direction='vertical' key={index + 1}>
                      <Tooltip title='Cho xem trước video không ?'>
                        <Switch
                          checkedChildren='Mở'
                          unCheckedChildren='Đóng'
                          onChange={(checked) => handleChangeIsPreview(chapter_id, lesson.id, checked)}
                          checked={lesson.is_preview}
                          disabled={fileListVideo.some((file) => file.status === 'uploading')} // Disable khi có file đang upload
                        />
                      </Tooltip>
                    </Space>
                  </div>
              )}              
            </div>
            <Upload
                // accept='video/*'
                style={{border: '1px red solid', backgroundColor: 'red'}}
                disabled={hideCourseFunction} // Disable button upload nếu là
                listType='picture-card'
                fileList={fileListResource.filter((file) => file.uid.startsWith(`${lesson.id}-`))}
                showUploadList={{ 
                  showRemoveIcon: true,
                  removeIcon: (
                    <DeleteFilled style={{ color: '#b9b7c0' }} />
                  ),
                }}
                customRequest={async ({ file, onSuccess, onError }) => {
                  // Validate trước khi upload
                  if (!validateResourceFile(file as File)) {
                    console.warn('File không hợp lệ, upload bị chặn:', file);
                    onError?.(new Error('File không hợp lệ'));
                    return; // Ngăn upload
                  }
                  const formData = new FormData()

                  // Thêm file và tên (name) vào FormData
                  formData.append('name', file)
                  startLoading()
                  try {
                    const response = await fetch(
                      `https://umeacademy.me/api/v1/teacher/course/${id_Course}/chapter/${chapter_id}/lesson/${lesson.id}/resources`,
                      {
                        method: 'POST',
                        headers: {
                          Authorization: `Bearer ${getToken}` // Thêm token vào header Authorization
                        },
                        body: formData
                      }
                    )

                    if (response.ok) {
                      const data = await response.json()
                      isRefetch()
                      message.success('Upload tài liệu thành công')
                      onSuccess?.(data)
                      // Lưu URL video vào fileList để hiển thị lại sau khi reload
                    } else {
                      const errorData = await response.json(); // Lấy dữ liệu lỗi từ response
                      // Truyền lỗi từ response vào throw để bắt được thông báo chi tiết
                      throw new Error(errorData?.error); // Lỗi từ response nếu có
                    }
                  } catch (error: any) {
                      // Lấy thông điệp lỗi từ đối tượng error
                      const errorMessage = error.message || 'Thêm tài liệu thất bại'; // Lỗi mặc định nếu không có lỗi chi tiết

                      message.error(errorMessage); // Hiển thị thông báo lỗi từ catch
                      onError?.(error); // Gọi onError nếu có
                  }finally {
                    stopLoading()
                  }
                }}
                onRemove={(file) => {
                  if (file.status === 'uploading') {
                    message.warning('Không thể xóa tệp trong khi tải lên.');
                    return false; // Ngăn xóa file
                  }
                   // Tìm id tương ứng của file từ fileListResource dựa trên uid
                  const resourceToDelete = fileListResource.find((item) => item.uid === file.uid);
                  // Kiểm tra xem tài liệu có tồn tại không
                  if (resourceToDelete) {
                    handleChangeDeleteResource(chapter_id, lesson.id, Number(resourceToDelete.id)); // Truyền id của tài liệu vào hàm xóa
                  } else {
                    message.error('Không tìm thấy tài liệu để xóa.');
                  }
                }}
              >
                {hideCourseFunction ? (
  fileListResource.some((file) => file.uid.startsWith(`${lesson.id}-`)) ? (
    null // Không hiển thị gì nếu có tài liệu
  ) : (
    <h1 className="text-red-600">Không có tài liệu</h1> // Hiển thị khi không có tài liệu
  )
) : (
  !fileListResource.some((file) => file.uid.startsWith(`${lesson.id}-`)) && (
    <button
      className={`border-[0px] ${loading ? 'disabled:' : ''}`}
      disabled={loading} // Disable button khi đang tải
    >
      {loading ? (
        <LoadingOutlined />
      ) : (
        <span>
          <UploadOutlined size={22} style={{ color: '#f66962', marginRight: 8 }} />
          Thêm tài liệu
        </span>
      )}
    </button>
  )
)}
            </Upload>
          </div>
        </>
      )
    }
  ]
  // <==== Kết thúc collapse con ====>
  return (
    <>
      {chapter.lessons.map((lesson, index) => (
        <Collapse
          key={lesson.id}
          items={listLesson(chapter.id, lesson, index)}
          className='dark:bg-[#3a3545] dark:border-[#c7c7c740] border-[1px] border-[#d9d9d9] mb-3'
          collapsible='icon'
          expandIcon={({ isActive }) => (
            <ChevronRight
              strokeWidth={3}
              size={16}
              style={{
                fontSize: '20px',
                transform: `rotate(${isActive ? 270 : 90}deg)`,
                color: `${theme === 'dark' ? '#b9b7c0' : '#1e1e1e'}`
              }}
            />
          )}
          expandIconPosition='end'
        />
      ))}
      <div className='flex justify-start mt-6'>
        {!hideCourseFunction && (
          <button
            onClick={() => handleFormLesson(chapter.id)}
            className='flex justify-center items-center mt-2 px-2 py-1.5 rounded-full border-[1px] border-[#ff5364] bg-[#ff5364]'
          >
            <EditFilled style={{ fontSize: 12, color: '#fff', marginRight: '12px' }} />
            <p className='text-[#fff] text-[12px] font-title '>Thêm bài học mới</p>
          </button>
        )}
      </div>
    </>
  )
}

export default Form_Lesson
