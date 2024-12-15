import { validateThumbnailArticle } from '@/Validators/article_form_validator'
import { router } from '@/configs/routes'
import { getTitleTab } from '@/constants/client'
import useLoading from '@/hooks/useLoading'
import { useQuillModules } from '@/hooks/useQuillModules'
import { TArticle_Form } from '@/interfaces/TBlog'
import { useCreateArticleMutation, useGetArticleByIdQuery, useUpdateArticleMutation } from '@/redux/slices/blog/blogApiSlice'
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Form, Image, Input, message, TreeSelect } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import { MoveLeft } from 'lucide-react'
import 'quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import ReactQuill from 'react-quill'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import './form_article.scss'
import Loading from '@/components/client/commonComponents/Loading/Loading'
const Form_Article = () => {
  const { modules, editorRef } = useQuillModules()
  const [form] = Form.useForm()
  const [editorValue, setEditorValue] = useState<string>('')
  const [isHovered, setIsHovered] = useState(false)
  const { loading, stopLoading, startLoading } = useLoading()
  const [createArticle] = useCreateArticleMutation()
  const [updateArticle] = useUpdateArticleMutation()
  const { id } = useParams()
  const nav = useNavigate()

  const {data: articleData, isLoading} = useGetArticleByIdQuery({id})
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
  `
  // set video và ảnh khi upload lên đưa vào preview
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)

  useEffect(() => {
    if(articleData){
      form.setFieldsValue({
        title: articleData?.data?.title,
        content: articleData?.data?.content,
        status: articleData?.data?.status,
        thumbnail: articleData?.data?.thumbnail ?
            [{
                uid: '-1', // UID tạm thời cho file
                name: 'thumbnail', // Tên file bất kỳ
                status: 'done', // Đánh dấu là hoàn tất upload
                url: articleData?.data?.thumbnail, // URL của ảnh từ API
            }] : [],
      })
    }
    setThumbnailPreview(articleData?.data?.thumbnail)
  }, [articleData, form])

  // Hàm xử lý sự kiện hover
  const handleMouseEnter = () => {
    setIsHovered(true) // Cập nhật state khi hover vào
  }

  const handleMouseLeave = () => {
    setIsHovered(false) // Cập nhật state khi rời khỏi
  }

  const handleChange = (value: string) => {
    setEditorValue(value)
  }

  const onfinish = async (data: TArticle_Form) => {
    startLoading()
    try {
      if(id){
        const { title, thumbnail, content, status } = data as TArticle_Form
        console.log(data)
        const updateData = new FormData()
        updateData.append('title', title.toString())
        updateData.append('content', content)
        updateData.append('status', status)
        updateData.append('_method', 'PUT');
        const file = thumbnail?.fileList?.[0].originFileObj
        if (file) {
          updateData.append('thumbnail', file)
        }
        await updateArticle({formData: updateData, id: Number(id)}).unwrap()
        message.success('Cập nhật bài viết thành công')
      }else{
        const { title, thumbnail, content, status } = data as TArticle_Form

        const createFormData = new FormData()
        createFormData.append('title', title.toString())
        createFormData.append('content', content)
        createFormData.append('status', status)
        const file = thumbnail?.fileList?.[0].originFileObj
        if (file) {
          createFormData.append('thumbnail', file)
        }

        await createArticle({ formData: createFormData }).unwrap()
        message.success('Thêm bài viết thành công')
      }
      stopLoading()
      nav(router.listArticle)
    } catch (error) {
      message.error('Có lỗi xảy ra')
      console.log(error)
      stopLoading()
    }
  }

  return (
    <>
      <Helmet>
        <title>{getTitleTab('Sản phẩm danh mục')}</title>
      </Helmet>
      {isLoading ? ( <div className="min-h-screen flex justify-center items-center"><Loading /></div>
        ) : (
      <div className='p-4 dark:bg-[#2b2838] bg-white rounded-lg'>
        <div className='heading flex justify-between items-center pb-9'>
          <h5 className='font-title text-[24px] dark:text-[#b9b7c0] text-[#685f78]'>{id ? 'Cập nhật bài viết' : 'Thêm mới bài viết'}</h5>

          <Link
            to={router.listArticle}
            className='
            border 
            border-[#F84563] 
            py-2
            px-3
            w-auto
            rounded-md 
            bg-[#F84563] 
            md:w-[20%] 
            flex 
            justify-center 
            items-center 
            text-white 
            hover:bg-white 
            hover:border-[#F84563] 
            hover:text-[#F84563] 
            
            md:py-2 md:px-5 md:gap-2
            lg:w-[15%]'
          >
            <MoveLeft size={16} />
            <span className='ml-2'>Quay lại</span>
          </Link>
        </div>
        <Form layout='vertical' form={form} onFinish={onfinish}>
          <div className='mb-8'>
            <Form.Item
              name='title'
              label={<label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Tiêu đề bài viết</label>}
              rules={[
                { required: true, message: 'Tiêu đề không được trống.' },
                { type: 'string', message: 'Tiêu đề phải là một chuỗi.' },
                { max: 255, message: 'Tiêu đề không được vượt quá 255 ký tự.' }
              ]}
            >
              <Input
                type='text'
                className='w-full py-[6px] px-[16px] bg-[#fafafa] dark:bg-[#2b2838] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
                          h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
                          focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
                placeholder='Tiêu đề khóa học'
              />
            </Form.Item>
          </div>

          {/* Ảnh bìa */}
          <div className='mb-8'>
            <Form.Item
              name='thumbnail'
              label={<label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Ảnh thu nhỏ bài viết</label>}
              rules={[
                {
                  validator: async (_, value) => {
                    // Gọi hàm validateFile để kiểm tra file
                    
                    const isUsingOldThumbnail = !!(id && articleData?.data?.thumbnail && !value?.file);
                    return validateThumbnailArticle(value?.file, isUsingOldThumbnail);
                  }
                }
              ]}
            >
              <Dragger
                accept='image/*'
                name='file'
                listType='picture'
                maxCount={1}
                style={{ padding: 18 }}
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
                <p className='text-[#00000073] dark:text-[#b9b7c0]'>Hỗ trợ tải lên một tệp JPEG, PNG, GIF, SVG, JPG.</p>
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

          {/* text editor */}
          <div className='mb-8'>
            <Form.Item
              name='content'
              label={<label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Nội dung bài viết</label>}
              rules={[
                { required: true, message: 'Nội dung không được trống.' },
                { type: 'string', message: 'Nội dung phải là một chuỗi' },
                { min: 10, message: 'Nội dung phải có ít nhất 10 ký tự' }
              ]}
            >
              <ReactQuill
                ref={editorRef}
                style={{ minHeight: '100px' }}
                placeholder='Viết một cái gì đó ...'
                value={editorValue}
                onChange={handleChange}
                modules={modules}
                theme='snow'
              />
            </Form.Item>
          </div>

          {/* status */}
          <div className='mb-8'>
            <Form.Item
              name='status'
              label={<label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Trạng thái bài viết</label>}
              rules={[{ required: true, message: 'Trạng thái không được để trống.' }]}
            >
              <CustomTreeSelect
                style={{ width: '100%', height: 44 }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder='Chọn trạng thái---'
              >
                <TreeSelect.TreeNode value='published' title='Xuất bản' />
                <TreeSelect.TreeNode value='draft' title='Bản thảo' />
              </CustomTreeSelect>
            </Form.Item>
          </div>
          {id && (
            <Form.Item
            name='_method'
            initialValue={'PUT'}
          >
            <Input
              hidden
              type='text'
            />
          </Form.Item>
          )}
          <Button
            htmlType='submit'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ border: '2px solid #ff5364', color: `${isHovered === false ? '#fff' : '#ff5364'}` }}
            className='w-full md:w-[180px] lg:w-[180px] font-title bg-[#ff5364] text-[#fff] p-5 rounded-lg hover:bg-transparent'
            disabled={loading}
          >
            {loading ? <LoadingOutlined /> : id ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </Form>
        {/* <div>
            <h3>Output:</h3>
            <div dangerouslySetInnerHTML={{ __html: editorValue }} />
          </div> */}
      </div>
      )}
    </>
    
  )
}
export default Form_Article
