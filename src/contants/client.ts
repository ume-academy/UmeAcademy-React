// Sử dụng cho helmet của react: Thay đổi tab khi chuyển trang
const baseTitleTab = 'UMECADEMY'
export const getTitleTab = (prefix: string) => {
    return prefix ? `${prefix} | ${baseTitleTab}` : baseTitleTab
}

// Auth
// Banner login + register
export const backgroundImageCommon = './src/assets/images/client/auth/login_banner.png';

// background img default
export const bgAuthLightMode = './src/assets/images/client/auth/login-bg.png';

// Logo
export const logo = "./src/assets/images/logo/logo.png";