import { HandCoins, Star, Users } from "lucide-react";
import Chart from "./Chart";
import Courses_Top from "./Courses_Top";
import { getTitleTab } from "@/contants/client";
import { Helmet } from "react-helmet";
import './DatePickerAntd.scss'
const Revenue = () => {
  return (
    <div className="text-[16px]">
      <Helmet>
        <title>{getTitleTab('Doanh thu')}</title>
      </Helmet>
      <div className=" border rounded-lg dark:border-[#5a5a5a]  text-[#685f78] dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white">
        <div className="border-b  dark:border-[#5a5a5a]">
          <p className="p-6 text-[#2b2838] dark:text-gray-200 text-2xl font-title">
            Thu Nhập
          </p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className=" p-6 space-y-2 rounded-lg border dark:border-[#5a5a5a] ">
            <div className="flex justify-between">
              <h3 className="">Doanh thu</h3>
              <HandCoins className="w-8 h-8  text-[#f24f3a]" /></div>
            <h1 className="text-2xl font-bold text-[#2b2838] dark:text-gray-200">40.000.000đ</h1>
            <p className="">Kiếm tiền trong tháng này</p>
          </div>

          <div className=" p-6 space-y-2 rounded-lg border dark:border-[#5a5a5a] ">
            <div className="flex justify-between">
              <h3 className="">Sinh viên</h3>
              <Users className="w-8 h-8  text-[#f24f3a]" /></div>
            <h1 className="text-2xl font-bold text-[#2b2838] dark:text-gray-200">12000</h1>
            <p className="">Sinh viên mới trong tháng này</p>
          </div>

          <div className=" p-6 space-y-2 rounded-lg border dark:border-[#5a5a5a] ">
            <div className="flex justify-between">
              <h3 className="">Xếp hạng khóa học</h3>
              <Star className="w-8 h-8  text-[#f24f3a]" /></div>
            <h1 className="text-2xl font-bold text-[#2b2838] dark:text-gray-200">4.8</h1>
            <p className="">Đánh giá tháng này</p>
          </div>
        </div>
        <Chart />
      </div>
      <Courses_Top />

    </div>
  );
};

export default Revenue;
