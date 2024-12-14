export const formatPrice = (price: number): string => {
  return price?.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })
}

export const formatDate = (data: string): string => {
  const date = new Date(data)
  return date?.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
export const formatDateDay = (data: string): string => {
  const date = new Date(data)
  return date?.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
}

export const formatSeconds = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  let result = ''

  if (hours > 0) {
    result += `${hours} giờ`
  }

  if (minutes > 0) {
    if (hours > 0) {
      result += `${hours} giờ ${minutes} phút`
    } else result += `${minutes} phút`
  }

  if (remainingSeconds > 0 && hours === 0 && minutes == 0) {
    result += `${remainingSeconds} giây`
  }

  return result.trim()
}

// Kiểm tra hạn của token || true: hết hạn, false: còn hạn
export const isTokenExpired = (token: string): boolean => {
  try {
    // Giải mã payload của token
    const payload = JSON.parse(atob(token.split('.')[1]))

    // Lấy thời gian hiện tại (tính bằng giây)
    const currentTime = Math.floor(Date.now() / 1000)

    // Kiểm tra thời hạn
    return payload.exp < currentTime
  } catch (error) {
    console.error('Invalid token', error)
    return true // Nếu không giải mã được, coi như token đã hết hạn
  }
}

//Cuộn lên đầu trang
export const smoothScrollToTop = () => {
  const startY = window.scrollY // Vị trí hiện tại
  const duration = 500 // Thời gian cuộn (ms)
  const startTime = performance.now() // Lấy thời gian bắt đầu

  const scroll = (currentTime: number) => {
    const elapsed = currentTime - startTime // Thời gian đã trôi qua
    const progress = Math.min(elapsed / duration, 1) // Tiến độ cuộn (giới hạn trong khoảng [0, 1])

    const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2) // Hàm easing (mượt)

    const nextY = startY * (1 - easeInOutQuad(progress)) // Tính vị trí tiếp theo
    window.scrollTo(0, nextY) // Cuộn đến vị trí tiếp theo

    if (progress < 1) {
      requestAnimationFrame(scroll) // Tiếp tục cuộn
    }
  }

  requestAnimationFrame(scroll) // Bắt đầu cuộn
}
