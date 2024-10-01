import { StarFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { backgroundImageCommon, imageIntroduce, routerConfig } from '../../../../../contants/client'
import { easeInOut, motion } from 'framer-motion';

export const Introduce = () => {
    // Bật trạng thái trong suốt khi ở trang home
  const transperent = routerConfig.transparentHeader.includes(location.pathname)

  const [count, setCount] = useState(100); // Bắt đầu từ 100

  useEffect(() => {
    const target = 1000; // Mục tiêu là 1000
    const duration = 1500; // Thời gian hoàn thành (1 giây)
    const steps = 100; // Số bước
    const increment = (target - count) / steps; // Giá trị tăng mỗi bước

    const interval = setInterval(() => {
        setCount((prevCount) => {
            const newCount = prevCount + increment;
            if (newCount >= target) {
            clearInterval(interval);
            return target; // Đảm bảo dừng lại ở 1000
            }
            return Math.floor(newCount); // Làm tròn số
        });
        }, duration / steps); // Cập nhật mỗi bước

        return () => clearInterval(interval); // Dọn dẹp khi component unmount
    }, []);


    return (
        <div>
            <div 
                className={`bg-cover bg-center min-h-[100vh] ${
                transperent && `bg-[url('${backgroundImageCommon}')]`
                } dark:bg-[#131022] dark:bg-none`}
            >
                <motion.div 
                    initial={{y: 150, opacity:0}}
                    animate={{ y:0, opacity:100}}
                    transition={{duration: 1, ease: easeInOut}}
                    className="pt-[160px] w-[1296px] mx-auto grid grid-cols-2 ">
                    <div className="justify-self-start">
                        <h4 className='mb-[26px] text-[#685f78] dark:text-[#B9B7C0] text-[20px]'>UMECADEMY dẫn đầu trong học tập trực tuyến</h4>
                        <h1 className='mb-[20px] leading-[60px] text-[#22100d] dark:text-[#B9B7C0] text-[48px] max-w-[500px] font-title'>Các khóa học trực tuyến hấp dẫn và dễ tiếp cận dành cho tất cả mọi người</h1>
                        <p className='mb-[30px] text-[#685f78] dark:text-[#B9B7C0] text-[18px]'>Sở hữu tương lai của bạn bằng cách học các kỹ năng mới trực tuyến</p>
                        <p className='text-[#685f78] dark:text-[#B9B7C0] text-[20px] mb-[10px]'>Được hơn 15 nghìn người tin dùng <br /> trên cả nước kể từ năm 2024</p>
                        <div className="flex dark:text-[#B9B7C0]">
                            <h1 className='font-title text-[48px] mr-14 transition-all ease-in-out'>{Math.floor(count)}+</h1> 
                            <div className="flex items-center">
                                <h1 className='font-title text-[48px]'>4.4 </h1>
                                <div className="ml-4">
                                    <StarFilled className='text-yellow-400 mr-4 text-[20px]' />
                                    <StarFilled className='text-yellow-400 mr-4 text-[20px]' />
                                    <StarFilled className='text-yellow-400 mr-4 text-[20px]' />
                                    <StarFilled className='text-yellow-400 mr-4 text-[20px]' />
                                    <StarFilled className='text-yellow-400 mr-4 text-[20px]' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[522px] justify-self-end ">
                        <img src={imageIntroduce} alt="" />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
