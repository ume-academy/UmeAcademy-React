// Sử dụng cho helmet của react: Thay đổi tab khi chuyển trang
const baseTitleTab = 'UMECADEMY'
export const getTitleTab = (prefix: string) => {
    return prefix ? `${prefix} | ${baseTitleTab}` : baseTitleTab
}