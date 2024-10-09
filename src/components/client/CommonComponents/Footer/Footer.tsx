import { EnvironmentFilled, MailFilled, PhoneFilled } from '@ant-design/icons'
import { logo } from '../../../../contants/client'

const Footer = () => {
  return (
    <div className='dark:bg-[#131022] dark:text-[#B9B7C0] bg-white text-[#0a142f] w-full h-[400px] text-[14px]'>
      <div className='container mx-auto flex justify-between pt-14 space-x-4'>
        {' '}
        {/* Thêm space-x-4 để có khoảng cách giữa các cột */}
        <div className='flex flex-col w-[36%]'>
          <div className='flex items-center mb-4'>
            <img src={logo} alt='' width={250} />
          </div>
          <p className='text-sm '>
            Ume Academy là nền tảng giáo dục trực tuyến giúp kết nối học viên và giảng viên từ mọi nơi. Với sứ mệnh mang
            lại trải nghiệm học tập tốt nhất, chúng tôi cung cấp các khóa học đa dạng từ cơ bản đến nâng cao, giúp bạn
            phát triển kỹ năng và đạt được mục tiêu học tập một cách hiệu quả.
          </p>
        </div>
        <div className=''>
          <h2 className='font-bold text-[17px] mb-4'>Dành cho Giảng viên</h2>
          <ul className='space-y-5'>
            <li>
              <a href='#' className='hover:text-[#dc3545]'>
                Hồ sơ
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-[#dc3545]'>
                Đăng nhập
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-[#dc3545]'>
                Đăng ký
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-[#dc3545]'>
                Giảng viên
              </a>
            </li>
            <li>
              <a href='/dashboard' className='hover:text-[#dc3545]'>
                Bảng điều khiển
              </a>
            </li>
          </ul>
        </div>
        <div className=''>
          <h2 className='font-bold text-[17px] mb-4'>Dành cho Học viên</h2>
          <ul className='space-y-5'>
            <li>
              <a href='#' className='hover:text-[#dc3545]'>
                Hồ sơ
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-[#dc3545]'>
                Đăng nhập
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-[#dc3545]'>
                Đăng ký
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-[#dc3545]'>
                Học viên
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-[#dc3545]'>
                Bảng điều khiển
              </a>
            </li>
          </ul>
        </div>
        <div className=''>
          <h2 className='font-bold text-[17px] mb-4'>Bản tin</h2>

          <div className='space-y-5'>
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

      <div className='mt-10 pt-5 text-center flex justify-between items-center container mx-auto'>
        <ul className='flex items-center space-x-2'>
          <li>
            <a href='#'>Điều khoản</a>
          </li>
          <li>|</li>
          <li>
            <a href='#'>Quyền riêng tư</a>
          </li>
        </ul>

        <p>© 2024 Ume Academy. Bản quyền thuộc về Ume Academy.</p>
      </div>
    </div>
  )
}

export default Footer
