import { EnvironmentFilled, MailFilled, PhoneFilled } from '@ant-design/icons'
import { logo } from '../../../../contants/client'

const Footer = () => {
  return (
    <div className='dark:bg-[#131022] dark:text-[#B9B7C0] bg-white text-[#0a142f] max-w-full mx-auto min-h-[350px] text-[14px] sm:max-w-[768px] md:max-w-[1024px] lg:max-w-[1280px] pt-10 lg:p-0 p-6 '>
      <div className='w-full flex flex-wrap justify-between gap-6'>
        <div className='flex flex-col  md:w-[100%] lg:w-[37%]'>
          <div className='flex items-center mb-3'>
            <img src={logo} alt='' className='w-[200px] md:w-[266px]' />
          </div>
          <p className='text-sm md:text-[15px] leading-6'>
            Ume Academy là nền tảng giáo dục trực tuyến giúp kết nối học viên và giảng viên từ mọi nơi. Với sứ mệnh mang lại
            trải nghiệm học tập tốt nhất, chúng tôi cung cấp các khóa học đa dạng từ cơ bản đến nâng cao, giúp bạn phát triển
            kỹ năng và đạt được mục tiêu học tập một cách hiệu quả.
          </p>
        </div>

        <div className='flex gap-6 md:gap-20 flex-wrap justify-between lg:w-auto md:w-[100%]'>
          <div className='w-[45%] md:w-auto'>
            <h2 className='font-bold text-[17px] mb-4'>Dành cho Giảng viên</h2>
            <ul className='space-y-3 sm:space-y-5'>
              <li><a href='#' className='hover:text-[#dc3545]'>Hồ sơ</a></li>
              <li><a href='#' className='hover:text-[#dc3545]'>Đăng nhập</a></li>
              <li><a href='#' className='hover:text-[#dc3545]'>Đăng ký</a></li>
              <li><a href='#' className='hover:text-[#dc3545]'>Giảng viên</a></li>
              <li><a href='/dashboard' className='hover:text-[#dc3545]'>Bảng điều khiển</a></li>
            </ul>
          </div>

          <div className='w-[45%] md:w-auto'>
            <h2 className='font-bold text-[17px] mb-4'>Dành cho Học viên</h2>
            <ul className='space-y-3 sm:space-y-5'>
              <li><a href='#' className='hover:text-[#dc3545]'>Hồ sơ</a></li>
              <li><a href='#' className='hover:text-[#dc3545]'>Đăng nhập</a></li>
              <li><a href='#' className='hover:text-[#dc3545]'>Đăng ký</a></li>
              <li><a href='#' className='hover:text-[#dc3545]'>Học viên</a></li>
              <li><a href='#' className='hover:text-[#dc3545]'>Bảng điều khiển</a></li>
            </ul>
          </div>

          <div className='w-full md:w-auto'>
            <h2 className='font-bold text-[17px] mb-4'>Bản tin</h2>
            <div className='space-y-3 sm:space-y-5'>
              <div className='flex items-center gap-2'>
                <EnvironmentFilled className='text-purple-500 text-lg' />
                <span>Hà Nội</span>
              </div>
              <div className='flex items-center gap-2'>
                <MailFilled className='text-red-400 text-lg' />
                <span>daddygiao@gmail.com</span>
              </div>
              <div className='flex items-center gap-2'>
                <PhoneFilled className='text-orange-400 text-lg' />
                <span>+84 329460020</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-10 pt-5 text-center flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0'>
        <ul className='flex items-center space-x-2'>
          <li><a href='#'>Điều khoản</a></li>
          <li>|</li>
          <li><a href='#'>Quyền riêng tư</a></li>
        </ul>
        <p>© 2024 Ume Academy. Bản quyền thuộc về Ume Academy.</p>
      </div>
    </div>
  )
}

export default Footer
