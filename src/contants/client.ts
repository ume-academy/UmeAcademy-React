// Sử dụng cho helmet của react: Thay đổi tab khi chuyển trang
const baseTitleTab = 'UMECADEMY'
export const getTitleTab = (prefix: string) => {
    return prefix ? `${prefix} | ${baseTitleTab}` : baseTitleTab
}

export const logo = './src/assets/images/client/Logo/logo.png' //biến dùng cho logo trang web

export const backgroundImageCommon = './src/assets/images/client/homeBGR/banner.png'  //biến dùng cho bgr dùng chung

export const imageIntroduce = './src/assets/images/client/homeBGR/introduce.png'  //biến dùng cho bgr dùng chung

// biến này dùng để thay đổi css cho phù hợp với từng router
export const routerConfig = {
    transparentHeader: ['/']
}