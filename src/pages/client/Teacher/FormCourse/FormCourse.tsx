import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import { TreeSelect } from 'antd'
import Input from 'antd/es/input/Input'
import { TreeNode } from 'antd/es/tree-select'
import Dragger from 'antd/es/upload/Dragger'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import './Form_Course.scss'
import { useState } from 'react'
const FormCourse = () => {
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
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()
  const handleClick = () => {
    setLoading(true)
    // Giả lập quá trình chờ dữ liệu tải
    setTimeout(() => {
      setLoading(false)
      nav('/')
    }, 2000);
  }

  return (
    <>
      <div className='bg-[#fff] p-12 rounded-lg dark:bg-[#2b2838]'>
        <div className=''>
          <h4 className='text-[28px] font-title text-[#f66962] mb-6'>Thông tin khóa học</h4>

          {/* Tiêu đề */}
          <div className='mb-6'>
            <label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Tiêu đề khóa học</label>
            <Input
              type='text'
              className='mt-3 py-[6px] px-[16px] bg-[#fafafa] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
              h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
              focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
              placeholder='Tiêu đề khóa học'
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
            >
              <TreeNode value='jav' title='Jav' />
              <TreeNode value='forn' title='Forn Hub' />
            </CustomTreeSelect>
          </div>

          {/* Danh mục */}
          <div className='mb-12'>
            <label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Danh mục khóa học</label>
            <CustomTreeSelect
              treeDataSimpleMode
              style={{ width: '100%', marginTop: 12, height: 44 }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder='Vui lòng chọn--'
              showSearch
            >
              <TreeNode value='jav' title='Jav' />
              <TreeNode value='forn' title='Forn Hub' />
            </CustomTreeSelect>
          </div>
          
          {/* Ảnh bìa */}
          <div className='mb-6'>
            <label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Ảnh bìa khóa học</label>
            <Dragger name='file' action={``} listType='picture' maxCount={1} className=''>
              <p className='ant-upload-drag-icon'>
                <UploadOutlined style={{ color: '#f66962' }} />
              </p>
              <p className='text-[16px] dark:text-[#b9b7c0] mb-1'>Nhấp hoặc kéo tệp vào khu vực này để tải lên</p>
              <p className='text-[#00000073] dark:text-[#b9b7c0]'>
                Hỗ trợ tải lên một tệp. Nghiêm cấm tải lên dữ liệu công ty hoặc các tệp bị cấm khác.
              </p>
            </Dragger>
          </div>
          
          {/* Mô tả */}
          <div className='mb-6'>
            <label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Mô tả khóa học</label>
            <textarea
              className='mt-3 py-[6px] px-[16px] w-full  bg-[#fafafa] border-[#c1c9d2] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0] block
              h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
              focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa] focus:outline-none font-desc text-[14px] min-h-[150px] rounded-lg leading-[1.5]'
              placeholder='Mô tả'
            />
          </div>

          {/* Nút */}
          <div className='flex justify-between'>
            <Link
              to={`/`}
              className='w-[180px] flex justify-center border-[1px] font-title border-[#685f78] text-[#fff] bg-[#685f78] p-2.5 rounded-lg hover:bg-transparent hover:text-[#685f78]'
            >
              Quay lại
            </Link>
            <button onClick={() => handleClick()} className='w-[180px] border-[1px] font-title border-[#ff5364] bg-[#ff5364] text-[#fff] p-2.5 rounded-lg hover:bg-transparent hover:text-[#ff5364]'>
              {loading ? <LoadingOutlined/> : 'Thêm mới khóa học'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormCourse
