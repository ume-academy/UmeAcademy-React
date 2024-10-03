// Sử dụng cho helmet của react: Thay đổi tab khi chuyển trang
const baseTitleTab = 'UMECADEMY'
export const getTitleTab = (prefix: string) => {
    return prefix ? `${prefix} | ${baseTitleTab}` : baseTitleTab
}

// Auth

// img carousel
export const imgCarousel = './src/assets/images/client/auth/login_banner.png';

// background img default
export const bgAuthLightMode = './src/assets/images/client/auth/login-bg.png';

export const logo = './src/assets/images/client/Logo/logo.png' //biến dùng cho logo trang web

export const backgroundImageCommon = './src/assets/images/client/homeBGR/banner.png'  //biến dùng cho bgr dùng chung

export const imageIntroduce = './src/assets/images/client/homeBGR/introduce.png'  //biến dùng cho bgr dùng chung

export const imageMasterSkills = './src/assets/images/client/homeBGR/masterSkills.png'  //biến dùng cho bgr dùng chung


// biến này dùng để thay đổi css cho phù hợp với từng router
export const routerConfig = {
    transparentHeader: ['/']
}

// Location của card giữa mua ngay và hoàn tiền
export const getButtonDetails = (pathname: string) => {
    const isHistoryLesson = pathname === "/history-lesson";
    const buttonText = isHistoryLesson ? "Hoàn tiền" : "Mua ngay";
    const targetPath = isHistoryLesson ? "/refund-page" : "/purchase-page";
    return { buttonText, targetPath };
};


//icon vector cho Top Category homePage
export const ruler = './src/assets/images/client/HomeIconVector/ruler.png'  
export const tutor = './src/assets/images/client/HomeIconVector/tutor.png'  
export const medal = './src/assets/images/client/HomeIconVector/medal.png'  
export const university = './src/assets/images/client/HomeIconVector/university.png'  



