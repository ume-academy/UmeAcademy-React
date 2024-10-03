// img
import { useEffect, useState } from 'react';

// css
import styles from '../auth.module.scss';

//
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { imgCarousel, getTitleTab, logo } from '../../../contants/client';




const ForgotPassword = () => {
    const [index, setIndex] = useState(0)

    const dataCarousel = [
        {
            id: 1,
            path: imgCarousel,
            title: 'Chào mừng bạn đến với UmeAcademy',
            description: 'Hãy đăng ký tài khoản để trải nghiệm những khóa học tốt nhất'
        },
        {
            id: 2,
            path: imgCarousel,
            title: 'Đăng ký ngay hôm nay',
            description: 'Để nhận những thông báo mới nhất từ chúng tôi'

        },
        {
            id: 3,
            path: imgCarousel,
            title: 'Với +2000 bài học ở mọi lĩnh vực',
            description: 'Cùng UmeAcademy, chinh phục tri thức, xây dựng tương lai'
        },
    ];

    const next = () => {
        if (index === dataCarousel.length - 1) {
            setIndex(0); // Nếu đã đến cuối mảng, quay lại chỉ số 0
        } else {
            setIndex(index + 1); // Nếu chưa đến cuối mảng, tăng chỉ số thêm 1
        }

        // alert(index)
    }

    // const prev = () => {
    //     if (index === 0) {
    //         setIndex(dataCarousel.length - 1); // index = 0 => set index = độ dài mảng
    //     } else {
    //         setIndex(index - 1); // Nếu không, giảm chỉ số đi 1
    //     }
    // }

    useEffect(() => {
        const interval = setInterval(() => {
            next();
        }, 4000); // Chuyển ảnh sau 2s

        return () => {
            clearInterval(interval); // Clear interval khi component bị hủy
        };
    }, [index]);

    return (
        <>
            <Helmet>
                <title>{getTitleTab('Đăng nhập')}</title>
            </Helmet>

            <div className={`${styles['parent']} flex `}>
                <div
                    className={`${styles['left']} dark:bg-[#131022] dark:bg-none dark:text-[#B9B7C0] flex flex-col space-y-4 justify-between`}
                >
                    <img src={dataCarousel[index].path} alt="" />

                    <div className="text-center">
                        <h1 className='text-2xl font-title'>{dataCarousel[index].title}</h1>
                        <p className='text-md dark:text-[#B9B7C0] text-[#22100d]'>{dataCarousel[index].description}</p>
                    </div>
                </div>

                <div className={`${styles['right']} dark:text-[#B9B7C0] dark:bg-[#2b2838]  bg-[#fff]`}>
                    <div className={`${styles['top']} p-20 space-y-6`}>
                        <div className={`${styles['heading']} flex justify-between items-center`}>
                            <div className={`${styles['logo']} text-3xl font-title`}>
                                <Link to={'/'}>
                                    <img src={logo} alt="" width={150} />
                                </Link>
                            </div>

                            <div className="">
                                <Link to={'/'} className='underline text-gray-400'>Quay lại trang chủ</Link>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="title">
                                <h1 className='text-2xl'>Quên mật khẩu?</h1>
                            </div>

                            <form className={`${styles['form']} space-y-7`}>
                                <p>Nhập Email của bạn để tạo lại mật khẩu mới.</p>
                                <div className={`${styles['formGroup']} space-y-2`}>
                                    <label>Email <span className='text-red-500'>*</span></label>
                                    <input
                                        className={`${styles['input']} py-3 px-3 dark:text-[#fff] dark:bg-[#3b3a43] rounded-md`}
                                        placeholder='Địa chỉ email'
                                    />
                                </div>                          

                                <div className={`${styles['formGroup']} space-y-2`}>
                                    <button className={`${styles['btn']} font-subtitle text-lg text-white py-6 mt-6 rounded-md`}>Xác nhận</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ForgotPassword