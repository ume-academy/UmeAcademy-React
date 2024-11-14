// img
import { useEffect, useState } from 'react'

// css
import styles from '../auth.module.scss'

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { imgCarousel, getTitleTab, logo } from '../../../constants/client'
import { FacebookFilled, GoogleCircleFilled } from '@ant-design/icons'

const Register = () => {
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
    }
  ]

  const next = () => {
    if (index === dataCarousel.length - 1) {
      setIndex(0) // Nếu đã đến cuối mảng, quay lại chỉ số 0
    } else {
      setIndex(index + 1) // Nếu chưa đến cuối mảng, tăng chỉ số thêm 1
    }

    // alert(index)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      next()
    }, 4000) // Chuyển ảnh sau 2s

    return () => {
      clearInterval(interval) // Clear interval khi component bị hủy
    }
  }, [index])

  return (
    <>
      <Helmet>
        <title>{getTitleTab('Đăng ký')}</title>
      </Helmet>

      <div className={`${styles['parent']} flex items-stretch `}>
        <div className="hidden md:block flex-1">
          <div
            className={`${styles['left']} dark:bg-[#131022] dark:bg-none dark:text-[#B9B7C0] flex flex-col space-y-4 justify-between`}
          >
            <img src={dataCarousel[index].path} alt='' />

            <div className='text-center'>
              <h1 className='text-2xl font-title'>{dataCarousel[index].title}</h1>
              <p className='text-md dark:text-[#B9B7C0] text-[#22100d]'>{dataCarousel[index].description}</p>
            </div>
          </div>
        </div>

        <div className={`${styles['right']} dark:text-[#B9B7C0] dark:bg-[#2b2838]  bg-[#fff]`}>
          <div
            className={`${styles['top']} 
            p-5 
            md:p-10 
            lg:p-10
            xl:p-20 
            space-y-6
          `}
          >
            <div className={`${styles['heading']} flex justify-between items-center`}>
              <div className={`${styles['logo']} text-3xl font-title`}>
                <Link to={'/'}>
                  <img src={logo} alt='' width={150} />
                </Link>
              </div>

              <div className=''>
                <Link to={'/'} className='underline text-gray-400'>
                  Quay lại trang chủ
                </Link>
              </div>
            </div>

            <div className='space-y-6'>
              <div className='title'>
                <h1 className='text-2xl'>Đăng ký</h1>
              </div>

              <form className={`${styles['form']} space-y-7`}>
                <div className={`${styles['formGroup']} space-y-2`}>
                  <label>
                    Tên hiển thị <span className='text-red-500'>*</span>
                  </label>
                  <input
                    className={`${styles['input']} py-3 px-3 dark:text-[#fff] dark:bg-[#3b3a43] rounded-md`}
                    placeholder='Điền tên hiển thị'
                  />
                </div>

                <div className={`${styles['formGroup']} space-y-2`}>
                  <label>
                    Email <span className='text-red-500'>*</span>
                  </label>
                  <input
                    className={`${styles['input']} py-3 px-3 dark:text-[#fff] dark:bg-[#3b3a43] rounded-md`}
                    placeholder='Địa chỉ email'
                  />
                </div>

                <div className={`${styles['formGroup']} space-y-2`}>
                  <label>
                    Mật khẩu <span className='text-red-500'>*</span>
                  </label>
                  <input
                    className={`${styles['input']} py-3 px-3 dark:text-[#fff] dark:bg-[#3b3a43] rounded-md`}
                    placeholder='Nhập mật khẩu'
                  />
                </div>

                <div className={`${styles['formGroup']} space-y-2`}>
                  <button className={`${styles['btn']} font-subtitle text-lg text-white py-6 mt-6 rounded-md`}>
                    Đăng ký
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Register with other way */}
          <div
            className={`${styles['others']} dark:bg-[#5C505B] bg-[#FFF5F4] flex flex-col items-center space-y-6 p-5`}
          >
            <div className='title text-center'>
              <p>Hoặc đăng nhập bằng</p>
            </div>

            <div className='act flex flex-col md:flex-row items-center gap-6'>
              <div className='text-md text-center flex items-center gap-3'>
                <GoogleCircleFilled className='text-3xl' />
                <Link to={''}>Đăng nhập bằng Google</Link>

              </div>

              <div className='hidden md:block mx-6 '>|</div>

              <div className='text-md text-center flex items-center gap-3'>
                <FacebookFilled className='text-3xl' />
                <Link to={''}>Đăng nhập bằng Facebook</Link>

              </div>
            </div>

            <div className=''>
              <p>
                Đã có tài khoản? Đăng nhập ngay{' '}
                <Link to={'/login'} className='font-subtitle text-[#FF875A]'>
                  tại đây
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
