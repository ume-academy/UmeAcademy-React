// ChapterList.tsx
import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext'
import { TChapter, TFormLesson, TLesson } from '@/interfaces/TLesson'
import { useCreateLessonMutation, useUpdateLessonMutation, useUpdatePreviewVideoMutation } from '@/redux/slices/lesson/lessonApiSlice'
import { validateVideoFile } from '@/Validators/upload_lesson_validator'
import { DeleteFilled, EditFilled, UploadOutlined } from '@ant-design/icons'
import { Collapse, CollapseProps, Form, Input, InputRef, message, Modal, Space, Switch, Tooltip, Upload, UploadFile, UploadProps } from 'antd'
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
  const { id } = useParams()
  const [form] = Form.useForm()
  const id_Course = id
  const [createLesson] = useCreateLessonMutation()
  const [updateLesson] = useUpdateLessonMutation()
  const [updateIsPreview] = useUpdatePreviewVideoMutation()
  
  // <==== State cho Upload video===>
  const [fileListVideo, setFileListVideo] = useState<UploadFile[]>([])

  // Chuyển đổi `lessonsData` thành định dạng `fileList`
  useEffect(() => {
    if (chapter?.lessons) {
      const initialFiles = chapter.lessons
        .filter((lesson: TLesson) => lesson.video_link) // Chỉ lấy các bài có video
        .map((lesson: TLesson) => ({
          uid: `${lesson.id}`, // Sử dụng ID bài học làm UID
          name: `Video ${lesson.name} `, // Tên bài học
          status: 'done'as const, // Đã upload
          url: lesson.video_link!, // Đường dẫn video
        }));

      setFileListVideo(initialFiles); // Cập nhật `fileList`
    }
  }, [chapter]);

  // <==== Xử lí logic cho xóa chương =====>
  const handleChangeDeleteChapter = (id: number) => {
    Modal.confirm({
      title: 'Vui lòng xác nhận',
      content: `Bạn sắp xóa một chương trình giảng dạy. Bạn có chắc chắn muốn tiếp tục không?`,
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Hủy',
      centered: true,
      maskClosable: false,
      onOk: () => {
        // setConfirmLoading(true)
        // return new Promise((resolve) => {
        //   setTimeout(() => {
        //     message.success('thành công rồi')
        //     // Thay bằng logic xóa của bạn
        //     setConfirmLoading(false) // Dừng loading
        //     resolve(undefined)
        //   }, 2000)
        // })
      }
    })
  }
  // <==== Kết thúc xử lí logic cho xóa chương =====>

  const handleSubmitLesson = async (chapter_id?: number, lesson?: TFormLesson) => {
    try {
      if(lesson?.id && chapter_id){
          updateLesson({id_course: Number(id_Course), id_chapter: chapter_id ,lesson: {id: lesson.id, name: lesson.name}}).unwrap()
      }else{
        if(lesson?.name && chapter_id){
          createLesson({id_course: Number(id_Course), id_chapter: chapter_id ,lesson: {name: lesson?.name}}).unwrap()
        }
      }
      isRefetch()
      message.success(lesson?.id ? 'Cập nhật bài học thành công' : 'Thêm mới bài học thành công')
    } catch (error) {
      console.log('lỗi rồi', error)
      message.error(lesson?.id ? 'Cập nhật bài học thất bại' : 'Thêm mới bài học thất bại')
    }
  }

  const handleChangeIsPreview = async (chapter_id: number, lesson_id: number, checked: boolean) => {
    Modal.confirm({
      title: (
        <span className='text-red-500 font-title'>Xác nhận thay đổi trạng thái</span>
      ),
      content: (
        <p className='dark:text-[#b9b7c0] text-[#685f78]'>
          Bạn có chắc chắn muốn <span className='font-desc'>"{checked ? "mở xem trước" : "khóa xem trước"}"</span> video này không?
        </p>
      ),
      okText: 'Đồng ý',
      okType: 'danger',
      okButtonProps: {
        style: { backgroundColor: '#F84563', borderColor: '#F84563', color: '#fff' },
      },
      cancelButtonProps: {
        className: "custom-cancel-btn",
      },
      cancelText: 'Hủy',
      centered: true,
      maskClosable: false, 
      width: 600,
      icon: null,
      onOk: async () => {
        try {
          if(id){
            updateIsPreview({id_course: Number(id_Course), id_chapter: chapter_id, id_lesson: lesson_id, isPreview: checked}).unwrap()
            isRefetch()
            message.success('Cập nhật trạng thái xem trước video thành công')
          }
        } catch (error) {
          console.log(error)
        }
      }
    });
  }

  // <==== Xử lí logic cho CẬP NHẬT & THÊM bài học =====>
  const handleFormLesson = (id_chapter: number, lesson?: TFormLesson) => {
    let inputRef = React.createRef<InputRef>()
    Modal.confirm({
      title: <h2>{lesson?.id ? 'Cập nhật bài học' : 'Thêm mới bài học'}</h2>,
      content: (
        <div className='flex justify-center items-center'>
          <Form layout="vertical" className="w-full" form={form} >
          <Form.Item
            name='name'
            label={<h2 className=" mr-2">Bài học:</h2>}
            rules={[{ required: true}]}
          >
            <Input 
              ref={inputRef}
              className=' py-1 px-2 bg-[#fafafa] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
              dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] text-[14px]
              focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
              defaultValue={lesson?.id ? `${lesson.name}` : ''} placeholder="Vui lòng nhập tên bài học"
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
      onCancel: () => {form.resetFields()},
      onOk: async () => {
        try {
          // Gọi validateFields để kiểm tra tất cả các trường hợp
          const values = await form.validateFields()

          const inputValue = values.name // Lấy giá trị hợp lệ từ form
          handleSubmitLesson(id_chapter, { id: lesson?.id, name: inputValue })
        } catch (error) {
          // Nếu validation thất bại, báo lỗi
          message.error('Vui lòng điền đầy đủ thông tin')
        }finally{
          form.resetFields()
        }
      }
    })
  }

  // <==== Kết thúc xử lí logic cho CẬP NHẬT & THÊM chương =====>


  // // <==== Hàm này để setFileList khi đã có video thì sẽ ẩn button upload đi ===>
  // const handleUploadFile: UploadProps['onChange'] = ({ file, fileList: newFileList }) => {
  //   setFileListVideo(newFileList)
  // }
  // <====Kết thúc Upload ====>

  const getToken = localStorage.getItem('access_Token')
  // <==== Bắt đầu collapse con ====>
  const listLesson = (chapter_id: number, lesson: TLesson, index: number): CollapseProps['items'] => [
    {
      key: `${lesson.id}`,
      label: (
        <div className='flex items-center dark:text-[#b9b7c0]'>
          <h1 className='mr-1'>Bài {index + 1}:</h1><h1 className='mr-4'>{lesson.name}</h1>
          {!hideCourseFunction && (
            <>
              {/* Modal */}
              <EditFilled
                onClick={() => handleFormLesson(chapter_id,{ id: lesson.id, name: lesson.name })}
                style={{ fontSize: 16, color: `${theme === 'dark' ? '#b9b7c0' : '#1e1e1e'}`, marginRight: '12px' }}
              />
              <DeleteFilled
                onClick={() => handleChangeDeleteChapter(1)}
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
              className={`grid  ${!hideCourseFunction ? 'grid-cols-[3fr_1fr] md:grid-cols-[4fr_1fr] lg:grid-cols-[11.5fr_0.5fr]' : 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1 place-items-center'} gap-4 w-full mb-5 min-h-6`}
            >
              <Upload 
                accept='video/*'
                disabled={hideCourseFunction} // Disable button upload nếu là
                listType='picture'
                fileList={fileListVideo.filter((file) => file.uid === `${lesson.id}`)}
                maxCount={1}
                onChange={({ file, fileList: newFileList }) => {
                  // Lọc ra các file hợp lệ
                  const validFileList = newFileList.filter((item) => validateVideoFile(item as unknown as File));

                  // Cập nhật lại fileList, chỉ giữ lại các file hợp lệ
                  setFileListVideo((prevFileList) =>
                    prevFileList
                      .filter((item) => item.uid !== `${lesson.id}`) // Loại bỏ file cũ của bài học này
                      .concat(validFileList.map((item) => ({ ...item, uid: `${lesson.id}` }))) // Thêm file mới với đúng uid
                  );
                }}
                showUploadList={{ showRemoveIcon: false }}
                customRequest={async ({ file, onSuccess, onError }) => {
                  const formData = new FormData();
                  
                  // Thêm file và tên (name) vào FormData
                  formData.append('name', file);
  
                  try {
                    const response = await fetch(`https://umeacademy.me/api/v1/teacher/course/${id_Course}/chapter/${chapter_id}/lesson/${lesson.id}/videos`, {
                      method: 'POST',
                      headers: {
                        'Authorization': `Bearer ${getToken}`,  // Thêm token vào header Authorization
                      },
                      body: formData,
                    });
  
                    if (response.ok) {
                      const data = await response.json();
                      isRefetch()
                      message.success('Upload bài học thành công');
                      onSuccess?.(data);
                       // Lưu URL video vào fileList để hiển thị lại sau khi reload
                    } else {
                      message.error('Video đã tồn tại trong bài học này.');
                      onError?.(new Error('Upload failed'));
                    }
                  } catch (error: any) {
                    onError?.(error);
                  }
                }}
              >
                {hideCourseFunction ? (
                  fileListVideo.some((file) => file.uid === `${lesson.id}`) ? null : (
                    <h1 className="text-red-600">Chưa có video bài học</h1>
                  )
                ) : (
                  !fileListVideo.some((file) => file.uid === `${lesson.id}`) && (
                    <button
                      className={`${
                        !hideCourseFunction
                          ? 'w-[30vh] md:w-[60vh] lg:w-[760px]'
                          : 'w-[36vh] md:w-[58vh] lg:w-[720px]'
                      } border-[2px] px-4 py-1 border-[#ff5364] rounded-lg text-[12px] text-[#ff5364] font-subtitle`}
                    >
                      <UploadOutlined size={22} style={{ color: '#f66962', marginRight: 8 }} />
                      Upload
                    </button>
                  )
                )}
              </Upload>
              {!hideCourseFunction && fileListVideo.some((file) => file.uid === `${lesson.id}`) && (<>
                <div className="flex flex-col justify-around">
                  <Space direction="vertical" key={index + 1}>
                    <Tooltip title="Cho xem trước video không">
                    <Switch
                      checkedChildren="Mở"
                      unCheckedChildren="Đóng"
                      onChange={(checked) => handleChangeIsPreview(chapter_id, lesson.id, checked)}
                      checked={lesson.is_preview}
                    />
                    </Tooltip>
                  {/* <DeleteOutlined
                    onClick={() => handleChangeDeleteChapter(2)}
                    className='flex justify-center text-[16px] items-center text-[#1f1f1f] dark:text-[#b9b7c0]'
                  /> */}
                  </Space>
                </div>

              </>)}
              {/* <Upload
                listType='picture'
                fileList={fileList}
                maxCount={1}
                onChange={handleUploadFile}
                showUploadList={{ showRemoveIcon: false }}
                {...propsUpload}
              >
                {fileList.length === 0 && (
                  <button
                    className={`${!hideCourseFunction ? 'w-[30vh] md:w-[60vh] lg:w-[760px]' : 'w-[36vh] md:w-[58vh] lg:w-[720px]'} flex items-center justify-center border-[2px] rounded-lg border-[#ff5364] text-[#ff5364] text-[12px] px-2 py-1 font-subtitle"><Plus size={12} color="#ff5364" className="mr-1`}
                  >
                    {' '}
                    Tài nguyên
                  </button>
                )}
              </Upload>
              {!hideCourseFunction && (
                <DeleteOutlined
                  onClick={() => handleChangeDeleteChapter(2)}
                  className='flex justify-center text-[16px] items-center text-[#1f1f1f] dark:text-[#b9b7c0]'
                />
              )} */}
            </div>
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
