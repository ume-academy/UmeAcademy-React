import Loading from '@/components/client/commonComponents/Loading/Loading'
import { routerConfigAdmin } from '@/constants/admin'
import { smoothScrollToTop } from '@/constants/utils'
import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext'
import useLoading from '@/hooks/useLoading'
import { TCourseDetail } from '@/interfaces/TCourseDetail'
import { TTarget } from '@/interfaces/TTarget'
import { useUpdateTargetMutation } from '@/redux/slices/target/targetApiSlice'
import { LoadingOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { Plus, Trash } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

const Targets = ({ courseData, isLoading, isRefetch }: { courseData: TCourseDetail, isLoading: boolean, isRefetch: () => void }) => {
  const { theme } = useContext(ThemeContext) as ThemeContextType
  const { loading, startLoading, stopLoading } = useLoading()
  const [isHovered, setIsHovered] = useState(false)
  const [form] = Form.useForm()
  const { id } = useParams()
  const [updateTarget] = useUpdateTargetMutation()
  // Sử dụng hook để thông tin vị trí của route hiện tại render component cho phù hợp
  const location = useLocation()
  const hideCourseFunction = routerConfigAdmin.hideCourseFunction.some((route) => {
    const regex = new RegExp(`^${route.replace(':id', '[^/]+')}$`)
    return regex.test(location.pathname)
  })

  useEffect(() => {
    if (courseData.course_requirement) {
      form.setFieldsValue({
        course_requirement: courseData.course_requirement, // Cập nhật giá trị cho Form.List
        course_learning_benefit: courseData.course_learning_benefit
      })
    }
  }, [courseData, form])

  const onsubmit = async (data: TTarget) => {
    try {
      startLoading()
      if (id) {
        const payload = {
          ...data,
          id: parseInt(id)
        }
        await updateTarget(payload).unwrap()
        isRefetch()
        smoothScrollToTop()
        message.success('Cập nhật mục tiêu khóa học thành công')
        stopLoading()
      }
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại')
      console.log(error)
      stopLoading()
    }
  }
  
  return (
    <div>
      {isLoading ? ( <div className="min-h-screen flex justify-center items-center"><Loading /></div>
        ) : (
      <div className='px-[16px] lg:px-0'>
        <div
          className={`bg-[#fff] shadow-[0_2px_4px_rgba(0,0,0,0.08),_0_4px_12px_rgba(0,0,0,0.16)]  p-[16px] lg:p-14 rounded-lg dark:bg-[#2b2838]`}
        >
          <div className=''>
            <h4 className='text-[28px] font-title text-[#f66962] mb-6'>Mục tiêu khóa học</h4>
            <Form
              layout='vertical'
              form={form}
              onFinish={onsubmit}
              initialValues={{
                course_requirement: courseData.course_requirement || ['', '', '', ''],
                course_learning_benefit: courseData.course_requirement || ['', '', '', '']
              }}
            >
              <Form.Item
                label={
                  <span className='text-[#685f78] dark:text-[#b9b7c0] text-[16px] font-subtitle'>
                    Yêu cầu khi tham gia khóa học?
                  </span>
                }
                name={'course_requirement'}
                className='mb-8'
              >
                <Form.List name='course_requirement'>
                  {(fields, { add, remove }) => (
                    <div>
                      {fields.map((field) => (
                        <Form.Item
                          key={field.key}
                          name={[field.name]}
                          validateTrigger='onChange'
                          rules={[{ required: true, message: 'Không được bỏ trống' }]}
                        >
                          <div className='flex items-center justify-between w-[100%]'>
                            <Input
                              value={form.getFieldValue(['course_requirement', field.name])}
                              // onChange={(e) => {
                              //   // Lấy tất cả các giá trị hiện tại của 'course_requirement'
                              //   const updatedValue = form.getFieldValue('course_requirement')

                              //   // Cập nhật giá trị tại vị trí tương ứng với field.name
                              //   updatedValue[field.name] = e.target.value

                              //   // Thiết lập lại giá trị cho 'course_requirement'
                              //   form.setFieldsValue({ course_requirement: updatedValue })
                              // }}
                              disabled={hideCourseFunction}
                              placeholder='Lợi ích khi tham gia'
                              className='w-[90%] md:w-[94%] lg:w-[94%] py-[6px] px-[16px] bg-[#fafafa] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
                                  h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-transparent 
                                  focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
                            />
                            {!hideCourseFunction && (
                              <Button
                                style={{ background: 'transparent' }}
                                className={`${field.key < 4 ? 'cursor-not-allowed' : 'cursor-pointer'} border-none mt-2.5 px-0 py-0 md:px-[8px] md:py-[4px] lg:px-[15px] lg:py-[4px] w-[5%] bg-transparent outline-none focus-visible:outline-none`}
                                onClick={() => {
                                  if (field.key < 4) return
                                  remove(field.key)
                                }}
                              >
                                <Trash strokeWidth={3} color={theme === 'light' ? '#333' : '#b9b7c0'} />
                              </Button>
                            )}
                          </div>
                        </Form.Item>
                      ))}
                      {!hideCourseFunction && (
                        <h4
                          onClick={() => add('')}
                          className='flex mt-4 items-center cursor-pointer text-[#f66962] font-subtitle hover:text-[#da554e]'
                        >
                          <Plus strokeWidth={2.5} style={{ marginRight: 4 }} size={16} /> Bổ sung mục tiêu
                        </h4>
                      )}
                    </div>
                  )}
                </Form.List>
              </Form.Item>

              {/* Lợi ích */}
              <Form.Item
                label={
                  <span className='text-[#685f78] dark:text-[#b9b7c0] text-[16px] font-subtitle'>
                    Nhận được gì sau khi hoàn thành khóa học?
                  </span>
                }
                name={'course_learning_benefit'}
                className='mb-8'
              >
                <Form.List name='course_learning_benefit'>
                  {(fields, { add, remove }) => (
                    <div>
                      {fields.map((field, index) => (
                        <Form.Item
                          key={field.key}
                          name={[field.name]}
                          validateTrigger='onChange'
                          rules={[{ required: true, message: 'Không được bỏ trống' }]}
                        >
                          <div className='flex items-center justify-between w-[100%]'>
                            <Input
                              value={form.getFieldValue(['course_learning_benefit', field.name])}
                              disabled={hideCourseFunction}
                              placeholder='Yêu cầu khi tham gia'
                              className='w-[90%] md:w-[94%] lg:w-[94%] py-[6px] px-[16px] bg-[#fafafa] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
                                  h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-transparent 
                                  focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
                            />
                            {!hideCourseFunction && (
                              <Button
                                style={{ background: 'transparent' }}
                                className={`${index < 4 ? 'cursor-not-allowed' : 'cursor-pointer'} border-none mt-2.5 px-0 py-0 md:px-[8px] md:py-[4px] lg:px-[15px] lg:py-[4px] w-[5%] bg-transparent outline-none focus-visible:outline-none`}
                                onClick={() => {
                                  if (index < 4) return
                                  remove(index)
                                }}
                              >
                                <Trash strokeWidth={3} color={theme === 'light' ? '#333' : '#b9b7c0'} />
                              </Button>
                            )}
                          </div>
                        </Form.Item>
                      ))}
                      {!hideCourseFunction && (
                        <h4
                          onClick={() => add('')}
                          className='flex mt-4 items-center cursor-pointer text-[#f66962] font-subtitle hover:text-[#da554e]'
                        >
                          <Plus strokeWidth={2.5} style={{ marginRight: 4 }} size={16} /> Bổ sung yêu cầu
                        </h4>
                      )}
                    </div>
                  )}
                </Form.List>
              </Form.Item>

              {!hideCourseFunction && (
                <div className='flex justify-end'>
                  <Button
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{ border: '2px solid #ff5364', color: `${isHovered === false ? '#fff' : '#ff5364'}` }}
                    htmlType='submit'
                    className='w-full md:w-[180px] lg:w-[180px] font-title bg-[#ff5364] text-[#fff] p-5 rounded-lg hover:bg-transparent'
                    disabled={loading}
                  >
                    {loading ? <LoadingOutlined /> : 'Lưu'}
                  </Button>
                </div>
              )}
            </Form>
          </div>
        </div>
      </div>
        )}
    </div>
  )
}

export default Targets
