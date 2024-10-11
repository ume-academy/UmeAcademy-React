import { Helmet } from "react-helmet"
import { getTitleTab } from '@/contants/client';
import { Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const New_Instructor = () => {
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

  return <div>
          <Helmet>
            <title>{getTitleTab('Trở thành giảng viên')}</title>
          </Helmet>
          <div className="grid grid-cols-[1fr_1fr]">
            <div className="max-w-[400px] mt-8">
              <h1 className="font-title text-[42px] leading-[60px] mb-6 dark:text-[#b9b7c0]">Tham gia giảng dạy cùng chúng tôi</h1>
              <h5 className="font-desc text-[16px] mb-10 text-[#685f78]">Chung tay đóng góp kiến thức để thay đổi cuộc sống của mọi người. Hãy cùng chia sẻ những kiến thức quý giá và góp phần giúp cộng đồng tiếp cận được những kỹ năng mới. Sự tham gia của bạn sẽ tạo ra những tác động tích cực lâu dài cho xã hội.</h5>
              {/* <h5 className="mb-4">Học - học nữa - học mãi</h5> */}
              <button 
                  className="bg-[#ff5364] text-[#fff] w-full rounded-lg py-2 border-[2px] border-transparent 
                  hover:bg-transparent hover:border-[#ff5364] hover:text-[#ff5364]" onClick={() => handleClick()} disabled={loading}>
                    {loading ? <LoadingOutlined style={{fontSize:18}} /> : 'Bắt đầu'}
              </button>
            </div>
            <div className="">
              <img className="transform scale-x-[-1]" src="https://dreamslms.dreamstechnologies.com/html/assets/img/share.png" alt="" />
            </div>
          </div>
        </div>
}

export default New_Instructor
