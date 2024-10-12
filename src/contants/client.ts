// Sử dụng cho helmet của react: Thay đổi tab khi chuyển trang
const baseTitleTab = 'UMECADEMY'
export const getTitleTab = (prefix: string) => {
  return prefix ? `${prefix} | ${baseTitleTab}` : baseTitleTab
}

// Auth

// img carousel
export const imgCarousel = '/assets/images/client/auth/login_banner.png'

export const logo = '/assets/images/client/Logo/logo.png' //biến dùng cho logo trang web

export const backgroundImageCommon = '/assets/images/client/homeBGR/banner.png' //biến dùng cho bgr dùng chung

export const imageIntroduce = '/assets/images/client/homeBGR/introduce.png' //biến dùng cho bgr dùng chung

export const imageMasterSkills = '/assets/images/client/homeBGR/masterSkills.png' //biến dùng cho bgr dùng chung

// biến này dùng để thay đổi css cho phù hợp với từng router
export const routerConfig = {
  transparentHeader: ['/'],
  hidenHeaderFooter: ['/course/:id/lesson'],
  hiddenSideberTeacher: ['/teacher/new-instructor']
}

// Location của card giữa mua ngay và hoàn tiền
export const isMyCoursesPage = location.pathname === '/teacher/my-courses'
export const getButtonDetails = (pathname: string) => {
  const isHistoryLesson = pathname === '/purchased-courses'

  let buttonText = 'Mua ngay'
  let targetPath = '/purchase-page'

  if (isHistoryLesson) {
    buttonText = 'Hoàn tiền'
    targetPath = '/refund-page'
  } else if (isMyCoursesPage) {
    buttonText = 'Xóa'
    targetPath = '/delete-course'
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
