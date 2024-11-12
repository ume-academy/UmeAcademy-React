import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import { TreeSelect } from 'antd'
import Input from 'antd/es/input/Input'
import { TreeNode } from 'antd/es/tree-select'
import Dragger from 'antd/es/upload/Dragger'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import './Form_Course.scss'
import { useState } from 'react'
import { routerConfigAdmin } from '@/contants/admin'
import TextArea from 'antd/es/input/TextArea'

const Form_Course = () => {
  const {id} = useParams()

  // Sử dụng hook để thông tin vị trí của route hiện tại render component cho phù hợp
  const location = useLocation()
  const hideCourseFunction = routerConfigAdmin.hideCourseFunction.some((route) => {
    const regex = new RegExp(`^${route.replace(':id', '[^/]+')}$`)
    return regex.test(location.pathname)
  })


  // Custom lại thẻ select
  const CustomTreeSelect = styled(TreeSelect)`
    // Đổ màu cho thẻ
    .ant-select-selector {
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
    }
  `

  // state loading khi click nút
  const nav = useNavigate()
  const [loading, setLoading] = useState(false)
  const handleClick = () => {
    setLoading(true)
    // Giả lập quá trình chờ dữ liệu tải
    setTimeout(() => {
      setLoading(false)
      if(id){
        alert("Cập nhật thành công")
      }else{
        nav('/teacher/course-management/1')
      }
    }, 2000);
  }
  
  // Điều kiện rending text cho thẻ title H1
  const textH1 = id && !hideCourseFunction
    ? 'Cập nhật khóa học' 
    : hideCourseFunction 
    ? 'Tổng quan khóa học' 
    : 'Thêm mới khóa học'

  return (
    <div className='px-[16px]'>
      <div className={`bg-[#fff] ${id ? 'shadow-[0_2px_4px_rgba(0,0,0,0.08),_0_4px_12px_rgba(0,0,0,0.16)]' : ''} p-[16px] lg:p-14 rounded-lg dark:bg-[#2b2838]`}>
        <div className=''>
          <h1 className='text-[28px] font-title text-[#f66962] mb-6'>{textH1}</h1>

          {/* Tiêu đề */}
          <div className='mb-6'>
            <label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Tiêu đề khóa học</label>
            <Input
              type='text'
              className='mt-3 py-[6px] px-[16px] bg-[#fafafa] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
              h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
              focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
              placeholder='Tiêu đề khóa học'
              disabled={hideCourseFunction}
            />
          </div>

          {/* Trình độ */}
          <div className='mb-6'>
            <label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Trình độ khóa học</label>
            <CustomTreeSelect
              treeDataSimpleMode
              style={{ width: '100%', marginTop: 12, height: 44 }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder='Vui lòng chọn'
              showSearch
              disabled={hideCourseFunction}
            >
              <TreeNode value='jav' title='Jav' />
              <TreeNode value='forn' title='Forn Hub' />
            </CustomTreeSelect>
          </div>

          {/* Danh mục */}
          <div className='mb-6'>
            <label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Danh mục khóa học</label>
            <CustomTreeSelect
              treeDataSimpleMode
              style={{ width: '100%', marginTop: 12, height: 44 }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder='Vui lòng chọn--'
              showSearch
              disabled={hideCourseFunction}
            >
              <TreeNode value='jav' title='Jav' />
              <TreeNode value='forn' title='Forn Hub' />
            </CustomTreeSelect>
          </div>

          {/* Danh mục con phần này lấy theo danh mục cha(danh mục khóa học)*/}
          {id ? (
            <>
            {/* Danh mục con */}
            <div className='mb-6'>
            <label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Danh mục con</label>
            <CustomTreeSelect
              treeDataSimpleMode
              style={{ width: '100%', marginTop: 12, height: 44 }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder='Vui lòng chọn--'
              showSearch
              disabled={hideCourseFunction}
            >
              <TreeNode value='jav' title='Jav' />
              <TreeNode value='forn' title='Forn Hub' />
            </CustomTreeSelect>
          </div>

          {/* Video giới thiệu */}
          <div className='mb-6'>
            <label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Video giới thiệu</label>
            <Dragger name='file' action={``} listType='picture' maxCount={1} style={{marginTop: 12, padding: 18}} disabled={hideCourseFunction}>
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
          ): (<></>)}
          
          {/* Ảnh bìa */}
          <div className='mb-6'>
            <label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Ảnh bìa khóa học</label>
            <Dragger name='file' action={``} listType='picture' maxCount={1} style={{marginTop: 12, padding: 18}} disabled={hideCourseFunction}>
              <p className='ant-upload-drag-icon'>
                <UploadOutlined style={{ color: '#f66962' }} />
              </p>
              <p className='text-[16px] dark:text-[#b9b7c0] mb-1'>Nhấp hoặc kéo tệp vào khu vực này để tải lên</p>
              <p className='text-[#00000073] dark:text-[#b9b7c0]'>
                Hỗ trợ tải lên một tệp. Nghiêm cấm tải lên dữ liệu công ty hoặc các tệp bị cấm khác.
              </p>
            </Dragger>
          </div>
          
          {/* Tóm tắt */}
          <div className='mb-6'>
            <label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Tóm tắt khóa học</label>
            <TextArea
              style={{height: 160}}
              className='mt-3 p-[16px]  w-full bg-[#fafafa] border-[#c1c9d2] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0] block
              h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
              focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa] focus:outline-none font-desc text-[14px] rounded-lg leading-[1.5]'
              placeholder='Mô tả'
              disabled={hideCourseFunction}
            />
          </div>

          {/* Mô tả */}
          <div className='mb-6'>
            <label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Mô tả khóa học</label>
            <TextArea
              style={{height: 160}}
              className='mt-3 p-[16px]  w-full bg-[#fafafa] border-[#c1c9d2] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0] block
              h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
              focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa] focus:outline-none font-desc text-[14px] rounded-lg leading-[1.5]'
              placeholder='Mô tả'
              disabled={hideCourseFunction}
            />
          </div>

          {!hideCourseFunction ? (
            <>
              {/* Nút */}
          <div className='flex flex-col md:flex-row md:justify-between lg:flex-row lg:justify-between'>
            <Link
              to={`/`}
              className='w-full md:w-[180px] lg:w-[180px] mb-5  md:mb-0 lg:mb-0 flex justify-center border-[1px] font-title border-[#685f78] text-[#fff] bg-[#685f78] p-2.5 rounded-lg hover:bg-transparent hover:text-[#685f78]'
            >
              Quay lại
            </Link>
            <button onClick={() => handleClick()} className='w-full md:w-[180px] lg:w-[180px] border-[1px] font-title border-[#ff5364] bg-[#ff5364] text-[#fff] p-2.5 rounded-lg hover:bg-transparent hover:text-[#ff5364]'>
              {loading ? <LoadingOutlined/> : (id ? 'Lưu' : 'Thêm mới khóa học')}
            </button>
          </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default Form_Course
