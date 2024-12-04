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
}

export interface TProfile {
  avatar: any
  fullname: string
  email: string
  bio: string
}
