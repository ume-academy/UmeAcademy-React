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
export const isTokenExpired =(token: string): boolean => {
  try {
    // Giải mã payload của token
    const payload = JSON.parse(atob(token.split('.')[1])); 

    // Lấy thời gian hiện tại (tính bằng giây)
    const currentTime = Math.floor(Date.now() / 1000);

    // Kiểm tra thời hạn
    return payload.exp < currentTime;
  } catch (error) {
    console.error("Invalid token", error);
    return true; // Nếu không giải mã được, coi như token đã hết hạn
  }
}