import { useGetCommissionRateQuery, useUpdateCommissionRateMutation } from "@/redux/slices/commission_rate/commissionRateApiSlice";
import { Button, Form, Input, message } from "antd";
import './commissionRateAntd.scss';
import useLoading from "@/hooks/useLoading";
import { useEffect } from "react";

const Commission_Rate = () => {

  const { data: rateCommission, isFetching, isError, error } = useGetCommissionRateQuery('1');
  
  // console.log(rateCommission)

  const [mutation] = useUpdateCommissionRateMutation();

  const {loading, startLoading, stopLoading} = useLoading();

  // console.log(loading);

  const [form] = Form.useForm();

  useEffect(() => {
    if (rateCommission) {
      form.setFieldsValue(rateCommission);
    }
  }, [rateCommission, form])

  const onFinish = async (values: any) => {

    if(!values) return;

    try {
      startLoading();
      const res = await mutation({ feeId: '1', ...values }).unwrap();

      message.success(res?.message);
      stopLoading();
      

    } catch (error: any) {
      console.log(error);

      if(error.status === 500) return (
        stopLoading(),
        message.error(`Cập nhật tỷ lệ hoa hồng thất bại!`)
      )
    }

  };

  return (
    <>
      <div className="p-4 dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg">
        <div className="heading flex justify-between items-center pb-4">
          <h5 className='font-title text-xl'>
            Cập nhật tỷ lệ hoa hồng
          </h5>
        </div>

        <div className="content">
          <Form
            layout='vertical'
            form={form}
            onFinish={onFinish}
            style={{ maxWidth: '100%' }}
          // className='formSubmit'
          >
            <Form.Item
              name="fee"
              label={<span className='dark:text-[#b9b7c0] text-[#685f78]'>Tỷ lệ hoa hồng (%)</span>}
              rules={[
                { required: true, message: 'Vui lòng nhập tỷ lệ!' },
                // { type: 'number', message: 'Tỷ lệ chỉ chấp nhận dữ liệu là ký tự số!' },
                // { min: 1, message: 'Tỷ lệ không được phép dưới 0!' },
                // { max: 100, message: 'Tỷ lệ không được phép lớn hơn 100!' }
              ]}
            >
              <Input type="number" className='formInput w-full p-2 dark:text-[#b9b7c0] text-[#685f78]' placeholder="%" />
            </Form.Item>

            <Form.Item>
              <Button
              loading={loading}
                htmlType='submit'
                className='
              border-none 
              px-4
              rounded-md
            bg-[#F84563] 
            text-white
            hover:bg-[#ee9aa8]
            hover:text-black
              w-[100%]
              md:w-auto'
              >
                Cập nhật tỷ lệ hoa hồng
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Commission_Rate