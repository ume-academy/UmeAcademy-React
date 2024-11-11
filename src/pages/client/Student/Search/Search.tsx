import { CardProps } from '@/components/client/commonComponents/Card/Card';
import Card_Horizontal from '@/components/client/commonComponents/Card/Card_Horizontal';
import { Checkbox, Form } from 'antd';
import { Filter } from 'lucide-react';

const Search = () => {

  //data card
  const cardData: CardProps = {
    image: 'https://i.pravatar.cc',
    title: 'Thông tin về thiết kế bằng UI/UX',
    instructorName: 'DaddyGiao',
    instructorImage: 'https://i.pravatar.cc/150',
    price: '1.000.000 đ',
    originalPrice: '9.000.000 đ',
    lessonCount: '12+ Bài học',
    duration: '9h 30p',
    rating: 5,
  };


  return (
    <div className='py-24 max-w-[1280px] mx-auto px-4 md:px-0'>
      <div className="flex flex-col md:flex-row gap-8 md:gap-6 ">
        <div className="left w-full md:w-[70%] space-y-4">
          <Card_Horizontal {...cardData} />

          <Card_Horizontal {...cardData} />

          <Card_Horizontal {...cardData} />

          <Card_Horizontal {...cardData} />

        </div>


        {/* <div className="right w-full md:w-[30%]">
          <Form
            layout="horizontal"
            className='space-y-4 md:space-y-6'
          >
            <div className="heading flex items-center gap-2">
              <Filter size={24} />
              <h5 className='font-title text-md md:text-xl'>Bộ lọc</h5>
            </div>

            <div className="p-4 border border-grey-200 rounded-md text-md md:text-lg">
              <div className="font-semibold">
                Danh mục khóa học
              </div>

              <div className="checkboxs py-4 space-y-2">
                <Form.Item name="disabled" valuePropName="backend" className='my-0'>
                  <Checkbox className='flex items-center'>Backend <span>(3)</span></Checkbox>
                </Form.Item>

                <Form.Item name="disabled" valuePropName="css">
                  <Checkbox className='flex items-center'>CSS <span>(2)</span></Checkbox>
                </Form.Item>

                <Form.Item name="disabled" valuePropName="frontend">
                  <Checkbox className='flex items-center'>Frontend <span>(3)</span></Checkbox>
                </Form.Item>

                <Form.Item name="disabled" valuePropName="general">
                  <Checkbox className='flex items-center'>General <span>(3)</span></Checkbox>
                </Form.Item>

                <Form.Item name="disabled" valuePropName="it-software">
                  <Checkbox className='flex items-center'>IT & Software <span>(3)</span></Checkbox>
                </Form.Item>

                <Form.Item name="disabled" valuePropName="photography">
                  <Checkbox className='flex items-center'>Photography <span>(3)</span></Checkbox>
                </Form.Item>

                <Form.Item name="disabled" valuePropName="programming-language">
                  <Checkbox className='flex items-center'>Programming Language <span>(2)</span></Checkbox>
                </Form.Item>

                <Form.Item name="disabled" valuePropName="technology">
                  <Checkbox className='flex items-center'>Technology <span>(3)</span></Checkbox>
                </Form.Item>
              </div>
            </div>

            <div className="p-4 border border-grey-200 rounded-md text-md md:text-lg">
              <div className="font-semibold">
                Danh mục giảng viên
              </div>

              <div className="checkboxs py-4 space-y-2">
                <Form.Item name="disabled" valuePropName="keny-white" className='my-0'>
                  <Checkbox className='flex items-center'>Keny White <span>(10)</span></Checkbox>
                </Form.Item>

                <Form.Item name="disabled" valuePropName="john-doe">
                  <Checkbox className='flex items-center'>John Doe <span>(2)</span></Checkbox>
                </Form.Item>

                <Form.Item name="disabled" valuePropName="nicole-brown">
                  <Checkbox className='flex items-center'>Nicole Brown <span>(3)</span></Checkbox>
                </Form.Item>

                <Form.Item name="disabled" valuePropName="hinata-hyuga">
                  <Checkbox className='flex items-center'>Hinata Hyuga <span>(3)</span></Checkbox>
                </Form.Item>
              </div>
            </div>

            <div className="p-4 border border-grey-200 rounded-md text-md md:text-lg">
              <div className="font-semibold">
                Giá tiền
              </div>

              <div className="checkboxs py-4 space-y-2">
                <Form.Item name="disabled" valuePropName="all" className='my-0'>
                  <Checkbox className='flex items-center'>All <span>(18)</span></Checkbox>
                </Form.Item>

                <Form.Item name="disabled" valuePropName="paid">
                  <Checkbox className='flex items-center'>Paid <span>(6)</span></Checkbox>
                </Form.Item>

                <Form.Item name="disabled" valuePropName="free">
                  <Checkbox className='flex items-center'>Free <span>(3)</span></Checkbox>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div> */}
      </div>
    </div>
  )
}

export default Search