import Loading from '@/components/client/commonComponents/Loading/Loading'
import { getTitleTab } from '@/constants/client'
import { TInfoWithdraw } from '@/interfaces/TInfoWithdraw'
import {
  useAddWithdrawMutation,
  useEditWithdrawMutation,
  useGetAllBankQuery,
  useGetInfoWithdrawQuery
} from '@/redux/slices/teacher/withdraw/withdrawApiSlice'
import { Form, Input, message, TreeSelect } from 'antd'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

const CustomTreeSelect = styled(TreeSelect)`
  .ant-select-selector {
    background-color: #fafafa !important;
    border: 1px solid #c1c9d2 !important;
    box-shadow: none !important;
  }
  .dark & .ant-select-selector {
    background-color: #131022 !important;
    border: 1px solid #c7c7c740 !important;
  }
  .ant-select-selector .ant-select-selection-placeholder {
    color: #6e82a3 !important;
  }
  .dark & .ant-select-selector .ant-select-selection-placeholder {
    color: #e9ecef !important;
  }
`

const Withdrawal_Methods = () => {
  const { data: banks } = useGetAllBankQuery({})
  const { data: info, isFetching, isLoading } = useGetInfoWithdrawQuery({})
  const [addWithdraw] = useAddWithdrawMutation()
  const [editWithdraw] = useEditWithdrawMutation()
  const [form] = Form.useForm()
  const [isFormVisible, setIsFormVisible] = useState(false)

  useEffect(() => {
    if (info) {
      form.setFieldValue('name_bank', info.name_bank || '')
      form.setFieldValue('name_account', info.name_account || '')
      form.setFieldValue('number_account', info.number_account || '')
    }
  }, [info, form])

  const onFinish = async (withdraw: TInfoWithdraw) => {
    try {
      if (info) {
        const res = await editWithdraw({
          id: info.id,
          info: withdraw
        })
        if (res.data) {
          message.success('cập nhật phương thức rút tiền thành công')
        } else message.error('cập nhật phương thức rút tiền thất bại')
      } else {
        const res = await addWithdraw(withdraw)
        if (res.data) {
          message.success('Thêm mới phương thức rút tiền thành công')
        } else message.error('Thêm mới phương thức rút tiền thất bại')
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading || isFetching)
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <Loading />
      </div>
    )

  const toggleForm = () => {
    setIsFormVisible((prevState) => !prevState)
  }

  return (
    <div className='p-4 lg:p-0'>
      <Helmet>
        <title>{getTitleTab('Phương thức rút tiền')}</title>
      </Helmet>
      <div className='border border-[#e9ecef] rounded-lg dark:border-transparent  text-[#685f78] dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white  p-4 lg:p-0'>
        <div className='border-b  dark:border-b-[#5a5a5a] border-b-[#e9ecef]  font-title text-2xl p-6'>
          <h3>Phương thức rút tiền</h3>
        </div>

        <div className='p-6'>
          <div className='dark:text-[#b9b7c0] text-[#685f78] font-subtitle text-md pb-6'>
            <h5>{info ? 'Thông tin tài khoản ngân hàng' : ''}</h5>
          </div>

          {!info && !isFormVisible && (
            <div className='flex justify-center items-center text-center min-h-[400px] dark:text-[#B9B7C0]'>
              <div>
                <p>Bạn muốn rút tiền khỏi ví UME, hãy thêm mới tài khoản ngân hàng</p>
                <button
                  className='py-2 px-4 w-full md:w-auto mt-4 text-white  bg-[#f84563]  rounded-md  border  border-transparent  hover:border-[#f84563]  hover:bg-white  hover:text-[#f84563] dark:hover:bg-[#efeff2] dark:hover:text-[#b9b7c0]'
                  onClick={toggleForm}
                >
                  Thêm tài khoản ngân hàng
                </button>
              </div>
            </div>
          )}

          {(info || isFormVisible) && (
            <Form
              form={form}
              layout='vertical'
              className=''
              initialValues={{
                name_bank: info?.name_bank || '',
                name_account: info?.name_account || '',
                number_account: info?.number_account || ''
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name='name_bank'
                label={<span className='dark:text-[#b9b7c0] text-[#685f78]'>Ngân hàng hưởng thụ</span>}
                rules={[{ required: true, message: 'Vui lòng chọn ngân hàng' }]}
              >
                <CustomTreeSelect
                  className='h-12'
                  treeDefaultExpandAll
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  allowClear
                >
                  <TreeSelect.TreeNode value='' title='Chọn ngân hàng' />
                  {banks && banks.map((bank) => <TreeSelect.TreeNode key={bank} value={bank} title={bank} />)}
                </CustomTreeSelect>
              </Form.Item>

              <Form.Item
                name='name_account'
                label={<span className='dark:text-[#b9b7c0] text-[#685f78]'>Tên tài khoản</span>}
                rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản' }]}
              >
                <Input placeholder='Nhập tên tài khoản' id='name_account' className='p-3' />
              </Form.Item>

              <Form.Item
                name='number_account'
                label={<span className='dark:text-[#b9b7c0] text-[#685f78]'>Số tài khoản</span>}
                rules={[{ required: true, message: 'Vui lòng nhập số tài khoản' }]}
              >
                <Input id='number_account' placeholder='Nhập số tài khoản' className='p-3' />
              </Form.Item>

              <Form.Item>
                <button
                  type='submit'
                  className='py-2 px-4 w-full md:w-[20%] mt-4 text-white  bg-[#f84563]  rounded-md  border  border-transparent  hover:border-[#f84563]  hover:bg-white  hover:text-[#f84563] dark:hover:bg-[#efeff2] dark:hover:text-[#b9b7c0]'
                >
                  {info ? 'Cập nhật' : 'Lưu mới'}
                </button>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Withdrawal_Methods
