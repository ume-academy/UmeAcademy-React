import { LoadingOutlined } from '@ant-design/icons';
import { DatePicker, Input, message } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

type CourseData = {
  course: string;
  students: number;
  revenue: number;
  createdAt: string;
};

const data: CourseData[] = [
  {
      course: 'Khóa học A',
      students: 30,
      revenue: 30000,
      createdAt: '2024-10-15'
  },
  {
      course: 'Khóa học B',
      students: 50,
      revenue: 50000,
      createdAt: '2024-02-10'
  },
  {
      course: 'Khóa học C',
      students: 40,
      revenue: 42010,
      createdAt: '2024-03-05'
  },
  {
      course: 'Khóa học D',
      students: 60,
      revenue: 100000,
      createdAt: '2024-04-20'
  },
  {
      course: 'Khóa học E',
      students: 20,
      revenue: 20000,
      createdAt: '2024-09-30'
  },
  {
      course: 'Khóa học R',
      students: 20,
      revenue: 20000,
      createdAt: '2023-09-30'
  },
];

const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

const Voucher = () => {
  const {id} = useParams()
  const [loading, setLoading] = useState(false)

  // bắt đầu date
  const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);

    const handleFilter = (): CourseData[] => {
        const start = startDate ? startDate.format('YYYY-MM-DD') : null;
        const end = endDate ? endDate.format('YYYY-MM-DD') : null;

        return data
            .filter(item => {
                const createdAt = item.createdAt;
                const isAfterStart = start ? createdAt >= start : true;
                const isBeforeEnd = end ? createdAt <= end : true;
                return isAfterStart && isBeforeEnd;
            })
            .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    };
    // Kết thúc date
    
  const handleClick = () => {
    setLoading(true)
    // Giả lập quá trình chờ dữ liệu tải
    setTimeout(() => {
      setLoading(false)
        message.success(id ? 'Cập nhật công' : 'Thêm thành công')
    }, 2000);
  }
  return (
    // Page thêm mới voucher cho khóa học
    <div className='h-full shadow-[0_2px_4px_rgba(0,0,0,0.08),_0_4px_12px_rgba(0,0,0,0.16)] py-12 px-14 rounded-lg border-[1px] border-transparent bg-[#fff] dark:bg-[#2b2838]'>
        <h4 className='text-[28px] font-title text-[#f66962] mb-6'>Mã giảm giá (voucher)</h4>
        <div className='mb-6'>
          <label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Mã giảm giá</label>
          <Input
            type='text'
            className='mt-3 py-[6px] px-[16px] bg-[#fafafa] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
            h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
            focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
            placeholder='Vd: NPK99Z2754A'
          />
        </div>
        <div className='mb-6'>
          <label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Phần trăm muốn giảm (%)</label>
          <Input
            type='text'
            className='mt-3 py-[6px] px-[16px] bg-[#fafafa] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
            h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
            focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
            placeholder='Nhập số % muốn giảm'
          />
        </div>
        <div className='mb-6'>
          <label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Số lượng</label>
          <Input
            type='number'
            className='mt-3 py-[6px] px-[16px] bg-[#fafafa] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
            h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
            focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
            placeholder='Nhập số lượng'
          />
        </div>
        <div className="text-[14px] space-x-2 flex items-center w-[100%] mb-16">
                    <DatePicker
                        format="DD/MM/YYYY"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="w-[50%] mt-3 py-[6px] px-[16px] bg-[#fafafa] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
                        h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
                        focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]"
                        placeholder='Ngày bắt đầu '
                    />
                    <div>-</div>
                    <DatePicker
                        format="DD/MM/YYYY"
                        value={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="w-[50%] mt-3 py-[6px] px-[16px] bg-[#fafafa] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
                        h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
                        focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]"
                        placeholder='Ngày Kết thúc'
                    />
                </div>
                <div className="flex justify-end">
                <button onClick={() => handleClick()} className='w-[180px] border-[1px] font-title border-[#ff5364] bg-[#ff5364] text-[#fff] p-2.5 rounded-lg hover:bg-transparent hover:text-[#ff5364]'>
                  {loading ? <LoadingOutlined/> : 'Lưu'}
                </button>
                </div>
    </div>
  );
}

export default Voucher;
