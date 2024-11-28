import { getTitleTab, logo } from '@/constants/client'
import { ModeUserContext, ModeUserType } from '@/contexts/ModeUser'
import { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const Forbidden = () => {
  const { mode } = useContext(ModeUserContext) as ModeUserType

  return (
    <div className={`w-full h-screen p-6 md:p-0 ${`bg-[url("/assets/images/client/homeBGR/banner.png")] bg-cover bg-center`}`}>
      <Helmet>
        <title>{getTitleTab('Lỗi 403 - Truy cập bị từ chối')}</title>
      </Helmet>
      {/* <div
        className={`pt-4 md:pt-28 lg:pt-8 flex flex-col items-center justify-center text-center bg-no-repeat bg-[url("/assets/images/client/homeBGR/course-bg.png")]`}
      > */}
        <div
        className={` h-full flex flex-col items-center justify-center text-center bg-no-repeat bg-[url("/assets/images/client/homeBGR/course-bg.png")]`}
      >
        <Link to={mode === 'student' ? '/' : '/'}>
          <img src={logo} alt='' className='w-52 md:w-72 mb-10' />
        </Link>

        {/* <img src={imgNF} alt='' className='w-[333px] md:w-[550px] mb-10' /> */}

        <div className="mb-10 text-[42px] md:text-[62px] lg:text-[100px] text-[#ed4e37] font-title">
          403 - Forbidden
        </div>

        <p className='text-[#ed4e37] text-4xl mb-2'>Opps! Lỗi 403</p>
        <p className='mb-10 font-sans'>Rất tiếc, bạn không có quyền truy cập vào tài nguyên này!</p>
        <Link to={mode === 'student' ? '/' : '/'}>
          <button className='px-9 py-3 rounded-full bg-[#ed4e37] text-white border hover:text-[#ed4e37] hover:border-[#d93a2a] hover:bg-white transition'>
            Quay lại trang chủ
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Forbidden
