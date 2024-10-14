import { Table } from 'antd';
import { Link } from 'react-router-dom';

const Courses_Top = () => {
  interface Course {
    id: number;
    course: string;
    sales: number;
    revenue: number;
    image: string;
  }

  const columns = [
    {
      title: 'Khóa học',
      dataIndex: 'course',
      key: 'course',
      render: (text: string, record: Course) => (
        <div className="flex gap-4 items-center">
          <img
            src={record.image}
            alt="Course"
            className="w-[100px] rounded-lg"
          />
          <Link to={`/courses/${record.id}`} className=" hover:text-[#f84563] text-[17px]">
            {text}
          </Link>
        </div>
      ),
      width: 600,
    },
    {
      title: 'Lượt bán',
      dataIndex: 'sales',
      key: 'sales',
      render: (sales: number) => <span>{sales}</span>,
      width: 150,
    },
    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (revenue: number) => (
        <p className='text-[16px]'>
          {revenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </p>
      ),
      width: 200,
    },
  ];

  const data: Course[] = [
    {
      id: 1,
      course: 'Xây dựng trang web đáp ứng với HTML5 và CSS3',
      sales: 35,
      revenue: 4620,
      image: 'https://i.pravatar.cc/150',
    },
    {
      id: 2,
      course: 'Các nhà phát triển C# tăng gấp đôi mã hóa của bạn với Visual Studio',
      sales: 35,
      revenue: 4620,
      image: 'https://i.pravatar.cc/151',
    },
    {
      id: 3,
      course: 'Thông tin về bảng cấp thiết kế UI / UX',
      sales: 35,
      revenue: 4620,
      image: 'https://i.pravatar.cc/152',
    },
    {
      id: 4,
      course: 'Thông tin về bảng cấp thiết kế UI / UX',
      sales: 35,
      revenue: 4620,
      image: 'https://i.pravatar.cc/152',
    },
    {
      id: 5,
      course: 'Thông tin về bảng cấp thiết kế UI / UX',
      sales: 35,
      revenue: 4620,
      image: 'https://i.pravatar.cc/152',
    },
  ];

  return (
    <div>
      <div className="mt-5 border border-[#e9ecef] rounded-lg dark:border-transparent text-[#685f78] dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white">
        <div className="border-b border-[#e9ecef] dark:border-[#5a5a5a]  ">
          <p className="p-6 dark:text-[#b9b7c0] text-[#685f78] text-2xl font-title">
            Top 5 khóa học bán chạy nhất
          </p>
        </div>
        <div className="p-6">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey="id"
            className="border dark:border-transparent rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Courses_Top;
