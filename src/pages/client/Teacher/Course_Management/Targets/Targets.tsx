import { routerConfigAdmin } from '@/constants/admin'
import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext'
import useLoading from '@/hooks/useLoading'
import { LoadingOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { Plus, Trash } from 'lucide-react'
import { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Targets = () => {
  const { theme } = useContext(ThemeContext) as ThemeContextType
  const [requiments, setRequiments] = useState<string[]>(['', '', '', ''])
  const [benefits, setBenefits] = useState<string[]>(['', '', '', ''])
  const { loading, startLoading, stopLoading} = useLoading()
  const [isHovered, setIsHovered] = useState(false);

  // Sử dụng hook để thông tin vị trí của route hiện tại render component cho phù hợp
  const location = useLocation()
  const hideCourseFunction = routerConfigAdmin.hideCourseFunction.some((route) => {
    const regex = new RegExp(`^${route.replace(':id', '[^/]+')}$`)
    return regex.test(location.pathname)
  })


  // Hàm này để lưu lại index và value của input rồi set lại state
  const handleInputChange = (type: 'requiment' | 'benefit', index: number, value: string) => {
    const setState = type === 'requiment' ? setRequiments : setBenefits
    setState((prevState) => {
      const newValue = [...prevState] // Tạo ra một bản sao mảng input
      newValue[index] = value // Lấy bản sao vừa rồi cập nhật giá trị mới cho index hiện tại
      return newValue //Cập nhật mảng mới cho state
    })
  }

  // Hàm này để tạo thêm 1 input mới
  const handleAddInput = (type: 'requiment' | 'benefit') => {
    const values = type === 'requiment' ? requiments : benefits
    if (values.every((value) => value.trim() !== '')) {
      type === 'requiment' ? setRequiments([...requiments, '']) : setBenefits([...benefits, ''])
    } else {
      message.error('Vui lòng nhập đủ giá trị')
    }
  }

  // Hàm này để xóa input
  const handleRemoveInput = (type: 'requiment' | 'benefit', index: number) => {
    const setState = type === 'requiment' ? setRequiments : setBenefits
    setState((prevState) => {
      const removeInput = [...prevState]
      if (removeInput[index]) {
        removeInput.splice(index, 1)
      }
      return removeInput
    })
  }



  const onsubmit = () => {
    startLoading()
    // Giả lập quá trình chờ dữ liệu tải
    setTimeout(() => {

      if (benefits && requiments) {
    console.log(requiments, benefits)
        stopLoading()
        message.success('Lưu thành công')
      } else {
        message.error('Lưu thất bại')
      }
    }, 2000)
  }

  return (
    <div>
      <div className='px-[16px] lg:px-0'>
        <div
          className={`bg-[#fff] shadow-[0_2px_4px_rgba(0,0,0,0.08),_0_4px_12px_rgba(0,0,0,0.16)]  p-[16px] lg:p-14 rounded-lg dark:bg-[#2b2838]`}
        >
          <div className=''>
            <h4 className='text-[28px] font-title text-[#f66962] mb-6'>Mục tiêu khóa học</h4>
            <Form layout='vertical' onFinish={onsubmit}>
              <Form.Item
                label={
                  <span className='text-[#685f78] dark:text-[#b9b7c0] text-[16px] font-subtitle'>
                    Học viên sẽ nhận được gì sau khi hoàn thành khóa học của bạn ?
                  </span>
                }
                className='mb-8'
              >
                {requiments.map((input, index) => (
                  <div className='flex items-center justify-between w-[100%]' key={index + 1}>
                    <Input
                      // styles={{ count: { color: `${theme === 'light' ? '#6e82a3' : '#b9b7c0'}` } }}
                      // count={{ show: true, max: 160 }}
                      value={input}
                      disabled={hideCourseFunction}
                      onChange={(e) => handleInputChange('requiment', index, e.target.value)}
                      placeholder='Tiêu đề khóa học'
                      className='mt-3 w-[90%] md:w-[94%] lg:w-[94%] py-[6px] px-[16px] bg-[#fafafa] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
                      h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-transparent 
                      focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
                    />
                    {!hideCourseFunction && (
                      <Button
                      style={{background: 'transparent'}}
                      className='border-none mt-2.5 px-0 py-0 md:px-[8px] md:py-[4px] lg:px-[15px] lg:py-[4px] w-[5%] bg-transparent outline-none focus-visible:outline-none'
                      onClick={() => handleRemoveInput('requiment', index)}
                      disabled={requiments.length <= 4}
                    >
                      <Trash strokeWidth={3} color={theme === 'light' ? '#333' : '#b9b7c0'} />
                    </Button>
                    )}
                  </div>
                ))}
                {!hideCourseFunction && (<h4
                  onClick={() => handleAddInput('requiment')}
                  className='flex mt-4 items-center cursor-pointer text-[#f66962] font-subtitle hover:text-[#da554e]'
                >
                  <Plus strokeWidth={2.5} style={{ marginRight: 4 }} size={16} /> Bổ sung mục tiêu
                </h4>)}
              </Form.Item>

              {/* Lợi ích */}
              <Form.Item
                label={
                  <span className='text-[#685f78] dark:text-[#b9b7c0] text-[16px] font-subtitle'>
                    Yêu cầu khi tham gia khóa học ?
                  </span>
                }
                className='mb-8'
              >
                {benefits.map((input, index) => (
                  <div className='flex items-center justify-between w-[100%]' key={index + 1}>
                    <Input
                      // styles={{ count: { color: `${theme === 'light' ? '#6e82a3' : '#b9b7c0'}` } }}
                      // count={{ show: true, max: 160 }}
                      value={input}
                      disabled={hideCourseFunction}
                      onChange={(e) => handleInputChange('benefit', index, e.target.value)}
                      placeholder='Tiêu đề khóa học'
                      className='mt-3 w-[90%] md:w-[94%] lg:w-[94%] py-[6px] px-[16px] bg-[#fafafa] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
                      h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-transparent 
                      focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
                    />
                    {!hideCourseFunction && (
                      <Button
                      style={{background: 'transparent'}}
                      className='border-none mt-2.5 px-0 py-0 lg:px-[15px] lg:py-[4px] w-[5%] bg-transparent outline-none focus-visible:outline-none'
                      onClick={() => handleRemoveInput('benefit', index)}
                      disabled={benefits.length <= 4}
                    >
                      <Trash strokeWidth={3} color={theme === 'light' ? '#333' : '#b9b7c0'} />
                    </Button>
                    )}
                  </div>
                ))}
                {!hideCourseFunction && (<h4
                  onClick={() => handleAddInput('benefit')}
                  className='flex mt-4 items-center cursor-pointer text-[#f66962] font-subtitle hover:text-[#da554e]'
                >
                  <Plus strokeWidth={2.5} style={{ marginRight: 4 }} size={16} /> Bổ sung mục tiêu
                </h4>)}
              </Form.Item>

              {!hideCourseFunction && (
              <div className="flex justify-end">
              <Button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{border: '2px solid #ff5364', color: `${isHovered === false ? '#fff' : '#ff5364'}` }}
                onClick={() => onsubmit()}
                htmlType='submit'
                className='w-full md:w-[180px] lg:w-[180px] font-title bg-[#ff5364] text-[#fff] p-5 rounded-lg hover:bg-transparent'
                disabled={loading}
              >
                {loading ? <LoadingOutlined /> : 'Lưu'}
              </Button>
              </div>)}
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Targets
