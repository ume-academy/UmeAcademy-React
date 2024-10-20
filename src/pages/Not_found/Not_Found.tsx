import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { imgNF, logo } from '@/contants/client'
import { ModeUserContext, ModeUserType } from '@/contexts/ModeUser'

const Not_Found = () => {
  const { mode } = useContext(ModeUserContext) as ModeUserType

  return (
    <div className={`w-full h-screen ${`bg-[url("/assets/images/client/homeBGR/banner.png")] bg-cover bg-center`}`}>
      <div
        className={`pt-8 flex flex-col items-center justify-center text-center bg-no-repeat bg-[url("/assets/images/client/homeBGR/course-bg.png")]`}
      >
        <Link to={mode === 'student' ? '/' : '/'}>
          <img src={logo} alt='' className='w-52 mb-10 ' />
        </Link>
        <img src={imgNF} alt='' className='w-[550px] mb-10' />
        <p className='text-[#ed4e37] text-4xl mb-2'>Ôi không! Lỗi 404</p>
        <p className='mb-10 font-sans'>Không tìm thấy trang bạn yêu cầu. Cầu mong thần lực sẽ ở bên bạn!</p>
        <Link to={mode === 'student' ? '/' : '/'}>
          <button className='px-9 py-3 rounded-full bg-[#ed4e37] text-white border hover:text-[#ed4e37] hover:border-[#d93a2a] hover:bg-white transition'>
            Quay lại trang chủ
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Not_Found
