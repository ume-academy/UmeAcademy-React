import { DatePicker } from 'antd';
import { useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

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

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const { createdAt, students, revenue } = payload[0].payload;

        return (
            <div className="border border-[#e9ecef] dark:border-transparent  text-[#685f78] dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white p-4 rounded shadow-lg space-y-2 text-[14px]">
                <p className="border-b pb-2">{createdAt}</p>
                <p className='text-[#82ca9d]'>Sinh viên: {students} người</p>
                <p className='text-[#f24f3a]'>Doanh thu: {revenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            </div>
        );
    }

    return null;
};

const Chart = () => {
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

    const filteredData = handleFilter().map(item => ({
        ...item,
        createdAt: formatDate(item.createdAt),
    }));

    return (
        <div className="p-6">
            <div className='flex justify-between items-center mb-6 border-b dark:border-[#5a5a5a] pb-6'>
                <h2 className="text-xl font-subtitle">Biểu đồ tổng hợp theo thời gian
                </h2>
                <div className="text-[14px] space-x-2 flex items-center">
                    <DatePicker
                        format="DD/MM/YYYY"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="dark:bg-[#2b2838] bg-white"
                        placeholder='Ngày bắt đầu '
                    />
                    <div>-</div>
                    <DatePicker
                        format="DD/MM/YYYY"
                        value={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="dark:bg-[#2b2838] bg-white"
                        placeholder='Ngày Kết thúc'
                    />
                </div>
            </div>

            {filteredData.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-[300px] gap-4">
                    <p className='text-lg'>Không có dữ liệu</p>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={filteredData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="createdAt" className='text-[14px]' />
                        <YAxis className='text-[14px]' />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="linear" dataKey="students" stroke="#82ca9d" />
                        <Line type="linear" dataKey="revenue" stroke="#f24f3a" strokeWidth={4} />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default Chart;
