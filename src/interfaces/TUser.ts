import { TRole } from "./TRole"

export interface TUser {
  id?: any
  avatar: any
  fullname: string
  email: string
  email_verified?: boolean
  email_verified_at?: string
  created_at: string
  is_lock: number
  is_teacher: boolean
  bio: string
  role: TRole[]
}

export interface TProfile {
  avatar: any
  fullname: string
  email: string
  bio: string
  id_admin?: boolean
}

export interface TProfileTeacher {
  id: number
  fullname: string
  email: string
  avatar: string
  total_course: number
  bio: string
  rating: number
  job_title: string
  facebook: string
  twitter: string
  linkedin: string
  youtube: string
  created_at: string
}
