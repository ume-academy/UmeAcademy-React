import { router } from '@/configs/routes'
import { useMediaQuery } from 'react-responsive'
import { useLocation } from 'react-router-dom'

// Sử dụng cho reponsive bắt kích thước màn hình
export const useIsMobile = () => useMediaQuery({ query: '(max-width: 768px)' })
export const useIsTablet = () => useMediaQuery({ query: '(max-width: 1024px)' })

// Sử dụng cho helmet của react: Thay đổi tab khi chuyển trang
const baseTitleTab = 'UMECADEMY'
export const getTitleTab = (prefix: string) => {
  return prefix ? `${prefix} | ${baseTitleTab}` : baseTitleTab
}

// img carousel
export const imgCarousel = '/assets/images/client/auth/login_banner.png'

export const logo = '/assets/images/client/Logo/logo.png' //biến dùng cho logo trang web

export const backgroundImageCommon = '/assets/images/client/homeBGR/banner.png' //biến dùng cho bgr dùng chung

export const imageIntroduce = '/assets/images/client/homeBGR/introduce.webp' //biến dùng cho bgr dùng chung

export const imageMasterSkills = '/assets/images/client/homeBGR/masterSkills.png' //biến dùng cho bgr dùng chung

// biến này dùng để thay đổi css cho phù hợp với từng router
export const routerConfig = {
  transparentHeader: [`${router.home}`],
  hidenHeaderFooter: [`${router.lesson}`, `${router.courseManagement}`],
  hiddenSideberTeacher: [`${router.newInstructor}`, `${router.formCourse}`, `${router.courseManagement}`]
}

// Location của card giữa mua ngay - hoàn tiền và trang teacher
export const getButtonDetails = () => {
  const location = useLocation()
  let buttonText = 'Mua ngay'
  let targetPath = `${router.coursePaymentMethod}`

  if (location.pathname === `${router.purchasedCourses}`) {
    buttonText = 'Hoàn tiền'
    targetPath = `${router.purchasedCourses}`
  } else if (location.pathname === `${router.myCourses}`) {
    buttonText = 'Xóa'
    targetPath = `${router.myCourses}`
  }
  return { buttonText, targetPath }
}

//icon vector cho Top Category homePage
export const ruler = '/assets/images/client/HomeIconVector/ruler.png'
export const tutor = '/assets/images/client/HomeIconVector/tutor.png'
export const medal = '/assets/images/client/HomeIconVector/medal.png'
export const university = '/assets/images/client/HomeIconVector/university.png'

// img payment
export const vmpayLogo = '/assets/images/client/payment/vnpay-logo.png'
export const bankLogo = '/assets/images/client/payment/bank.jpg'

//img notfound

export const imgNF = 'https://dreamslms.dreamstechnologies.com/html/assets/img/error-01.png'

// <===== Teacher =====>

export const routerConfigTeacher = {
  hiddenButtonComeBack: [`${router.courseManagement}`],
}

// Tiêu đề các bước trong quản trị khóa học
export const itemsStep_CourseManagement = [
  {
    title: 'Tổng quan'
  },
  {
    title: 'Mục tiêu'
  },
  {
    title: 'Chương trình giảng dạy'
  },
  {
    title: 'Giảm giá'
  }
]
