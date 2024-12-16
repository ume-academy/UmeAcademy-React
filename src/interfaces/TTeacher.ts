export interface TTeacher {
  id: number
  fullname: string
  avatar: string | null
  email: string
  total_course: 1
  bio?: string
  rating: number
  job_title: string | null
  facebook: string | null
  twitter: string | null
  linkedin: string | null
  youtube: string | null
  created_at: string
  count_review?: number
  total_earnings?:number
}

// Là giáo viên hay không
export interface TIsTeacher {
  is_teacher: boolean
}

// Đăng ký giáo viên
export interface TRegisterTeacher {
  message: string
  status: boolean
  error?: string
}

export interface TTeacherInfoCourse {
  id: number
  name: string
  teacher: TTeacher
}
