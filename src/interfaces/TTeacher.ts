
export interface TTeacher {
  id: number
  fullname: string
  avatar: string | null
}

// Là giáo viên hay không
export interface TIsTeacher {
  is_teacher: boolean
}

// Đăng ký giáo viên
export interface TRegisterTeacher {
  message: string,
  status: boolean
}