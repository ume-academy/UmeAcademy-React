import { Link } from 'react-router-dom'
import { routerConfig } from '../../../../../contants/client'
import Card from '../../../Card/Card'
import { easeInOut, motion, useInView } from 'framer-motion';
import { useRef } from 'react';


const FeaturedCourses = () => {
    const transperentFeaturedCourses = routerConfig.transparentHeader.includes(location.pathname)

    // Tạo ref cho từng khối (ref: tro tới phần tử dom mà được gọi và render)
    const topRef = useRef(null)
    const middleRef = useRef(null)
    const bottomRef = useRef(null)

    // Theo dõi theo từng khối ref để tạo hiệu ứng cho nó 
    const isTopInView = useInView(topRef, { amount: 0.1, once:true }) //amount: % phần tử khi di chuyển đến sẽ xuất hiện | once: không lặp lại
    const isMiddleInView = useInView(middleRef, { amount: 0.1, once:true })
    const isBottomInView = useInView(bottomRef, { amount: 0.05, once:true })


    return (
        <div className=''>
            <div className={`min-h-[100vh] pb-[80px] ${
                transperentFeaturedCourses && `bg-[url("./src/assets/images/client/homeBGR/banner.png")] bg-cover bg-center`
                } dark:bg-[#131022] dark:bg-none`}>
                <div className={`min-h-[100vh] bg-no-repeat bg-[url("./src/assets/images/client/homeBGR/course-bg.png")]`} 
                >
                    <div
                        className="w-[1296px] mx-auto pt-[80px]">
                        <motion.div 
                            initial={{ y: 100, opacity: 0 }}
                            animate={isTopInView ? { y: 0, opacity: 100 } : {}}
                            transition={{ duration: 1, ease: easeInOut }}
                            ref={topRef}
                            className="flex justify-between items-center mb-[18px]">
                            <div className="">
                                <p className='text-[#f66962] mb-[18px] text-[18px] font-subtitle'>Có gì HOT ?</p>
                                <h1 className='dark:text-[#B9B7C0] text-[#0b0b0b] text-[36px] font-title'>Các khóa học nổi bật</h1>
                            </div>
                            <Link to={``} className="mr-[20px] border-[2px] min-w-[140px] transition-all duration-300 ease-in-out dark:text-[#b9b7c0] flex justify-center items-center rounded-3xl border-[#b4a7f5] text-[#392c7d] px-[15px] py-[10px] hover:bg-[#917cf6] hover:border-transparent dark:hover:text-[#fff] hover:text-[#fff]">Tất cả các khóa học</Link>
                        </motion.div>
                        <motion.p 
                            initial={{y: 100, opacity: 0}}
                            animate={isMiddleInView ? { y: 0, opacity: 100 } : {}}
                            transition={{ duration: 1, ease: easeInOut }}
                            ref={middleRef}
                            className='max-w-[700px] text-[#685f78] dark:text-[#B9B7C0] mb-[57px]'>Khám phá những khóa học hàng đầu giúp bạn phát triển kỹ năng và kiến thức cần thiết cho sự nghiệp. Tham gia ngay để tiếp cận nội dung học tập chất lượng cao, được thiết kế bởi các chuyên gia hàng đầu trong lĩnh vực của họ. Hãy sẵn sàng bước vào hành trình mới và mở rộng tầm nhìn của bạn!
                        </motion.p>
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={isBottomInView ? { y: 0, opacity: 100 } : {}}
                            transition={{ duration: 1, ease: easeInOut }}
                            ref={bottomRef} className="grid grid-cols-4 gap-7">
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedCourses
